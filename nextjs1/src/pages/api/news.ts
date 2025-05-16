import { NextApiRequest, NextApiResponse } from 'next';

const NewsFunction = async (req: NextApiRequest, res: NextApiResponse) => {

    // 프론트에서 쿼리를 받아들이는 명령 (query에서 query를 찾아라 - 아무것도 없으면 뉴스가 입력되게)
    const keywords = req.query.query || "뉴스";

    const response = await fetch(
        `https://openapi.naver.com/v1/search/news.json?query=${encodeURIComponent(keywords as string)}&sort=date`,
        {//승인이 떨어야지만 통신할 수 있게 뭔가를 더 넣어주어야한다
            headers: {
                "X-Naver-Client-Id" : process.env.NAVER_CLIENT_ID!,
                "X-Naver-Client-Secret" : process.env.NAVER_CLIENT_SECRET!,
            },
        }
    );

    const data = await response.json();
    res.status(200).json(data);

    // 실제 기사들은 data안의 item에 들어가게된다. data.item
}

export default NewsFunction;