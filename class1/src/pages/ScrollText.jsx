import React from 'react';wi
import './ScrollText.css';

const ScrollText = () => {

    // 현재 몇번째 섹션인지 확인하는 변수
    const [ sectionIdx, setSectionIdx ] = useState(0); 

    const textScroll = () => {
        
        //현재의 스크롤 위치
        const currentScrollPostion = window.scrollY;
        
        //화면(뷰포트)의 높이
        const docHeight = window.innerHeight;

       
        if( currentScrollPostion < docHeight * 0.6 ){
            setSectionIdx(0);   // 스크롤이 화면의 80%이상 내려가기 전
        }else if( currentScrollPostion < docHeight * 1.6 ){
            setSectionIdx(1);   // 스크롤이 화면의 180%이상 내려가기 전
        }else {
            setSectionIdx(2);   // 스크롤이 화면의 180%이상 내려간 이후.
        }

    }

    // 그냥 실행하면안되고, 변화가 있을때만 감지
    useEffect(()=>{
        window.addEventListener('scroll', textScroll);
        
        //최초 상황에도 한번은 일어나야하니까.
        textScroll();

        //메모리 제거 (다른 컴포넌트로 가면 가져가지않도록.) -- 클린업
        return ()=>{
            window.removeEventListener('scroll', textScroll);
        }
    },[]);


    return (
        <div class="scrolltext-container">
            <section className={`section ${ sectionIdx === 0 ? 'on' : '' }`}>
                 <h1>Study hard</h1>
            </section>
            <section className={`section ${ sectionIdx === 1 ? 'on' : '' }`}>
                <h1>Dreams come true</h1>
                 
            </section>
            <section className={`section ${ sectionIdx === 2 ? 'on' : '' }`}>
                 <img src={ `${process.env.PUBLIC_URL}/images/img5.jpg` } alt="나의 이미지" />
            </section>
        </div>
    )
}

export default ScrollText
