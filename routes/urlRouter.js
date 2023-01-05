const express = require('express');
const { getRowId, getLongUrl, insert } = require('../controller/urlController');
const router = express.Router();

// encode to base62

// insert into db, get the id of the row, hash it and return

// to remove expried data run a batch job?
function getRandomShortUrl() {
    const MP = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let str = '';
    for (let index = 0; index < 7; index++) {
        const idx = Math.floor(Math.random()*63);
        str += MP[idx];
    }
    return str;
}

async function encode(req, res, next) {
    try {
        const longUrl = req.body.longUrl;

        let shortUrl = getRandomShortUrl();

        let shortUrlAlreadyExists = (await getRowId(shortUrl)) !== undefined; // row id returned is a nonegative value
        while (shortUrlAlreadyExists) {
            shortUrl = getRandomShortUrl();
            shortUrlAlreadyExists = (await getRowId(shortUrl)) !== undefined;
        }

        let insertStatus = await insert(longUrl, shortUrl);
        
        insertStatus.then(
            function (success) {
                console.log(success);
                res.send({
                    'status': 200,
                    'shortUrl':shortUrl
                })
            },
            function (error) {
                throw new Error(error)
            }
        )
    } catch (error) {
        res.send({
            'status': 300,
            'message': error
        })
    }
}

async function decode(req, res, next) {
    try {
        const shortUrl = req.params.shortUrl;
        let longUrlStatus = await getLongUrl(shortUrl);

        console.log(typeof(longUrlStatus));
        if (longUrlStatus !== undefined) {
            console.log('on succesful compleztion of getLongUrlStatus');            
            res.status(301).redirect(longUrlStatus)
        }

        // longUrlStatus.then(
        //     function (success) {
                // console.log('on succesful compleztion of getLongUrlStatus');
                // res.status(301).redirect(success)
        //     },
        //     function (failure) {
        //         throw new Error(failure)
        //     }
        // )

    } catch (error) {
        res.send({
            'status': 300,
            'message': error
        })
    }
}



router.get('/:shortUrl', decode);
router.post('/', encode);

module.exports = router;