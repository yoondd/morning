// 나는 지금 로그인을 했다
// 나는 지금 로그아웃을 했다
// 등의 *상태* 유지 정보를 가지고있는 아이
// 데이터를 주고받을때 얘를 호출해서 같이 정보를 넘겨줄 것이다

import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import { parse } from 'cookie'; //쿠키한테 있는걸 나한테 받아오는애. 우리정보를 쿠키에게 주는 시리얼라이즈랑 반대

const meFunc = async (req: NextApiRequest, res: NextApiResponse) => {
    // 쿠키내에 토큰이 있고, 토큱에는 나의 많은 정보가 있다. 먼저 그 정보를 알아야겠다
    const cookies = parse(req.headers.cookie || ''); //undefined의 경우에는 ''로 처리하겠다
    const token = cookies.token;

    // if(!token) return res.status(403).end(); 귀찮으면 이렇게 그냥 end로 끝내도된다
    if(!token) return res.status(403).json({error: 'No token provided'});

    try {
        // 진짜 회원이 맞는가 확인해야겠네

        //나의 기준키를 이용해서 jwt한테 토큰 해석해달라고하기.
        const decoded = jwt.verify(token, process.env.JWT_SECRET!); //jwt는 내가가진 토큰을 생성할수도있지만 토큰의 정보도 알려줄 수 있다.
        res.status(200).json({ user: decoded });

    }catch(err){
        console.error(err);
        res.status(401).end();
    }

}

export default meFunc;

