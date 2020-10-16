import { CONFIG } from '../../config';

interface VueData {
    __vue__: {
        feed: {
            user: {
                eid: string;
                id: string;
                name: string;
                avatar: string;
            };
            workType: 'video' | 'vertical';
            imgUrls: string[];
            timestamp: number;
            poster: string;
        },
        photoId: string;
        likeCount: string;
        index: number;
        openVideo(): void;
        openInNew: boolean;
        preview: boolean;
        $root: VueData;
        _uid: number;
        authorId: string;
        useVideoPlayer: boolean;
        $emit(): void;
        $router: {
            app: VueData;
        }
    }
}

export class Work {
    src: string | undefined;

    protected contentEl: JQuery<HTMLElement>;
    protected _likeCount: number | undefined;

    constructor(public boxEl: HTMLElement) {
        this.contentEl = $(CONFIG.SELECTORS.WORK_CONTENT, boxEl);
        this.src = $('img', this.boxEl).attr('src')?.match(/(.*?\.jpg).*/)?.[1];
    }

    protected extractVueData(vueEl: VueData){
        const vue = vueEl.__vue__;
    }

    click() {
        this.contentEl?.trigger('click');
    }

    get likeCount() {
        return this._likeCount ?? this.updateLikeCount();
    }
    
    protected updateLikeCount(){
        const txt = $(CONFIG.SELECTORS.WORK_LIKE, this.boxEl).text()?.trim();
        const [str, count, unit] = txt.match(/(\d+\.?\d*)(w|m)/) ?? [];
        const level = unit == 'w' && 10000 || unit == 'm' && 100000000 || 1;
        return this._likeCount = Number(count) * level;
    }
}