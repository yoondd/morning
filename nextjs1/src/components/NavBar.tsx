import React, { useEffect, useState } from 'react';
import Link from 'next/link';
//sass 파일 모듈화 시키기
import styles from '@/styles/NavBar.module.scss';
import { useRouter } from 'next/router';

function NavBar(props) {

    const [ isLoggedIn, setLoggedIn ] = useState<boolean>(false);
    const router = useRouter();

    // 로그인이 되었나 안되었나 확인
    const checkLoggedIn = async () => {
        try {
            //navbar가 나의 헤더를 me한테 보내줘야한다. 그래야 거기서 parse를 하던가말던가하지
            const res = await fetch("/api/me",{
                credentials: "include", //이거만있으면 보내지는것이다
            });
            setLoggedIn(res.ok);
        }catch(err){
            setLoggedIn(false);
        }
    }

    useEffect(()=>{
        checkLoggedIn();
        router.events.on('routeChangeComplete', checkLoggedIn); //라우트 이벤트가 일어날때 완료되면 저거 실행해라
        return () => {
            router.events.off('routeChangeComplete', checkLoggedIn);
        }
    },[router.events]); // 공배열로두면 최초에만 한번이니까, 다른 페이지로 이동할때마다 반복하라고 세팅해야겠어


    return (
        <div className={styles.navbar}>
            <div className={styles.logo}>
                <Link href="/">Heart Drawing</Link>
            </div>
            <ul className={styles.menu}>
                <li>
                    <Link href="/">Home</Link> {/*index.tsx로 무조건 똑같다. 그렇게 약속이되어있다*/}
                </li>
                <li>
                    <Link href="/about">About</Link> {/*pages에 파일만 존재하면된다*/}
                </li>
                <li>
                    <Link href="/news">News</Link>
                </li>
                <li>
                    <Link href="/map">Map</Link>
                </li>

                <li>
                    <Link href="/signup">Sign up</Link>
                </li>
                <li>
                    <Link href="/login">Login</Link>
                </li>
            </ul>
        </div>
    );
}

export default NavBar;