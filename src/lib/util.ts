import log from 'src/lib/logger';
export function debounce(
    this: any,
    callback: (...args: any[]) => any,
    interval = 100,
) {
    let timeout = 0,
        _this = this;

    return function debounced(...args: any[]) {
        if (timeout) window.clearTimeout(timeout);
        timeout = window.setTimeout(act, interval);

        function act() {
            timeout = 0;
            callback.apply(_this, args);
        }
    };
}

export function getSafeIndex(index: number, array: ArrayLike<any>) {
    const length = array.length;
    return length ? ((index % length) + length) % length : 0;
}

export function getProtoPropDesc(obj: object, prop: string) {
    let proto, desc;
    while ((proto = Object.getPrototypeOf(obj))) {
        if ((desc = Object.getOwnPropertyDescriptor(proto, prop))) return desc;
        obj = proto;
    }
}

export function getNumberInElement(el: Element): number | typeof NaN {
    return Number(el.textContent?.trim());
}

export function selectFirstFound(
    selectors: string[],
    container?: string | HTMLElement | JQuery<HTMLElement>,
) {
    for (const selector of selectors) {
        const result = $(selector, container);
        if (result.length) return result;
    }
}

export function selectChildEl(
    parent: HTMLElement | Document,
    childSelector: string,
) {
    return parent.querySelector<HTMLElement>(':scope > ' + childSelector);
}

/**
 * Wait for time in **milliseconds**, if time not specified, it will wait for 1000ms by default.
 *
 * @param [milliSeconds]
 * @returns  A promise that will be resolved after **milliSeconds** past
 */
export async function sleep(milliSeconds = 1000) {
    return new Promise((resolve) => window.setTimeout(resolve, milliSeconds));
}

export function getNumberFromTxt(txt: string) {
    txt = txt.trim();
    const [str, count, unit] = txt.match(/(\d+\.?\d*)(w|m)?/) ?? [];
    const level = (unit == 'w' && 10000) || (unit == 'm' && 100000000) || 1;
    return Number(count) * level;
}
