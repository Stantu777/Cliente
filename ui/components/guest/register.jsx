import map from 'lodash/map'
import clone from 'lodash/clone'
import find from 'lodash/find'
import findIndex from 'lodash/findIndex'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Container, Dropdown, Header, Form, Message, Divider, Button, Icon } from 'semantic-ui-react'
import { validate } from '../../helpers'
import { ID_TYPES, SEXES } from '../../data'
import { Account, School, Person } from '../../../lib'

const STATE = {
    // Data
    idType: '',
    id: '',
    firstName: '',
    lastName: '',
    age: '',
    sex: '',
    schoolId: '',
    email: '',
    address: '',
    phone: '',
    password: '',
    repeatPassword: '',

    // Validation flags
    idTypeIsValid: null,
    idIsValid: null,
    firstNameIsValid: null,
    lastNameIsValid: null,
    ageIsValid: null,
    sexIsValid: null,
    schoolIdIsValid: null,
    emailIsValid: null,
    addressIsValid: null,
    phoneIsValid: null,
    passwordIsValid: null,
    repeatPasswordIsValid: null,
    idIsNotAvailable: null,
    emailIsNotAvailable: null,

    // Control
    schools: [],
    fetchedSchools: false,
    idLabel: '...',
    hasSelectedIdType: false,
    canSubmit: false,
    submitting: false,
    errored: false,
    finished: null
}

export default class Register extends Component {
    state = clone(STATE)

    componentDidMount() {
        School.all().then(schools => {
            this.setState({
                schools: map(schools, ({ id, name }, index) => ({
                    key: index,
                    value: id,
                    text: name
                })),
                fetchedSchools: true
            })
        }).catch(() => {
            this.setState({
                fetchedSchools: false
            })
        })
    }

    validateInput = (name, value) => validate(name, value, name === 'repeatPassword' ? this.state.password : (
        name === 'id' ? this.state.idType : null
    ))

    isSubmittable = () => {
        const {
            idTypeIsValid,
            idIsValid,
            firstNameIsValid,
            lastNameIsValid,
            ageIsValid,
            sexIsValid,
            schoolIdIsValid,
            emailIsValid,
            addressIsValid,
            phoneIsValid,
            passwordIsValid,
            repeatPasswordIsValid
        } = this.state

        return (
            idTypeIsValid &&
            idIsValid &&
            firstNameIsValid &&
            lastNameIsValid &&
            ageIsValid &&
            sexIsValid &&
            schoolIdIsValid &&
            emailIsValid &&
            addressIsValid &&
            phoneIsValid &&
            passwordIsValid &&
            repeatPasswordIsValid
        )
    }

    handleChange = ({ target }) => {
        const { name, value } = target
        const nameIsValid = name + 'IsValid'
        const isValid = this.validateInput(name, value)

        if (!isValid) {
            this.setState({
                [name]: value,
                [nameIsValid]: isValid,
                canSubmit: false
            })

            return
        }
        
        this.state[nameIsValid] = isValid

        this.setState({
            [name]: value,
            [nameIsValid]: isValid,
            canSubmit: this.isSubmittable()
        })
    }

    handleSelectChange = (_, d) => {
        const { name, value } = d
        const isValid = this.validateInput(name, value)

        if (name === 'idType') {
            const { text } = ID_TYPES[findIndex(ID_TYPES, idType => idType.value === value)]

            this.setState({
                [name]: value,
                idLabel: text,
                idTypeIsValid: isValid,
                hasSelectedIdType: true,
                canSubmit: false,

                id: '',
                idIsValid: null
            })

            return
        }

        const nameIsValid = name + 'IsValid'

        if (!isValid) {
            this.setState({
                [name]: value,
                [nameIsValid]: false,
                canSubmit: false
            })

            return
        }

        this.state[nameIsValid] = true

        this.setState({
            [name]: value,
            [nameIsValid]: true,
            canSubmit: this.isSubmittable()
        })
    }

    handleSubmit = () => {
        const { submitting } = this.state

        if (submitting) {
            return
        }

        this.setState({
            submitting: true
        })

        const { id, email } = this.state

        Promise.all([Person.exists({ id: id }), Person.exists({ email: email })]).then(([ idIsUnavailable, emailIsUnavailable ]) => {
            if (idIsUnavailable || emailIsUnavailable) {
                this.setState({
                    idIsNotAvailable: idIsUnavailable,
                    emailIsNotAvailable: emailIsUnavailable,
                    errored: true,
                    finished: true,
                    submitting: false
                })

                return
            }

            const {
                id,
                idType,
                firstName,
                lastName,
                age,
                sex,
                schoolId,
                email,
                address,
                phone,
                password
            } = this.state

            Account.new({
                id: id,
                idType: idType,
                firstName: firstName,
                lastName: lastName,
                age: age,
                sex: sex,
                schoolId: schoolId,
                email: email,
                address: address,
                phone: phone,
                password: password
            }).then(() => {
                this.setState({
                    id: '',
                    idType: '',
                    firstName: '',
                    lastName: '',
                    age: '',
                    sex: '',
                    schoolId: '',
                    email: '',
                    address: '',
                    phone: '',
                    password: '',
                    repeatPassword: '',
                    idIsNotAvailable: false,
                    emailIsNotAvailable: false,
                    errored: false,
                    finished: true,
                    submitting: false,
                    canSubmit: false
                })
            }).catch(() => {
                this.setState({
                    idIsNotAvailable: null,
                    emailIsNotAvailable: null,
                    errored: true,
                    finished: true,
                    submitting: false
                })
            })
        }).catch(() => {
            this.setState({
                idIsNotAvailable: null,
                emailIsNotAvailable: null,
                errored: true,
                finished: true,
                submitting: false
            })
        });
    }

    render() {
        // Data
        const {
            id,
            idType,
            firstName,
            lastName,
            age,
            sex,
            schoolId,
            email,
            address,
            phone,
            password,
            repeatPassword
        } = this.state

        const {
            idTypeIsValid,
            idIsValid,
            firstNameIsValid,
            lastNameIsValid,
            ageIsValid,
            sexIsValid,
            schoolIdIsValid,
            emailIsValid,
            addressIsValid,
            phoneIsValid,
            passwordIsValid,
            repeatPasswordIsValid,

            // Availability checks
            idIsNotAvailable,
            emailIsNotAvailable
        } = this.state

        // Control
        const {
            schools,
            fetchedSchools,
            idLabel,
            hasSelectedIdType,
            submitting,
            canSubmit,
            errored,
            finished
        } = this.state

        return (
            <React.Fragment>
                <Header as='h2'>Registrate</Header>

                <Form onSubmit={this.handleSubmit}>
                    <Form.Field required>
                        <label>Tipo de documento</label>
                        <Form.Select disabled={submitting} error={idTypeIsValid === false} name='idType' value={idType} fluid options={ID_TYPES} placeholder='Tipo de documento' onChange={this.handleSelectChange} />
                    </Form.Field>
                    <Form.Field required>
                        <label>{idLabel}</label>
                        <Form.Input disabled={submitting} error={idIsValid === false} disabled={!hasSelectedIdType} iconPosition='left' placeholder={idLabel}>
                            <Icon name='user circle' />
                            <input name='id' value={id} onChange={this.handleChange} />
                        </Form.Input>
                    </Form.Field>

                    <Divider section />

                    <Form.Field required>
                        <label>Nombres completos</label>
                        <Form.Input disabled={submitting} error={firstNameIsValid === false} iconPosition='left' placeholder='Nombres completos'>
                            <Icon name='font' />
                            <input name='firstName' value={firstName} onChange={this.handleChange} />
                        </Form.Input>
                    </Form.Field>
                    <Form.Field required>
                        <label>Apellidos completos</label>
                        <Form.Input disabled={submitting} error={lastNameIsValid === false} iconPosition='left' placeholder='Apellidos completos'>
                            <Icon name='font' />
                            <input name='lastName' value={lastName} onChange={this.handleChange} />
                        </Form.Input>
                    </Form.Field>
                    <Form.Field required>
                        <label>Edad</label>
                        <Form.Input disabled={submitting} error={ageIsValid === false} iconPosition='left' placeholder='Edad'>
                            <Icon name='birthday cake' />
                            <input name='age' value={age} onChange={this.handleChange} />
                        </Form.Input>
                    </Form.Field>
                    <Form.Field required>
                        <label>Sexo</label>
                        <Form.Select disabled={submitting} error={sexIsValid === false} name='sex' value={sex} fluid labeled={false} options={SEXES} placeholder='Sexo' onChange={this.handleSelectChange} />
                    </Form.Field>

                    <Divider section />
                    <Form.Field required>
                        <label>Escuela</label>
                        <Dropdown disabled={submitting} error={schoolIdIsValid === false} name='schoolId' value={schoolId} placeholder='Escuela' fluid search selection options={schools} loading={!fetchedSchools} onChange={this.handleSelectChange} />
                    </Form.Field>

                    <Form.Field required>
                        <label>Correo electrónico</label>
                        <Form.Input disabled={submitting} error={emailIsValid === false} iconPosition='left' placeholder='Correo electrónico'>
                            <Icon name='at' />
                            <input name='email' value={email} onChange={this.handleChange} />
                        </Form.Input>
                    </Form.Field>
                    <Form.Field required>
                        <label>Dirección</label>
                        <Form.Input disabled={submitting} error={addressIsValid === false} iconPosition='left' placeholder='Dirección'>
                            <Icon name='address card' />
                            <input name='address' value={address} onChange={this.handleChange} />
                        </Form.Input>
                    </Form.Field>
                    <Form.Field required>
                        <label>Teléfono</label>
                        <Form.Input disabled={submitting} error={phoneIsValid === false} iconPosition='left' placeholder='Teléfono'>
                            <Icon name='phone' />
                            <input name='phone' value={phone} onChange={this.handleChange} />
                        </Form.Input>
                    </Form.Field>

                    <Divider section />

                    <Form.Field required>
                        <label>Contraseña</label>
                        <Form.Input disabled={submitting} error={passwordIsValid === false} iconPosition='left' type='password' placeholder='Contraseña'>
                            <Icon name='key' />
                            <input name='password' value={password} onChange={this.handleChange} />
                        </Form.Input>
                    </Form.Field>
                    <Form.Field required>
                        <label>Repetir contraseña</label>
                        <Form.Input disabled={submitting} error={repeatPasswordIsValid === false} iconPosition='left' type='password' placeholder='Repetir contraseña'>
                            <Icon name='key' />
                            <input name='repeatPassword' value={repeatPassword} onChange={this.handleChange} />
                        </Form.Input>
                    </Form.Field>

                    <Container fluid textAlign='center'>
                        <Button.Group className='centered'>
                            <Button as={Link} to='/' disabled={submitting}>Cancelar</Button>
                            <Button.Or text='o' />
                            <Button positive type='submit' loading={submitting} disabled={!canSubmit}>Registrar</Button>
                        </Button.Group>
                    </Container>

                    <Message error={errored} success={!errored} visible={finished !== null}>
                        <Message.Header>{errored ? 'Oh no! Ha sucedido algo' : 'Felicitaciones!'}</Message.Header>
                        {((idIsNotAvailable === true) || emailIsNotAvailable === true) ? (
                            <Message.List>
                                {idIsNotAvailable ? <Message.Item>{find(ID_TYPES, ({ value }) => value === idType).text} ya se encuentra en uso</Message.Item> : null}
                                {emailIsNotAvailable ? <Message.Item>Correo electrónico ya se encuentra en uso</Message.Item> : null}
                            </Message.List>
                        ) : (errored ? <p>Algo ha salido mal, por favor inténtalo de nuevo más tarde</p> : <p>Te has registrado exitosamente</p>)}
                    </Message>
                </Form>
            </React.Fragment>
        )
    }
}