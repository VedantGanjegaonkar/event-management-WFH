import express from 'express'
import mongoose from "mongoose"
import cors from 'cors';
import userRoutes from './routes/user.routes';
import eventRoutes from './routes/event.routes'
const app = express()
const port = 3000


// Middlewares
app.use(cors());
app.use(express.json());

//routes
app.use('/user',userRoutes)
app.use('',eventRoutes)



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

mongoose.connect('mongodb+srv://vedantsg112233:MzUFmOl5GA6oCL77@cluster0.rfaqwkb.mongodb.net/event?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => {
    console.log('connected to DB');
  });