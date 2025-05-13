import type { NextApiRequest, NextApiResponse } from 'next';

const logoutFunc = async (req: NextApiRequest, res: NextApiResponse) => {
    // 로그아웃은 헤더에다가 해제만 시켜주면된다.
    res.setHeader('Set-cookie', 'token=; path=/; expires=Thu, 01 Jan 1970 00:00 GMT'); //유닉스 시간으로 초기화
    res.status(200).json({message: "Log Out"});
}

// 나중에 얘를 fetch로 부르기만 하면된다
export default logoutFunc;