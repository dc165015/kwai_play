import { Work } from './Work';
import { CONFIG } from '../../config';
import { waitForChildrenLoading, waitForTime } from 'src/lib/waits';
import { UserProfile } from './profile';

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
        this.user.onWorkListUpdated();
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
            for (const work of this.sortByTopFirst()) {
                doRecursivelyPlay = !!(yield work);
            }
        } while (doRecursivelyPlay);
    }

    protected sortByTopFirst() {
        const list = Array.from(this.works.values());
        list.sort((a, b) => b.likeCount - a.likeCount);
        return this._sortedWorks = list;
    }

    get sortedWorks() {
        return this._sortedWorks ?? this.sortByTopFirst();
    }

    protected presentSortedWorkList() {
        const newList = this.sortedWorks.map(work => work.boxEl);
        this.listEl.append(newList);
    }

    protected get hasMoreWorksToBeLoaded() {
        const amount = this.works.size;
        return amount < this.total || amount >= 1000;
    }

    protected async loadAllWorks() {
        this.listEl.addClass('collapse');
        let i = 2, scollY = window.scrollY;
        while (this.hasMoreWorksToBeLoaded) {
            // scroll to the document bottom, to minus the App's threshold is to avoid some works are just 
            window.scrollBy({ top: i *= -1, behavior: 'smooth' });
            await waitForTime(500);
        }
        this.listEl.removeClass('collapse');
        window.scrollTo(0, scrollY);
    }
}