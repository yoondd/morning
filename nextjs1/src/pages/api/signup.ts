import type {  NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/lib/db';
import bcrypt from 'bcrypt';

const backSignFunction = async (req: NextApiRequest, res: NextApiResponse) => {

    // post 작업이 아니라면 나가버려. 왜나가는지 "허용안되는 메서드"라는 것도 보여주고 말야.
    if(req.method != 'POST') return res.status(405).json({ error: "Method Not Allowed" });

    // 테이블 항목명이랑 이제 잘 맞춰서. 받아오는것 세팅.
    const { email, password, name } = req.body;

    // 데이터가 비어있는 경우 대응.
    if( !email ||  !password || !name ) {
        return res.status(400).json({ error: "Please enter data" });
    }


    try {
        // 원래 이렇게 하잖아??
        // const rel = await db.query();
        // const data = rel[0]

        // 아래처럼 쉽게 쓸 수 있다. - 하고픈일: 이메일이 같은지를 묻고싶다.
        const [ data ] = await db.query(`SELECT id FROM users WHERE email = ?`, [email]);
        // 여기서 data에 값이 있으면 누군가 그 이메일로 가입을 했다는 사실이 된다.
        if( (data as any[]).length > 0 ) {
            return res.status(400).json({ error: "Email already exist" });
        }

        // 걸러내는걸 다 했으니까 정상적인 가입절차를 진행한다
        // 오? 근데 패스워드를 그냥 넣어주면 큰일나겠구나! 드디어 bcrypt를 쓸 때구나.
        const hashPassword = await bcrypt.hash(password, 10); // 10은 복잡단계야

        //이제 받은 자료를 테이블에 넣기만 하면되겠다
        //created at 은 생성일이 자동으로 들어가게끔 세팅이 되어있다.
        await db.query('INSERT INTO users ( email, password, name ) values (?,?,?) ', [email, hashPassword, name]);

        //여기까지 나와있는 json()은 전부 나를 위한거고 고객에게 보여줄 것들은 프론트에서 하는 것이다
        res.status(201).json({ success: '회원가입 성공' });

    } catch(err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }


}


export default backSignFunction;