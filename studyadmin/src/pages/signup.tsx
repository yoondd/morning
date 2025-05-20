import React from 'react';
import { useState, useRef } from 'react';
import styles from '@/styles/Signup.module.scss';

const Signup = () => {

    const [ form, setForm ] = useState({
        userid: '',
        email: '',
        password: '',
        checkPassword: '',
        name: '',
        birth: '',
        gender: '',
        address: ''
    });
    const formChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        //change가 일어날때마다 무얼해달라는 요청을 해야한다.
        const { name, value } = e.target;
        setForm({...form, [name]: value});
    }
    const [ message, setMessage ] = useState('');
    const useridRef = useRef<HTMLInputElement>(null);
    const userpwRef = useRef<HTMLInputElement>(null);

    return (
        <div className={styles.signupContainer}>
            <div className={styles.signup}>
                <h2>Sign Up</h2>
                { message && (
                    <div className={styles.alarmbox}>
                        <span>{message}</span>
                        <button type="button" onClick={()=>{ setMessage("") }}>닫기</button>
                    </div>
                )}
                <form className={styles.signupForm}>
                    <div className={styles.fieldGroup}>
                        <label htmlFor="">ID</label>
                        <input
                            type="text" name="userid" value={form.userid} onChange={formChange} ref={useridRef}
                            // 정규식작성 / 다른상자로 넘어갔을때 이 기능을 넣어줘라 onFocus와 반대라고 생각하면된다.
                            onBlur={
                                () => {
                                    const useridReg =  /^(?=.*[a-zA-Z])[a-zA-Z0-9]{4,}$/;
                                    if(!useridReg.test(form.userid)) {
                                        setMessage("규칙오류: 아이디는 4글자 이상이며 영어를 포함해야합니다");

                                        //강제로 포커스를 다시 userid 입력 상자로 세팅하기
                                        useridRef.current?.focus();
                                    }else {
                                        setMessage("");
                                    }
                                }
                            }
                        />
                    </div>
                    <div className={styles.fieldGroup}>
                        <label htmlFor="">PASSWORD</label>
                        <input
                            type="password" name="password" onChange={formChange} ref={userpwRef}
                            // 특수기호를 반드시포함해라.
                            onBlur={
                                () => {
                                    const passwordRef =  /^(?=.*[a-zA-Z*.#$])[a-zA-Z0-9]{4,}$/;
                                    if(!passwordRef.test(form.password)) {
                                        setMessage("규칙오류: 패스워드는 4글자 이상이며 영어, 특수문자를 포함해야합니다");

                                        //강제로 포커스를 다시 userid 입력 상자로 세팅하기
                                        userpwRef.current?.focus();
                                    }else {
                                        setMessage("");
                                    }
                                }
                            }
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;