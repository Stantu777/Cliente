const _localStorage = window.localStorage;

export default class Storage {
    _ls = _localStorage

    get = key => _ls.getItem(key)
    set = (key, value) => _ls.setItem(key, value)
    remove = key => _ls.removeItem(key)
    clear = () => _ls.clear()
}