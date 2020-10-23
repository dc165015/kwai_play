import { getNumberFromTxt } from 'lib/util';
import { CONFIG } from '../../config';

enum WorkType {
    Video = 'video',
    Photo = 'vertical',
}

export class Work {
    src: string | undefined;
    index: number | undefined;
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

