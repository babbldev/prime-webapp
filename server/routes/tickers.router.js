const express = require('express');
const axios = require('axios');
const router = express.Router();
require('dotenv').config();

router.get('/:ticker', (req, res) => {
    console.log( 'in GET /api/tickers');
        axios.get(`https://cloud.iexapis.com/stable/stock/${req.params.ticker}/intraday-prices/?token=${process.env.IEX_CLOUD_API_TOKEN}`)
            .then( response => {
                const objectToSend = {
                    current_price: response.data[response.data.length - 1].close,
                    percent_change: (response.data[0].open - response.data[response.data.length - 1].close) / response.data[0].open * 100,
                    points_change: response.data[0].open - response.data[response.data.length - 1].close
                }
                res.send(objectToSend)
            }).catch( err => {
                console.log( 'erroing connecting with babbl api /tickers GET');
                res.sendStatus(500);
            })
});

module.exports = router;