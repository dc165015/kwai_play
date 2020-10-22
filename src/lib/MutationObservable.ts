import { Observable } from 'rxjs';

export interface MutationInitConfig extends MutationObserverInit {
    maxWaitTime?: number;
}

export type MutationsAndObserver = {
    mutations: MutationRecord[],
    observer: MutationObserver,
}

export type ElementAndObserver = {
    element: Element,
    observer?: MutationObserver,
} 

export class MutationObservable extends Observable<MutationsAndObserver> {
    mutationObserver: MutationObserver | undefined;

    constructor(target: Node, config?: MutationInitConfig){
        super((subscriber) => {
            this.mutationObserver = new MutationObserver((mutations) => {
                subscriber.next({mutations, observer: this.mutationObserver!});
            });
            this.mutationObserver.observe(target, config);
        });
    }
}
