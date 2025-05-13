import React, {FormEvent, useState} from 'react';
import { useRouter } from 'next/router';
import styles from "@/styles/Login.module.scss";

const Login = () => {

    //한번 튕겨주기
    const router = useRouter();

    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ message, setMessage ] = useState('');

    const loginSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res =  await fetch("/api/login", {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email, password})
            });
            const data = await res.json();

            if(res.ok) {
                setMessage("success");
                setTimeout(() => {
                    router.push("/");
                },1000);
            }else {
                setMessage("Login Error");
            }

        }catch(err){
            console.error(err);
            setMessage("server error")
        }

    }

    return (
        <div className={styles.container}>

            {/*팝업의 배경이 될 영역*/}
            <div className={styles.bg}></div>

            {/*실제 회원가입 팝업*/}
            <div className={styles.login}>

                {/*누르면 루트로 가라*/}
                <button className={styles.close} onClick={()=> router.push('/') }>X</button>

                <h2>Login</h2>

                <form onSubmit={loginSubmit}>
                    <input type="email" placeholder="email" value={email} onChange={ e => setEmail(e.target.value) } />
                    <input type="password" placeholder="password" value={password} onChange={ e => setPassword(e.target.value) } />
                    <button type="submit">LOGIN</button>
                </form>
                {
                    //메시지가 나올 공간 - 메시지가 있을때만 나와야한다.
                    message && <h3 className={styles.message}>{message}</h3>
                }

            </div>

        </div>
    );
};

export default Login;