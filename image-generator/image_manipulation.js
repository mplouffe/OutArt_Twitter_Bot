const Jimp = require('jimp');
const GoogleImages = require('google-images');

require('../config/config');

var tetrisTiles = [
    {
        name: "I",
        totalSize: {
            width: 4,
            height: 1
        },
        totalPieces: 1,
        pieces: [
            {
                width: 4,
                height: 1
            }
        ]
    },
    {
        name: "O",
        totalSize: {
            width: 2,
            height: 2
        },
        totalPieces: 1,
        pieces: [
            {
                width: 2,
                height: 2
            }
        ]
    },
    {
        name: "T",
        totalSize: {
            width: 3,
            height: 2
        },
        totalPieces: 2,
        pieces: [
            {
                width: 3,
                height: 1,
            },
            {
                width: 1,
                height: 2,
                offset: {
                    x: 1,
                    y: -1
                }
            }
        ]
    },
    {
        name: "S",
        totalSize: {
            width: 3,
            height: 2
        },
        totalPieces: 2,
        pieces: [
            {
                width: 2,
                height: 1
            },
            {
                width: 2,
                height: 1,
                offset: {
                    x: 1,
                    y: 1
                }
            }
        ]
    },
    {
        name: "Z",
        totalSize: {
            width: 3,
            height: 2
        },
        totalPieces: 2,
        pieces: [
            {
                width: 2,
                height: 1
            },
            {
                width: 2,
                height: 1,
                offset: {
                    x: -1,
                    y: 1
                }
            }
        ]
    },
    {
        name: "J",
        totalSize: {
            width: 2,
            height: 3
        },
        totalPieces: 2,
        pieces: [
            {
                width: 1,
                height: 1
            },
            {
                width: 1,
                height: 3,
                offset: {
                    x: 1,
                    y: -2
                }
            }
        ]
    },
    {
        name: "L",
        totalSize: {
            width: 2,
            height: 3
        },
        totalPieces: 2,
        pieces: [
            {
                width: 1,
                height: 3
            },
            {
                width: 1,
                height: 1,
                offset: {
                    x: 1,
                    y: 2
                }
            }
        ]
    }

]

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