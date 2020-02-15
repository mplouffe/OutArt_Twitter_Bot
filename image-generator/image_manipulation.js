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
            return client.search('puppy', {
                page: 1,
                size: "medium",
                type: "photo",
                // dominantColor: "brown",
                colorType: "color"
            });
        })
        .then(images => {
            if (images.length > 0) {
                let index = Math.floor(Math.random() * images.length);
                console.log(index);
                return Jimp.read(images[index].url);
            }
        })
        .then(image => {
            if (image) {
                let x = Math.floor(Math.random() * (image.getWidth() - tp.getWidth()));
                let y = Math.floor(Math.random() * (image.getHeight() - tp.getHeight()));;
                image.crop(x,y, tp.getWidth(), tp.getHeight());
                image.mask(tp, 0, 0);
                image.write("./images/copositeOut.jpg");
            } else {
                console.log("No image results returned");
            }
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