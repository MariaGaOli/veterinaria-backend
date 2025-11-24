import mysql2 from'mysql2/promise'
import dotenv from 'dotenv'

dotenv.config();

const pool = mysql2.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
})

pool.getConnection().then(connection=>{
    console.log('Conexão OK')
    connection.release();
}).catch(err=>{
    console.error('Erro ao se conectar ao banco')
})
export default pool