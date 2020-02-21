const nodeHtmlToImage = require('node-html-to-image');

const generateImage = () => {
    let htmlNode = {
        body: "Hello World!!!"
    };
    // let document = Element.document;
    // let htmlNode = document.createElement('html');
    // let body = document.createElement('body');
    // body.textContent = "Hello world!";

    // htmlNode.appendChild(body);

    console.log(htmlNode);

    nodeHtmlToImage({
    output: './image.png',
    html: htmlNode
    })
    .then(() => console.log('The image was created successfully!'))
}

module.exports = { generateImage }