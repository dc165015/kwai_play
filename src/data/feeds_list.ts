import log from 'lib/logger';
import { getNumberFromTxt } from 'lib/util';
import { FeedsData, WorkType } from './types';
import { getVideoUrl } from './request_video_url';
import { App } from 'src/app';

export function extractWorkFeeds({ data }: { data: FeedsData.data }) {
    const feeds = data.privateFeeds || data.publicFeeds;
    App.feeds.concat(feeds?.list);

    App.feeds.forEach((feed) => {
        feed.likeCount = getNumberFromTxt(feed.counts.displayLike);
    });

    App.feeds.sort((a, b) => b.likeCount - a.likeCount);

    for (const feed of App.feeds) {
        if (feed.workType == WorkType.Video) {
            App.videos.push(feed);
            getVideoUrl(feed.id, App.userId!).then(url=>feed.videoUrl = url).catch(log.error);
        } else {
            App.albums.push(feed);
        }
    }
}
