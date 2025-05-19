import React from 'react';
import { useState } from 'react';
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
    return (
        <div className={styles.signupContainer}>
            <div className={styles.signup}>
                <h2>Sign Up</h2>
                <form className={styles.signupForm}>
                    <div className={styles.fieldGroup}>
                        <label htmlFor="">ID</label>
                        <input
                            type="text" name="userid" value={form.userid} onChange={formChange}
                            // 정규식작성 / 다른상자로 넘어갔을때 이 기능을 넣어줘라 onFocus와 반대라고 생각하면된다.
                            // onBlur={}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;