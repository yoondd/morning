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
    const formChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>{
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
                        <p className={styles.alert}>※ 아이디는 4글자 이상이며 영어를 포함해야합니다</p>
                    </div>

                    <div className={styles.fieldGroup}>
                        <label htmlFor="">PASSWORD</label>
                        <input
                            type="password" name="password" value={form.password} onChange={formChange} ref={userpwRef}
                            // 특수기호를 반드시포함해라.
                            onBlur={
                                () => {
                                    const passwordRef =  /^(?=.*[a-zA-Z])(?=.*[!@#$%^&*()_+])[a-zA-Z0-9!@#$%^&*()_+]{4,}$/;
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
                        <p className={styles.alert}>※ 패스워드는 4글자 이상이며 영어, 특수문자를 포함해야합니다</p>
                    </div>
                    <div className={styles.fieldGroup}>
                        <label htmlFor="">PASSWORD Check</label>
                        <input
                            type="password" name="checkPassword" value={form.checkPassword} onChange={formChange}
                            onBlur={
                                () => {
                                    if ( form.checkPassword !== form.password ) {
                                        setMessage("비밀번호가 일치하지 않습니다");
                                    }else {
                                        setMessage("");
                                    }
                                }
                            }
                        />
                        <p className={styles.alert}>※ 패스워드를 한번 더 확인해주세요</p>
                    </div>
                    <div className={styles.fieldGroup}>
                        <label htmlFor="">E-mail</label>
                        <input
                            type="email" name="email" value={form.email} onChange={formChange}
                        />
                    </div>
                    <div className={styles.fieldGroup}>
                        <label htmlFor="">Gender</label>
                        <select name="gender" value={form.gender} onChange={formChange}>
                            <option value="">성별 선택</option>
                            <option value="m">남자</option>
                            <option value="f">여자</option>
                        </select>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;