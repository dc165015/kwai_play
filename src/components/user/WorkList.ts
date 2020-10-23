import { Work } from './Work';
import { CONFIG } from '../../config';
import { sleep } from 'lib/util';
import { UserProfile } from './profile';
import log from 'lib/logger';
import { App } from '../../app';

export class WorkList {
    listEl: JQuery<HTMLElement>;

    protected _works: Map<string, Work> = new Map();
    protected _sortedWorks: Work[] | undefined;
    protected it: Iterator<Work, void, boolean> | undefined;

    constructor(public total = 0, public user: UserProfile) {
        this.listEl = $(CONFIG.SELECTORS.WORK_LIST);
        this.init();
    }

    protected async init() {
        if(document.hasFocus()){
            await this.loadAllWorks();
            this.presentSortedWorkList();
            App.workList = this.sortedWorks;
        }else {
            await sleep(1000);
            await this.init();
        }
    }

    get size() {
        return this.works.size;
    }

    get works() {
        this.listEl?.children().each((i, item) => {
            const work = new Work(item);
            const src = work.src;
            if (src) {
                this._works.set(src, work);
            }
        });
        return this._works;
    }

    next(doRecursivelyPlay = false): Work | undefined {
        this.it ||= this.generator();
        const result = this.it.next(doRecursivelyPlay);
        return result.value || undefined;
    }

    protected *generator(): Iterator<Work, void, boolean> {
        let doRecursivelyPlay = false;
        do {
            for (const work of this.sortByTopLikeFirst()) {
                doRecursivelyPlay = !!(yield work);
            }
        } while (doRecursivelyPlay);
    }

    protected sortByTopLikeFirst() {
        const list = Array.from(this.works.values());
        list.sort((a, b) => b.likeCount - a.likeCount);
        log(`${list.length} works were sorted at top-like-first order.`);
        return (this._sortedWorks = list);
    }

    get sortedWorks() {
        return this._sortedWorks ?? this.sortByTopLikeFirst();
    }

    protected presentSortedWorkList() {
        const newList = this.sortedWorks.map((work) => work.boxEl);
        this.listEl.append(newList);
    }

    protected async loadAllWorks() {
        const originalScrollY = window.scrollY;

        let newScrollY = 0,
            lastScrollY = 0;

        while (this.works.size < this.total) {
            // if there is no new works loaded from the last scroll, the scrollbar will be stuck
            // at the end of the page. Then we have try again by scroll from top again.
            if (lastScrollY == newScrollY) {
                window.scrollTo(0, 0);
            }

            // remember the works count of the last try.
            lastScrollY = newScrollY;

            // scroll document to bottom to trigger loading new works and then wait for DOM update
            log('loading more works...');
            window.scrollBy({
                top: document.documentElement.scrollTop +=
                    visualViewport.height,
                behavior: 'smooth',
            });
            await sleep(500);

            newScrollY = window.scrollY;
        }

        window.scrollTo(0, originalScrollY);
    }
}
