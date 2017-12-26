const mongoose = require('mongoose');
// Connection URL
const url = 'mongodb://localhost:27017';
// Database Name
const dbName = 'test';

mongoose.connect(`${url}/${dbName}`);

var Coin = mongoose.model('Coin', {
    "id": String,
    "name": String,
    "symbol": String,
    "rank": String,
    "price_usd": String,
    "price_btc": String,
    "24h_volume_usd": String,
    "market_cap_usd": String,
    "available_supply": String,
    "total_supply": String,
    "percent_change_1h": String,
    "percent_change_24h": String,
    "percent_change_7d": String,
    "last_updated": String
});

const DAL = {};

DAL.upsertCoins = (coins) => coins.forEach(c => {
    Coin.update({
            id: c.id
        },
        Object.assign({}, c), {
            upsert: true
        },
        (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log(`Coin ${c.id} updated in DB`);
            }
        });
});

module.exports = DAL;