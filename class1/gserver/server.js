//db 접속이 가능한 node 파일을 만들었다. 25.04.11

//익스프레스를 사용하자. 한번 콜해서.
const express = require("express");
const app = express();

//mysql 접속하게 도와준다
const mysql = require("mysql2");

// 나는 dotenv를 사용할거야
require('dotenv').config();

//cors도 사용하겠다고 선포한다  --  나뉜 나의 많은 포트들을 하나로 융합한다. 
const cors = require("cors");
app.use(cors());

//json을 주고받아야하기때문에 선포를 해준다.
app.use(express.json());


const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});





// const db = mysql.createConnection({
//     host: '34.41.55.78',
//     user: 'root',
//     password: 'Powerhk89*',
//     database: 'root',
// })


db.connect(err=>{
    if(err) {
        console.error('db 연결 실패',err);
    } else {
        console.log('db 연결 성공');
    }
});

//셀렉트를 해서 보여달라고 할꺼야. 그러면 무조건 get방식이지.
//날짜순으로 내림차순을해서 최근내용이 위로 올라오게 할거야.
app.get('/guest',(req,res)=>{
    db.query(`SELECT * FROM guest ORDER BY created_at DESC`, (err, results)=>{
        res.json(results);
    });
});

app.post('/guest',(req,res)=>{
    const { name, message } = req.body;
    db.query(`INSERT INTO guest (name, message) VALUES (?, ?)`, [name, message], (err)=>{
        if(err) res.status(500).send(err);
    });

});

app.listen(8881, ()=>{
    console.log('8881에서 대기중');
})