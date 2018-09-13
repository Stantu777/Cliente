import cloneDeep from 'lodash/cloneDeep'
import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { Header, Form, Icon, Button, Message } from 'semantic-ui-react'
import genesis from '../../service'
import { validate } from '../../helpers'

const LOGIN_STATE = {
    emailValue: '',
    emailHasError: null,
    passwordValue: '',
    passwordHasError: null,

    isSubmitting: null,
    canSubmit: null,
    errored: null
}

export default class Login extends Component {
    listenedId = null
    state = cloneDeep(LOGIN_STATE)

    componentDidMount() {
        this.listenedId = genesis.addOnReady(this.afterSubmit)
    }

    componentWillUnmount() {
        genesis.removeOnReady(this.listenedId)
    }

    afterSubmit = (_, error) => {
        if (error !== null) {
            this.setState({
                isSubmitting: false,
                canSubmit: true,
                errored: true
            })

            return
        }

        this.setState({
            isSubmitting: false,
            canSubmit: false,
            errored: false
        })

        return
    }

    handleSubmit = () => {
        this.setState({
            isSubmitting: true
        })

        const { emailValue, passwordValue } = this.state

        genesis.connect({
            email: emailValue,
            password: passwordValue
        })
    }

    handleChange = ({ target }) => {
        const { name, value } = target

        this.setState({
            [`${name}Value`]: value,
            [`${name}HasError`]: validate(name, value)
        })

        this.updateCanSubmit()
    }

    updateCanSubmit() {
        const { emailHasError, passwordHasError } = this.state

        if (emailHasError !== null && !emailHasError && passwordHasError !== null && !passwordHasError) {
            this.setState({
                canSubmit: true
            })

            return
        }

        this.setState({
            canSubmit: false
        })
    }

    render() {
        const { errored } = this.state

        if (errored === false) {
            const { from } = this.props.location.state || { from: { pathname: '/' } }

            return <Redirect to={from} />
        }

        const { emailValue, emailHasError, passwordValue, passwordHasError } = this.state
        const { canSubmit, isSubmitting } = this.state

        return (
            <React.Fragment>
                <Header as='h2'>
                    Conectate
                </Header>
                <Form onSubmit={this.handleSubmit}>
                    <Message error visible={errored === true} header={`Intento de conexión fallido`} content='Por favor, inténtelo más tarde.' />
                    <Form.Field required>
                        <Form.Input iconPosition='left' placeholder='Correo electrónico' error={emailHasError}>
                            <Icon name='at' />
                            <input name='email' value={emailValue} onChange={this.handleChange} />
                        </Form.Input>
                    </Form.Field>
                    <Form.Field required>
                        <Form.Input iconPosition='left' type='password' placeholder='Contraseña' error={passwordHasError}>
                            <Icon name='key' />
                            <input name='password' value={passwordValue} onChange={this.handleChange} />
                        </Form.Input>
                    </Form.Field>
                    <Button primary disabled={!canSubmit} loading={isSubmitting} type='submit'>Ingresar</Button> <Button as={Link} to='/'>Cancelar</Button>
                </Form>
            </React.Fragment>
        )
    }
}