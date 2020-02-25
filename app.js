require('./config/config');
const { generateCollage } = require('./image-generator/image_manipulation')
const { generateImage } = require('./image-generator/image_generation')
const { generateHtmlImage } = require('./image-generator/html_image_generation')
const { generateImageTweet } = require('./image-title-generator/tweet-generator')

const express = require('express');
const Twitter = require('twitter');


const app = express();
const PORT = process.env.PORT || 3000;

const client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

// setInterval(() => {
//     generateTextTweet()
//         .then((status) => {
//             console.log(status);
//             return client.post('statuses/update', { status: status });
//         })
//         .then((tweet) => {
//             console.log('Successful tweet!')
//         })
//         .catch((err) => {
//             console.log('ERR!: ', err);
//         });
// }, 28800000);

generateHtmlImage();
generateImageTweet()
    .then((status) => {
        console.log(status);
        // return client.post('statuses/update', { status: status });
    })
    .then((tweet) => {
        console.log('Successful tweet!');
    })
    .catch((err) => {
        console.log('ERR!: ', err);
    });

app.get('/', (req, res) => res.send('Bot is running...'));

app.listen(PORT, () => console.log(`OutArt up and running on ${PORT}`));
