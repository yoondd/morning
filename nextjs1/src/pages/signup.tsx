import React, { useState } from 'react'; //useState: input clear
import { useRouter } from 'next/router';
import styles from '@/styles/Signup.module.scss';

const Signup = () => {

    // 회원가입에 필요한 주요 값
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ name, setName ] = useState('');

    //회원가입 성공여부
    const [ message, setMessage ] = useState('');

    //팝업창이 뜨고 닫으면 홈으로 갔으면 좋겠다
    const router = useRouter(); // 훅이라서 다른 변수에 한번 튕겨줘야한다

    const formSubmit = async(e: React.FormEvent) => {
        //폼의 이벤트 방지
        e.preventDefault();

        try {


            //보내는 작업에 대한 fetch  server파일찾아가야하는거다. 그래서 /api/signup
            const res = await fetch('/api/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({email, password, name})
            })
            const data = await res.json();

            //회원가입이 성공했을 때, 제어
            if(res.ok) {
                setMessage('Sign Up Successful!');
                setEmail('');
                setPassword('');
                setName('');
            }else{
                setMessage(data.error || 'Failed to submit!');
            }

            //회원가입이 실패했을 때, 제어

        } catch (err) {
            console.error(err);
            setMessage('서버오류: 서버가 고장났어요'); // 고객이 보는 곳
        }
    }


    return (
        <div className={styles.container}>

            {/*팝업의 배경이 될 영역*/}
            <div className={styles.bg}></div>

            {/*실제 회원가입 팝업*/}
            <div className={styles.signup}>

                {/*누르면 루트로 가라*/}
                <button className={styles.close} onClick={()=> router.push('/') }>X</button>

                <h2>Sign Up</h2>

                <form onSubmit={formSubmit}>
                    <input type="text" placeholder="name" value={name} onChange={ e => setName(e.target.value) } />
                    <input type="password" placeholder="password" value={password} onChange={ e => setPassword(e.target.value) } />
                    <input type="email" placeholder="email" value={email} onChange={ e => setEmail(e.target.value) } />
                    <button type="submit">SEND</button>
                </form>
                {
                    //메시지가 나올 공간 - 메시지가 있을때만 나와야한다.
                    message && <h3 className={styles.message}>{message}</h3>
                }

            </div>

        </div>
    );
};

export default Signup;