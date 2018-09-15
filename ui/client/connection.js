import clientInstance from '../../lib'

const genesis = clientInstance()
genesis.start()

export { genesis as default }