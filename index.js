require('dotenv').config();
const cors = require('cors');
const express = require('express');
const { connectDB } = require('./db/connect');
const { blockchainRouter } = require('./routes/blockchain');
const bodyParser = require('body-parser')
const app = express();

app.use(cors());
app.set('trust proxy', true);
app.use(bodyParser.json());

app.use('/weschain', blockchainRouter);


const port = process.env.PORT || 4000;

const start = async () => {
    try {

        await connectDB(process.env.MONGODB_URI);

        console.log('Connected to database');

        app.listen(port, () =>
            console.log(`Server is listening on port ${port}...`)
        );

    } 
    
    catch (error) {
        console.error(error);
    }
};

start();