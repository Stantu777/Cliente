import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'

export default class UploadButton extends Component {
    fileInput = null

    render() {
        const { label, uid, multiple = false } = this.props

        return (
            <Button.Group className='file-uploader' as='label' htmlFor={uid}>
                <Button icon='cloud upload' label={{basic: true, content: label}} labelPosition='right' />
                <input hidden id={uid} multiple={multiple} type='file' />
            </Button.Group>
        )
    }
} 