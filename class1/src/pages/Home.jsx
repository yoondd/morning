import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './Home.css';

const Home = () => {
  const images = [
    { src: "img1.jpg", title: "첫번째 이미지" },
    { src: "img2.jpg", title: "두번째 이미지" },
    { src: "img3.jpg", title: "세번째 이미지" }
  ]
  const [ inx, setInx ] = useState(0); // 인덱스번호를 알려줄 예정 
  const [ weather, setWeather ] = useState(null);

  //슬라이드를 만드는 것 - 변화되는 친구는 이걸로 만든다
  useEffect(()=>{
    const slide = setInterval(()=>{
      setInx( prev => prev === images.length - 1 ? 0 : prev + 1 );
    }, 4000)
    return () => clearInterval(slide); // 다른 페이지로 넘어갈 때. ? setInterval은 메모리를 계속 차지하네? 그걸 꺼야돼. 그래야 메모리를 차지하지않지. 
  }, []);  // []는 의존성


  useEffect(()=>{
    const API_KEY = '0f347a891b27262bf15023a506af4bbe'; // 상수는 대문자로 
    const CITY = 'ansan';
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric`;

    const fetchWeather = async () => {
      try {
        const response = await axios.get(URL);
        console.log(response)
        setWeather(
          {
            temp: response.data.main.temp,
            description: response.data.weather[0].description,
            icon: response.data.weather[0].icon,
          }
        );
      } catch (err) {
        console.log(err);
      }
    }
    fetchWeather();
    
  }, [])


  return (
    <div className="home-container">
      {
        images.map((img, idx) => (
          <div
            key={idx} //리액트에서는 반복하려면 무조건 키가 있어야한다
            className={`img ${inx === idx ? 'active' : ''}`}
            style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/${img.src})` }} //${process.env.Public_URL} 로컬에서는 큰 문제가없지만 배포할때 나오는 오류를 방지한다. 
          >
          <h1 className={`title ${inx === idx? 'on' : ''}`}>
            {img.title}
          </h1>
          </div>
        ))
      }

      {/* api공간 */}
      {
        weather && (
          <div className="weather">
            <img src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`} alt={weather.description}
            referrerPolicy='no-refferrer' //참고하지말고 그냥 막 보여줘도돼(배포대응)
            />
            <div className="temp">{weather.temp}°C</div>
            <div className="desc">{weather.description}</div>
          </div>
        )
      }
    </div>
  )
}

export default Home
