import React from 'react';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './Gallery.css';

const Gallery = () => {
  const [ dataImg, setDataImg ] = useState([]);
  useEffect(()=>{ // 나 바뀌었니? 체크하는게 useEffect . 내 상태 어때?
    const fetchImg = async () => {
      try {
        const res = await fetch(`${process.env.PUBLIC_URL}/data/data.json`);
        const data = await res.json();
        setDataImg(data); // json으로 받아온 값을 useState에 담는다
      } catch(err) {
        console.error(err);
      }
    }

    fetchImg(); // 위에서 만들었으니까 이제 실행해야지.
  }, []);
  
  return (
    <div className="gallery-container">
      {/* 흐르는 이미지 시작*/}
      <div classname="scroll-container">
        <div className="scroll-track">
          {
            //자연스럽게 하기 위해서 똑같은 이미지를 덧붙여서 표현할거다
            dataImg.concat(dataImg).map((item, idx)=>(
              <div className="scroll-item" key={idx}>
                <div>{item.title}</div>
                <img src={process.env.PUBLIC_URL + item.src} alt={item.title} className="scroll-img" />
                <div>{item.description}</div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Gallery
