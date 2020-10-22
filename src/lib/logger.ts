import { isDebugEnabled } from '../components/modal/options';

function log(...args: any[]) {
    gateKeeper(console.log, args);
}

namespace log {
    export const debug = gateKeeper.bind(null, console.debug);
    export const dir = gateKeeper.bind(null, console.dir);
    export const error = gateKeeper.bind(null, console.error);
    export const info = gateKeeper.bind(null, console.info);
    export const warn = gateKeeper.bind(null, console.warn);
}

function gateKeeper(callback: (...args: any[]) => void, args: any[]) {
    if (isDebugEnabled) {
        const newArgs = convertArgs(args);
        callback.call(console, ...newArgs);
    }

    function convertArgs(args: any[]) {
        return args.map((arg) => {
            return arg instanceof Object ? JSON.parse(JSON.stringify(arg)) : arg;
        });
    }
}

export default log;
