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
  

  let imgInfo = [
    { x: -30, y: 20 },
    { x: 0, y: -50 },
    { x: 30, y: 30 },
  ]

  return (
    <div className="gallery-container">

      <h1>Image Slide</h1>
      {/* 흐르는 이미지 시작*/}
      <div className="scroll-container">
        <div className="scroll-track">
          {
            //자연스럽게 하기 위해서 똑같은 이미지를 덧붙여서 표현할거다
            dataImg.concat(dataImg).concat(dataImg).concat(dataImg).map((item, idx)=>(
              <div className="scroll-item" key={idx}>
                <div>{item.title}</div>
                <img src={process.env.PUBLIC_URL + item.src} alt={item.title} className="scroll-img" />
                <div>{item.description}</div>
              </div>
            ))
          }
        </div>
      </div>


      <hr />

      <h1>Fade-up Image</h1>
        {/* 페이드 이미지 */}
        <motion.div
          // 초기상태 선언
          initial={{ opacity: 0, y: 70 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.4 }}
          className="fade-section"
        >
          <div className="img-box">
            <img src={`${process.env.PUBLIC_URL}/images/img4.jpg`} alt="바다" />
          </div>
          <div className="text-box">
            <h2>Summer!</h2>
            <h4>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Totam placeat, error ut ratione debitis quidem aliquid eveniet. Praesentium enim ex odio ducimus, sapiente, harum cum vel eum et fugit explicabo!</h4>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 70 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.4 }}
          className="fade-section"
        >
          <div className="text-box">
            <h2>Lovely Puppy</h2>
            <h4>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fuga magni nam tempore quod ipsam. Eligendi dignissimos est reprehenderit porro, perspiciatis accusantium, vel a officiis ratione natus delectus placeat ab impedit.</h4>
          </div>
          <div className="img-box">
            <img src={`${process.env.PUBLIC_URL}/images/img5.jpg`} alt=" 강아지" />
          </div>

        </motion.div>

        <motion.div
          // 초기상태 선언
          initial={{ opacity: 0, y: 70 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.4 }}
          className="fade-section"
        >
          <div className="img-box">
            <img src={`${process.env.PUBLIC_URL}/images/img6.jpg`} alt="고양이" />
          </div>
          <div className="text-box">
            <h2>Cat, Cat, Cat!!!</h2>
            <h4>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed quia nam eum hic asperiores, voluptas libero illo ducimus odio eligendi nobis. Eligendi enim saepe quis molestiae facilis illum, eaque sint.</h4>
          </div>
        </motion.div>

        <hr />

        <h1>Animation Element</h1>

        {/* 모아지는 이미지 */}
        <div className="group-img">
          {
            
            imgInfo.map( (position, idx) => (
              <motion.img  
                key={idx}
                src={`${process.env.PUBLIC_URL}/images/img${idx+1}.jpg`}
                initial={{ opacity: 0, y: position.y, x: position.x }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                transition={{ duration: 1, delay: idx*0.5, ease: 'easeOut' }}
                viewport={{ once: true, amount: 0.5 }}
              />
            ))
          }
        </div>
     
    </div>
  )
}

export default Gallery
