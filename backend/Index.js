const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./routes/router')

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}));

const corsOptions = {
    origin: '*',
    Credential: true,
    optionSuccessStatus: 200
}
app.use(cors());
app.use('/api', router);


app.use(cors(corsOptions));
const port = 5000;
const server = app.listen(port, () => {
    console.log(`Server is running at port ${port}`)
})