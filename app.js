require('./config/config');
const { generateImage } = require('./image-generator/image_manipulation')

const express = require('express');
const Twitter = require('twitter');
const { generateTextTweet } = require('./image-title-generator/tweet-generator');

const app = express();
const PORT = process.env.PORT;

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

generateImage();

app.get('/', (req, res) => res.send('Bot is running...'));

app.listen(PORT, () => console.log(`OutArt up and running on ${PORT}`));
