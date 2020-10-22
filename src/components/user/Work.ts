import { getNumberFromTxt } from 'lib/util';
import { CONFIG } from '../../config';

enum WorkType {
    Video = 'video',
    Photo = 'vertical',
}

export class Work {
    src: string | undefined;
    index: number | undefined;
    feed: VueWork['feed'] | undefined;
    cardEl: HTMLElement;
    likeCountView: string | undefined;
    workType: WorkType | undefined;

    protected contentEl: JQuery<HTMLElement>;
    protected _likeCount: number | undefined;

    constructor(public boxEl: HTMLElement) {
        this.cardEl = this.boxEl.firstElementChild as HTMLElement;
        this.contentEl = $(CONFIG.SELECTORS.WORK_CONTENT, boxEl);
        this.src = $('img', this.cardEl)
            .attr('src')
            ?.match(/(.*?\.jpg).*/)?.[1];
        this.extractVueData((<any>this.cardEl).__vue__);
    }

    protected extractVueData(v: VueWork) {
        if (v) {
            this.index = v.index;
            this.likeCountView = v.likeCount;
            this.feed = v.feed;
            this.workType = v.feed.workType == WorkType.Video ? WorkType.Video : WorkType.Photo;
        }
    }

    click() {
        this.contentEl?.trigger('click');
    }

    get likeCount() {
        return this._likeCount ?? this.getLikeCountNumber();
    }

    get isVideo() {
        return this.workType == WorkType.Video;
    }

    protected getLikeCountNumber() {
        const txt = this.likeCountView || $(CONFIG.SELECTORS.WORK_LIKE, this.boxEl).text()?.trim();
        return this._likeCount = getNumberFromTxt(txt);
    }
}

