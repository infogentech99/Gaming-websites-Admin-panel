import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser'; 
import userRoutes from './route/user.route.js';
import adminRoutes from './route/admin.route.js';
import betRoutes from './route/bet.route.js';
import  settleBets  from './bettingService.js';

const app = express();

dotenv.config();
const URI = process.env.MONGO_URI;
const URL = process.env.URL;
const PORT = process.env.PORT || 4000 ;


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({
  origin: (origin, callback) => {
    callback(null, origin); 
  },
  credentials: true
}));

app.use(cookieParser());

try {
  mongoose.connect(URI)
} catch (error) {
  console.log(" Error: ", error);
}

app.use('/user',userRoutes);
app.use('/bet',betRoutes);
app.use('/admin',adminRoutes);

app.get('/', (req, res) => {
  res.send('hello')
});


// function scheduleBetSettlement() {
//   settleBets().finally(() => {
//     // Schedule the next execution after i min
//     setTimeout(scheduleBetSettlement, 60 * 1000);
//   });
// }

// scheduleBetSettlement();


app.listen(PORT,()=>{
    console.log(`app listening on port ${PORT}`);
});
