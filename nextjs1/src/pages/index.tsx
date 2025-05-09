import React, { useState, useEffect } from 'react';
import styles from '@/styles/MainPage.module.scss';

interface Image {
    src: string;
    text: string
}

const MainPage = () => {
    const images: Image[] = [
        { src: '/image1.jpg', text: 'Image1' },
        { src: '/image2.jpg', text: 'Image2' },
        { src: '/image3.jpg', text: 'Image3' },
    ];
    const [ idx, setIdx ] = useState(0); //몇번째 그림인가 판단
    const [ showText, setShowText ] = useState(false); // 글자 나올 타이밍 판단

    useEffect( ()=>{
        const abc = setTimeout( () => setShowText(true), 500 );
        const abctimeout = setTimeout( ()=> setShowText(false), 2800 );
        const interval = setInterval( ()=>{
            setTimeout( ()=> setShowText(false), 2800 );
            setIdx( item => (item + 1) % images.length );
            setShowText(true);
        }, 4500)

        return () => {
            clearInterval(interval);
            clearTimeout(abc);
        }
    },[])

    return (
        <div className={styles.main}>
            <div className={styles.bgbox} style={{ backgroundImage: `url(${images[idx].src})` }}>
                <p className={`${styles.slidetxt} ${ showText ? styles.show : ''}`}>Easily record your thoughts and feelings</p>
            </div>

        </div>
    );
};

export default MainPage;