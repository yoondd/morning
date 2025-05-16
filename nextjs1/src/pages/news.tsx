import React, { useEffect, useState } from 'react';
import styles from '@/styles/News.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import {setIn} from "immutable";

//데이터 받아오는 방식을 정확히 지정한다. 예전에 내가 코딩테스트 인터페이스 잡았 듯.
type NewsItem = {
    title: string;
    link: string;
    description: string;
    pubDate: string;
    // originallink: string;
}

const News = () => {

    //뉴스를 위함( 속보, 검색결과물, 쿼라)
    const [ headLineList, setHeadLineList ] = useState<NewsItem[]>([]); // 속보는 newsitem이 많이 담긴 배열이다는 뜻.
    const [ searchResultList, setSearchResultList ] = useState<NewsItem[]>([]);
    const [ query, setQuery ] = useState('');

    //날씨 (상태, 아이콘, 온도)
    const [ weatherTemp, setWeatherTemp ] = useState<number | null>(null);
    const [ weatherIcon, setWeatherIcon ] = useState<string | null>(null);
    const [ weatherDesc, setWeatherDesc ] = useState<string | null>(null);

    //실시간을 보여줄 수 있게 오늘 날짜와 시간을 출력하자
    const [ nowDate, setNowDate ] = useState("");
    const [ nowTime, setNowTime ] = useState( "" );


    const getNews = async () => {
        try{
            // 속보 가져오기
            const res = await fetch("/api/news?query=속보");
            const data = await res.json(); //객체로 바꿔라~
            // console.log(data);
            setHeadLineList(data.items || []); //아이템이 없다면 빈 배열로 받으라고해서 에러를 방지

        }catch(err){
            console.log("Error getting news");
        }
    }

    const searchNews = async (e: React.FormEvent) => {

        e.preventDefault();

        if(!query) return false; //검색어가 없으면 안된다!

        try{
            // 제대로 입력하지않을 수 도 있으니까!  encode도 해주기!
            const res = await fetch(`/api/news?query=${encodeURIComponent(query)}`);
            const data = await res.json();

            setSearchResultList(data.items || []);
        }catch(err){
            console.log("Error search news");
        }
    }




    //날씨가져오기
    //가이드 : https://openweathermap.org/api/one-call-3
    const getWeather = async  () => {
        try{
            const res = await fetch("https://api.openweathermap.org/data/2.5/weather?q=suwon&units=metric&appid=0f347a891b27262bf15023a506af4bbe&lang=kr");
            const data = await res.json();
            setWeatherTemp(data.main.temp);
            setWeatherIcon(data.weather[0].icon);
            setWeatherDesc(data.weather[0].description);
        }catch(err){
            console.log("Error getting weather");
        }
    }

    const getNowDateTime = () =>{
        const now = new Date();
        setNowDate( now.toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        }));
        setNowTime( now.toLocaleTimeString("ko-KR", {
            hour: "2-digit",
            minute: "2-digit",
        }));
    }

    useEffect(() => {

        getNews();
        getWeather();
        getNowDateTime();
        const interval = setInterval(getNowDateTime, 1000 * 60);

        return ()=>clearInterval(interval);



    }, []);






    return (
        <div className={styles.news}>
            <div className={styles.container}>
                <div className={styles.top}>
                    <h4>{nowDate} <span>{nowTime}</span></h4>
                    <div className={styles.weather}>
                        <span>{weatherTemp}°C</span>
                        <img src={`https://openweathermap.org/img/wn/${weatherIcon}.png`} alt="날씨아이콘"/>
                        <span>{weatherDesc}</span>
                    </div>
                </div>

                <div className={styles.headline}>
                    <Swiper
                        modules={[Autoplay]}
                        className={styles.swiper}
                        loop={true} // 슬라이드 루프
                        spaceBetween={50} // 슬라이스 사이 간격
                        slidesPerView={1} // 보여질 슬라이스 수
                        direction="vertical"
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                        }}
                    >
                        {headLineList.map((slide) => (
                            <SwiperSlide key={slide.title} className={styles.swiperslide}>
                                <div>
                                    {/*noreferrer은 보안때문에 넣어준다 외부링크라서*/}
                                    <a href={slide.link} target="_blank" rel="noreferrer">
                                        <div dangerouslySetInnerHTML={{ __html: slide.title }}></div>
                                    </a>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                <form className={styles.search} onSubmit={searchNews}>
                    <input type="text" value={query} placeholder="검색어를 입력하세요." onChange={e=>setQuery(e.target.value)} />
                    <button type="submit">검색</button>
                </form>

                <div className={styles.newslist}>
                    {
                        searchResultList.map(item => (
                            <a href={item.link} target="_blank" key={item.title} rel="noreferrer">
                                <div className={styles.newsbox}>
                                    <div dangerouslySetInnerHTML={{ __html: item.title }}></div>
                                    <p dangerouslySetInnerHTML={{ __html: item.description }}></p>
                                    <span>{item.pubDate}</span>
                                </div>
                            </a>
                        ))
                    }
                </div>

            </div>


        </div>
    );
};

export default News;