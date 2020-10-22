import { MutationObservable, MutationsAndObserver, ElementAndObserver } from './MutationObservable';
import { of, Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
/**
 * Wait for the element to be insterted. Once it's insterted and it meets the condition,
 * it will return the element.
 *
 * @export
 * @param {string} selector
 * @param {(HTMLElement | string)} container
 * @param {boolean} [doCheckChildrenOnly=false]
 * @param {boolean} [doKeepWatchingnOnly=false]
 * @return {*} the element that be waited for.
 */
export function waitForOnInsert<T extends Element>(
    selector: string,
    container: Element,
    doCheckChildrenOnly = false,
    doKeepWatching = false,
) {
    const element = container.querySelector<T>(selector);
    if (element) {
        return of<ElementAndObserver>({element});
    } else {
        return onKindOfNodesInsert(
            selector,
            container,
            doCheckChildrenOnly,
            doKeepWatching,
        );
    }
}

export function waitForOnTxtChange(
    container: Element,
    doCheckChildrenOnly = false,
) {
    return new MutationObservable(container, {
        childList: true,
        subtree: !doCheckChildrenOnly,
        characterData: true,
        characterDataOldValue: true
    }).pipe(
        filter<MutationsAndObserver>(({ mutations, observer }) =>
            mutations.some((mutation) => {
                if (mutation.type == 'characterData') {
                    observer.disconnect();
                    return true;
                }
            }),
        ),
    );
}

export function onKindeOfNodesRemove(
    selector: string,
    container: Element,
    doCheckChildrenOnly = false,
    doKeepWatching = false,
) {
    return watchOnKindOfNodesAddOrRemove(
        selector,
        container,
        NodesMove.REMOVE,
        doCheckChildrenOnly,
        doKeepWatching,
    );
}

export function onKindOfNodesInsert(
    selector: string,
    container: Element,
    doCheckChildrenOnly = false,
    doKeepWatching = false,
) {
    return watchOnKindOfNodesAddOrRemove(
        selector,
        container,
        NodesMove.ADD,
        doCheckChildrenOnly,
        doKeepWatching,
    );
}

export enum NodesMove {
    ADD = 'Add',
    REMOVE = 'Remove',
}

export function watchOnKindOfNodesAddOrRemove(
    selector: string,
    container: Element,
    type: NodesMove,
    doCheckChildrenOnly = false,
    doKeepWatching = false,
) {
    return new MutationObservable(container, {
        childList: true,
        subtree: !doCheckChildrenOnly,
    }).pipe(
        map(({ mutations, observer }) => {
            for (const mutation of mutations) {
                const nodes = getNodes();

                if (nodes) {
                    let i = 0,
                        node: Node | null;
                    while ((node = nodes.item(i++))) {
                        if (node instanceof Element && node.matches(selector)) {
                            doKeepWatching || observer.disconnect();
                            return { element: node as Element, observer };
                        }
                    }
                }

                function getNodes() {
                    let nodes;
                    if (type == NodesMove.ADD) {
                        nodes = mutation.addedNodes;
                    } else if (type == NodesMove.REMOVE) {
                        nodes = mutation.removedNodes;
                    }
                    return nodes;
                }
            }
        }),
        filter(isNotNullOrUndefined),
    );
}

export function isNotNullOrUndefined<T>(input: null | undefined | T): input is T {
  return input != null;
}
