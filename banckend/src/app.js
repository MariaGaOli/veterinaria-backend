import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import AnimalRoutes from './routes/AnimalRoutes.js'
import consultaRoutes from "./routes/ConsultaRoutes.js";

dotenv.config();
const PORT = process.env.PORT;
const app = express()


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/consultas", consultaRoutes);

app.use('/api', AnimalRoutes)

app.get('/', (req, res)=>{

    res.json({message:'API veterinário esta rodando'})
})

app.use((req, res)=>{
    res.status(404).json({error:'Rota não encontrada'})
})

app.listen(PORT,()=>{
    console.log('Servidor rodando na porta:'+ PORT)
})

export default app;