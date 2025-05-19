import React from 'react';
import Link from "next/link";
import styles from '@/styles/Nav.module.scss'

const Nav = () => {
    return (
        <div className={styles.navcontainer}>
            <div className={styles.navbar}>
                <div className={styles.logo}>
                    <Link href="/">WellnessWay</Link>
                </div>
                <ul className={styles.menu}>
                    <li>
                        <Link href="/about">About</Link>
                    </li>
                    <li>
                        <Link href="/map">Contact us</Link>
                    </li>
                    <li>
                        <Link href="/login">Login</Link>
                    </li>
                    <li>
                        <Link href="/signup">Sign up</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Nav;