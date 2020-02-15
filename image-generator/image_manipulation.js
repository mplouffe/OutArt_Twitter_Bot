const Jimp = require('jimp');
const GoogleImages = require('google-images');

require('../config/config');

const generateImage = () => {
    let cseId = process.env.CLIENT_ID;
    let apiKey = process.env.CSE_API_KEY;

    const client = new GoogleImages(cseId, apiKey);
    var tp;

    Jimp.read('./images/tetrisPiece_01.png')
        .then( tetrisPiece => {
            tp = tetrisPiece;
            client.search('boots', {
                page: 3,
                size: "medium",
                type: "photo",
                dominantColor: "brown",
                colorType: "color"
            })
            .then(images => Jimp.read(images[1].url))
            .then(image => {
                image.crop(0,0,235, 65);
                image.mask(tp, 0, 0);
                image.write("./images/copositeOut.jpg");
            })
            .catch(err => {
                console.log(err);
            });
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