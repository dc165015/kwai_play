type VideoURLResponse = {
    data: { feedById: { currentWork: { playUrl: string } } };
};

export function getVideoUrl(photoId: string, principalId: string) {
    const url: string = 'https://live.kuaishou.com/m_graphql',
        data: RequestInit = {
            headers: {
                accept: '*/*',
                'accept-language': 'en,zh;q=0.9,zh-TW;q=0.8',
                'content-type': 'application/json',
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'same-origin',
            },
            referrer: `https://live.kuaishou.com/profile/${principalId}`,
            referrerPolicy: 'unsafe-url',
            body: `{"operationName":"SharePageQuery","variables":{"photoId":"${photoId}","principalId":"${principalId}"},"query":"query SharePageQuery($principalId: String, $photoId: String) {\\n  feedById(principalId: $principalId, photoId: $photoId) {\\n    currentWork {\\n      playUrl\\n      __typename\\n    }\\n    __typename\\n  }\\n}\\n"}`,
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
        };

    return fetch(url, data)
        .then((response) => response.json())
        .then(
            (json: VideoURLResponse) => json.data.feedById.currentWork.playUrl,
        );
}
