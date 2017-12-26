const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const DAL = require('../DAL')

const NUM_OF_COINS = 10;

/* GET users listing. */
router.get('/', function (req, res, next) {
  fetch('https://api.coinmarketcap.com/v1/ticker/?limit=250')
    .then(function (res) {
      return res.text();
    }).then(function (body) {
      try {
        const coinsRes = JSON.parse(body);
        const randomCoins = pickRandomCoins(NUM_OF_COINS, coinsRes);
        res.json(randomCoins);
        //save the entire 250 coins
        DAL.upsertCoins(coinsRes);
      } catch (e) {
        res.json([]);
      }

    });
});

function pickRandomCoins(numOfCoins, coinsArr) {
  const pickedCoinsIndex = new Set();
  const resArr = [];
  while (resArr.length !== numOfCoins && numOfCoins > 0) {
    // pick a number between 0 to coins array length
    const position = Math.floor(Math.random() * coinsArr.length);
    if (!pickedCoinsIndex.has(position)) {
      pickedCoinsIndex.add(position);
      resArr.push(coinsArr[position]);
    }
  }
  return resArr
}

module.exports = router;