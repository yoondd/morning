import React from 'react';
import Link from 'next/link';
//sass 파일 모듈화 시키기
import styles from '@/styles/NavBar.module.scss';
function NavBar(props) {
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
            </ul>
        </div>
    );
}

export default NavBar;