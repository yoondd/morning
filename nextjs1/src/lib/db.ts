import mysql from 'mysql2/promise';


//nextjs에서는 mysql으로 젒속할 떄 이렇게 쓴다
export const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})