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

    const fsum = async(e: React.FormEvent) => {
        //폼의 이벤트 방지
        e.preventDefault();

        try {
            //보내는 작업에 대한 fetch  server파일찾아가야하는거다. 그래서 /api/signup
            const res = await fetch('/api/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify([email, password, name])
            })
            const data = await res.json();

            //회원가입이 성공했을 때, 제어
            if(res.ok) {
                setMessage('회원이 되셨습니다. 환영합니다. 로그인하세요. ');
                setEmail('');
                setPassword('');
                setName('');
            }else{
                setMessage(data.error || '오류 발생: 회원가입에 실패했습니다.');
            }

            //회원가입이 실패했을 때, 제어

        } catch (err) {
            console.error(err);
            setMessage('서버오류: 서버가 고장났어요'); // 고객이 보는 곳
        }
    }


    return (
        <div>

        </div>
    );
};

export default Signup;