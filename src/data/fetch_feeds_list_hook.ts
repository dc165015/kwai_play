import { extractWorkFeeds } from "src/data/feeds_list";

(function (window) {
    const oldFetch = window.fetch;

    window.fetch = function (url: string, data: { body: string }) {
        return new Promise<Response>((resolve) => {
            oldFetch(url, data).then((response)=>{
                if (url.match(/m_graphql/)) {
                    if (data.body.match(/(private|public)FeedsQuery/)) {
                        data.body = data.body.replace(/count":\d*/, 'count":1000');
                        response.clone().json().then(extractWorkFeeds).then(()=>resolve(response));
                    } else {
                        resolve(response);
                    }
                }
            });
        });
    };
})(unsafeWindow);
