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
        await this.loadAllWorks();
        this.presentSortedWorkList();
        App.workList = this.sortedWorks;
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

    protected get hasMoreWorksToBeLoaded() {
        const amount = this.works.size;
        return amount < this.total || amount >= 1000;
    }

    protected async loadAllWorks() {
        const scrollY = window.scrollY;
        while (this.hasMoreWorksToBeLoaded) {
            log('loading more works...');
            // scroll to the document bottom, to minus the App's threshold is to avoid some works are just
            window.scrollBy({ top: document.documentElement.scrollTop += visualViewport.height, behavior: 'smooth' });
            await sleep(300);
        }
        window.scrollTo(0, scrollY);
    }
}
