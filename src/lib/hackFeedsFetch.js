// @ts-nocheck

(function (window) {

    const ft = window.fetch;

    window.fetch = function (url, data) {
        return new Promise((resolve) => {
            if (url.match(/m_graphql/) ) {
                if (data.body.match(/(private|public)FeedsQuery/)) {
                    data.body = data.body.replace(/count":\d*/, 'count":1000');
                }
                resolve(ft(url, data));
            }
        });
    };

})(unsafeWindow);
