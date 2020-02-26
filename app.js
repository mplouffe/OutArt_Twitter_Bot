require('./config/config');
const { generateCollage } = require('./image-generator/image_manipulation')
const { generateImage } = require('./image-generator/image_generation')
const { generateHtmlImage } = require('./image-generator/html_image_generation')
const { generateImageTweet } = require('./image-title-generator/tweet-generator')

const fs = require('fs')
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
// generateImageTweet()
//     .then((status) => {
//         console.log(status);
//         // return client.post('statuses/update', { status: status });
//     })
//     .then((tweet) => {
//         console.log('Successful tweet!');
//     })
//     .catch((err) => {
//         console.log('ERR!: ', err);
//     });
const imageData = fs.readFileSync("./image.png");

client.post("media/upload", {media: imageData}, function(error, media, response) {
    if (error) {
      console.log(error)
    } else {
      const status = {
        status: "I tweeted from Node.js!",
        media_ids: media.media_id_string
      }
   
      client.post("statuses/update", status, function(error, tweet, response) {
        if (error) {
          console.log(error)
        } else {
          console.log("Successfully tweeted an image!")
        }
      })
    }
  });

app.get('/', (req, res) => res.send('Bot is running...'));

app.listen(PORT, () => console.log(`OutArt up and running on ${PORT}`));
