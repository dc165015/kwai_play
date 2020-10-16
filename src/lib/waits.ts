import { debounce } from "./util";

type WaitOnConfig = {
    checkInsert?: boolean,
    checkTxt?: boolean,
    context?: HTMLElement | string,
    interval?: number,
    condition?: (el: JQuery<HTMLElement>) => boolean,
};

/**
 * Wait for the element to be insterted. Once it's insterted and it meets the condition, 
 * it will return the element.
 *
 * @export
 * @param {string} selector
 * @param {(HTMLElement | string)} context
 * @param {boolean} [doCheckChildrenOnly=false]
 * @param {number} [interval=300]
 * @param {*} [condition=(el: JQuery<HTMLElement>) => !!el.length]
 * @return {*} the element that be waited for.
 */
export async function waitForOnInsert(
    selector: string,
    context: HTMLElement | string,
    doCheckChildrenOnly = false,
    interval = 300,
    condition = (el: JQuery<HTMLElement>) => !!el.length,
) {
    const result = $(selector, context);
    return result.length 
        ? result 
        : await waitForOn(
            selector, 
            { context, interval, condition, checkInsert: true }, 
            { subtree: !doCheckChildrenOnly },
          );
}

export function waitForOnTxtChange(target: string | HTMLElement, condition = (el: JQuery<HTMLElement>) => !!el.length) {
    return waitForOn(target, { condition, checkTxt: true });
}

export function waitForOn(
    selector: HTMLElement | string,
    config: WaitOnConfig = {},
    observeOption: MutationObserverInit = {},
): Promise<JQuery<HTMLElement>> {

    const defaultConfig = {
        context: document.documentElement,
        interval: 300,
        condition: (el: JQuery<HTMLElement>) => !!el.length,
    };

    let observed = getElement(config.context);

    if (!observed) {
        observed = selector instanceof HTMLElement ? selector : $(selector).get(0);
    }

    return new Promise<JQuery<HTMLElement>>((resolve, reject) => {
        if (!observed) {
            reject(`Cannot find element of ${selector}.`);
        } else {

            config = Object.assign(defaultConfig, config);

            const target = selector || observed;
            const delayedChecker = debounce(checker, config.interval);

            const observer = new MutationObserver((mutations) => {
                mutations.forEach(mutation => {
                    // no node was inserted
                    if (config.checkInsert && !mutation.addedNodes?.length) return;

                    // no text was changed
                    if (config.checkTxt && mutation.type != 'characterData') return;

                    delayedChecker();
                })
            });

            if (config.checkInsert) observeOption.childList = true;
            if (config.checkTxt) Object.assign(observeOption, { childList: true, subtree: true, characterData: true });

            observer.observe(observed, observeOption);

            function checker() {
                const results = target instanceof HTMLElement ? $(target) : $(target, observed);
                if (config.condition?.(results) ?? true) {
                    resolve(results);
                    observer.disconnect();
                }
                else {
                    reject('Selected element was found, but failed to meet the condition.');
                }
            }
        }
    });

}

export function waitForBornTimely(selector: string, context: string | HTMLElement, interval = 300, maxWait = 10000) {
    return new Promise<JQuery<HTMLElement>>((resolve, reject) => {
        const startedAt = Date.now();

        checkTimely();

        function checkTimely() {
            const results = $(selector, context);
            if (results.length) {
                resolve(results);
            } else if (Date.now() - startedAt > maxWait) {
                reject(`Failed to retrieve $('${selector}') in ${(maxWait / 1000).toFixed()}s.`);
            } else {
                window.setTimeout(checkTimely, interval);
            }
        }
    });
}

/**
 * Wait for time in **milliseconds**, if time not specified, it will wait for 1000ms by default.
 * @param [milliSeconds] 
 * @returns  A promise that will be resolved after **milliSeconds** past
 */
export async function waitForTime(milliSeconds = 1000) {
    return new Promise(resolve => window.setTimeout(resolve, milliSeconds));
}

/**
 * Wait for children loading into the DOM. By watching the insertions into target's children.
 * Think all children were loaded until no more insertions into the target in the idle time span you specified. 
 * @param target The target you wait for its children's loading finished.
 * @param idleTimeSpan the time without new child inserted, which you think it will be no more children. default to 100ms.
 * @param maxWaitingTime if there is no insertion in the maxWaitingTime, it means no child was loaded at all 
 *        and then report error. Default value is 10s.
 * @returns Return the totoal time spending until all children were loaded. If target not existed, return 0;
 */
export async function waitForChildrenLoading(target: HTMLElement | undefined, idleTimeSpan = 100, maxWaitingTime = 10000) {
    return !target ? 0 : new Promise((resolve, reject) => {
        const timeout = window.setTimeout(()=>reject(`no child loaded at all in ${maxWaitingTime}ms.`), maxWaitingTime);

        const resolver = (observer?: MutationObserver) => {
            window.clearTimeout(timeout);
            resolve();
            observer?.disconnect();
        };

        const waiter = debounce(resolver, idleTimeSpan);

        const observer = new MutationObserver(
            mutations =>
                mutations.forEach(
                    mutation => {
                        if (mutation.addedNodes?.length) {
                            window.clearTimeout(timeout);
                            waiter(observer);
                        }
                    }
                )
        );

        observer.observe(target, { childList: true });
    })
}

function getElement(selector: string | HTMLElement | undefined) {
    return typeof selector == 'string' ? $(selector).get(0) : selector;
}