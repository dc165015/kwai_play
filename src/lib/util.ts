
export function debounce(this: any, callback: (...args: any[])=>any, interval = 100) {
        let timeout = 0, _this = this;

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
    return length ? (index % length + length) % length : 0;
}

export function getProtoPropDesc(obj: object, prop: string) {
    let proto, desc;
    while (proto = Object.getPrototypeOf(obj)) {
        if (desc = Object.getOwnPropertyDescriptor(proto, prop)) return desc;
        obj = proto;
    }
}

export function getNumberInElement(el: HTMLElement | JQuery<HTMLElement>): number | typeof NaN {
    el = el instanceof HTMLElement ? $(el) : el;
    return Number(el.text().trim());
}

export function selectFirstFound(selectors: string[], container? : string | HTMLElement |JQuery<HTMLElement>) {
    for (const selector of selectors){
        const result = $(selector, container);
        if (result.length) return result;
    }
}