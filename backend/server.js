const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');

const userRoute = require('./routes/userRoutes');

dotenv.config();
const PORT = process.env.PORT || 5000
const mongodbUri = process.env.MONGO_URI || null;


const app = express();

app.use(express.json());

app.use(cors());

app.use('/api/users', userRoute);


app.listen(PORT, console.log(`Server has started at port ${PORT}`));

mongoose.connect(mongodbUri)
    .then(() => console.log('MongoDB successfully connected!'))
    .catch((error) => console.log(error));