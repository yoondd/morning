import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/lib/db';
import bcrypt from 'bcrypt';

//로그인정보를 쿠키에게 던져주고, jwt를 이용할거다 / 여기서부턴 로그인후에 진행할것들
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie'; //웹브라우저가 알아들을 수 있는 문자열로 보내주겠다

const loginfunction = async (req: NextApiRequest, res: NextApiResponse) => {
    //메서드확인
    if(req.method !== 'POST') return res.status(405).json({ error: "Method not allowed" });

    //값 받아오기
    const { email, password } = req.body;

    //값 없으면 에러
    if(!email || !password) return res.status(400).json({ error: "Please enter data" });

    try {

        //db에서 값들고오기
        const [ data ] = await db.query(`SELECT * FROM users WHERE email = ?`, [email]);

        //이메일이 없다면 가입이 안된거니까 날리기
        const user = ( data as any[] )[0]; // 타입스크립트가 못알아들으니까 as any[] . 있냐없냐만 확인할거니까 [0]체크하자
        if (!user) return res.status(401).json({ error: "User not found" });

        //입력된 비밀번호(password)와 user의 정보에있는 password가 같은지를 확인한다  bcrypt로 비교하기
        const checkPassword = await bcrypt.compare(password, user.password);

        //비밀번호가 틀린경우 날리기
        if( !checkPassword) return res.status(401).json({ error: "Invalid password" });

        //이제 jwt로 토큰만들기 <토큰생성>
        //sign은 토큰 생성하는데, - sign(사용자정보, secret키(env에 넣은것), 만료시간(30m, 1h, 3d...))
        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                name: user.name,
            }, //토큰에 포함된 구체적인 사용자정보를 우리는 페이로드라고한다. Payload
            process.env.JWT_SECRET!, //nextjs에게 알려준다 - 얘는 무조건있어 무조건!! 이뜻때문에 !를 붙여준다.
            { expiresIn: '1h' }
        );

        //그 토큰을 쿠키에게 던져주기
        //serialize('쿠키이름', '쿠키의값', {옵션});
        const cookie = serialize('token', token, {
            httpOnly: true,
            path: '/',
            maxAge: 60*60,//쿠키의 유효시간. 무조건 초가 들어가야한다. 3일이고싶으면 3*24*60*60
        });

        // 저 쿠키는 웹브라우저의 헤더에 들어간다
        // setHeader(예약된헤더이름, 헤더값)
        // setHeader('Content-Type', 'application/json');이런거처럼...
        res.setHeader('Set-Cookie', cookie);

        // 성공했다고보내주기
        res.status(200).json({message: "Login Success"});


    } catch(err){
        console.error(err);
    }


}

export default loginfunction;

