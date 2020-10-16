
export function saveHistory() {
    const oldHistory = window.history;
    const proxyHistory = new Proxy(window, {
        get(target, prop, receiver) {
            if (prop == 'replaceState') {
                return function replaceState() {
                    console.log('App wants to replace hisitory with arguments:', arguments);
                };
            }
            else {
                return Reflect.get(oldHistory, prop, receiver);
            }
        }
    });

    Object.defineProperty(window, 'history', {
        enumerable: true,
        configurable: true,
        get() {
            return proxyHistory;
        }
    });
}