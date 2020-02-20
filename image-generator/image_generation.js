const nodeHtmlToImage = require('node-html-to-image')

const generateImage = () => {
    nodeHtmlToImage({
    output: './image.png',
    html: '<html><body>Hello world!</body></html>'
    })
    .then(() => console.log('The image was created successfully!'))
}

module.exports = { generateImage }