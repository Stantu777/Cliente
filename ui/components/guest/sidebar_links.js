import concat from 'lodash/concat'
import genesis from '../../service'

const manuals = [
    { label: 'Manuales' },
    {
        label: 'Manual de inscripción',
        path: 'manual/registration'
    },
    {
        label: 'Manual de seguimiento de tesis',
        path: 'manual/proposal-tracking'
    },
    {
        label: 'Manual de desarrollo de tesis',
        path: 'manual/thesis-development'
    },
    {
        label: 'Manual de sustentación de tesis',
        path: 'manual/thesis-defense'
    }
]

const guestMenu = [
    { label: 'Menú de invitado' },
    {
        label: 'Crear usuario',
        path: 'register'
    },
    {
        label: 'Ingresar al sistema',
        path: 'login'
    }
]

const userMenu = [
    { label: 'Menú de usuario' },
    {
        label: 'Mi perfíl',
        path: '@me'
    },
    {
        label: 'Configuración',
        path: 'account/settings'
    },
    {
        label: 'Resumen de tesis',
        path: 'thesis/overview'
    },
    {
        label: 'Estado de propuesta',
        path: 'thesis/proposal'
    }
]

const DEFAULT_SIDEBAR = {
    path: '',
    links: null
}


if (genesis.ready) {
    DEFAULT_SIDEBAR.links = concat(guestMenu, {}, manuals)
} else {
    DEFAULT_SIDEBAR.links = concat(userMenu, {}, manuals)
}

export { DEFAULT_SIDEBAR }
