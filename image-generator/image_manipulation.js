const Jimp = require('jimp');
const GoogleImages = require('google-images');

require('../config/config');

const generateImage = () => {
    let cseId = process.env.CLIENT_ID;
    let apiKey = process.env.CSE_API_KEY;
    
    const client = new GoogleImages(cseId, apiKey);
    
    client.search('Steve Angello')
        .then(images => {
            console.log(images);
        })
        .catch(err => {
            console.log(err);
        });
}

// Jimp.read('./DWLandTiles_nogap.png')
//     .then(tiles => {
//         const newImage = tiles.clone();
//         newImage.resize(256,240);

//         for(let i = 0; i < 15; i++) {
//             for(let j = 0; j < 16; j++) {
//                 let sprite = tiles.clone();
//                 sprite.crop(0,0,16,16);
//                 newImage.composite(sprite, (j * 16), (i * 16));
//             }
//         }

//         return newImage.write('test-output.jpg');
//     });

module.exports = { generateImage };