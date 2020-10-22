import { CONFIG } from '../../config';
import log from 'lib/logger';
import { selectChildEl } from 'lib/util';
import { waitForOnInsert } from 'lib/mutaion_observers';
import { App } from '../../app';
import { WorkList } from './WorkList';
import { filter, switchMap, take } from 'rxjs/operators';
import { MutationObservable } from 'src/lib/MutationObservable';

const { SELECTORS, } = CONFIG;

export class UserProfile {
    workList: WorkList | undefined;
    worksTotal = 0;

    protected profileEl: Element | undefined | null;

    constructor() {
        this.init();
    }

    protected init() {
        this.profileEl = selectChildEl(App.appEl, SELECTORS.PROFILE_PANEL);
        this.getWorksTotal();
    }

    protected async getWorksTotal(){
        waitForOnInsert<Element>(
            SELECTORS.STATS_USERDATA_SUMMARY,
            this.profileEl!,
        )
            .pipe(
                switchMap(({ element }) => {
                    return waitForOnInsert(
                        SELECTORS.STATS_USERDATA_WORKCOUNT,
                        element,
                    );
                }),
                switchMap(
                    ({ element }) =>
                        new MutationObservable(element, {
                            childList: true,
                            subtree: true,
                            characterData: true,
                            characterDataOldValue: true,
                        }),
                ),
                filter(({ mutations, observer }) =>
                    mutations.some((mutation) => {
                        if (
                            mutation.type == 'characterData' &&
                            mutation.oldValue?.trim() == '0'
                        ) {
                            const numberStr = mutation.target.textContent?.trim();
                            observer.disconnect();
                            this.worksTotal = Number(numberStr);
                            return true;
                        }
                    }),
                ),
                take(1),
            )
            .subscribe(() => {
                log(`Got worksTotal ${this.worksTotal}`);
                this.workList = new WorkList(this.worksTotal, this);
            });
    }
}
