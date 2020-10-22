interface VElement extends Element {
    __vue__: VueVideo | VueWork;
}

interface VueWork {
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
    };
    photoId: string;
    likeCount: string;
    index: number;
    openVideo(): void;
    openInNew: boolean;
    preview: boolean;
    $root: VueWork;
    _uid: number;
    authorId: string;
    useVideoPlayer: boolean;
    $emit(): void;
    $router: {
        app: VueWork;
    };
}

interface VueVideo {
    volume: number;
    play(): Promise<void>;
    pause(): Promise<void>;
    fullscreen(): void;
    stop(): Promise<void>;
    load(): Promise<void>;
    reload(): Promise<void>;
}
