import axios from 'axios'

export class TempAuth {
    token = null
    user = null

    login = (d, cb, ecb) => {
        axios.post('http://localhost:8080/login', d)
            .then(r => {
                const { token } = r.data

                this.token = token

                axios.get('http://localhost:8080/users/@me', {
                    data: null,
                    headers: {
                        'Authorization': this.token,
                        'Content-Type': 'application/json'
                    }
                }).then(r => {
                    const { data } = r

                    this.user = data

                    cb()
                }).catch(() => {
                    ecb()
                })
            })
            .catch(() => {
                ecb()
            })
    }

    logout = () => {
        this.user = null
        this.token = null
    }
}

export const TEMP_AUTH = new TempAuth()
