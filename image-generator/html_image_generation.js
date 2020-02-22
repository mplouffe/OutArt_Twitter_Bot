const nodeHtmlToImage = require('node-html-to-image');
const compile = require('hyperjs').compile;

const generateHtmlImage = () => {

    var complexTag = {
        tag: 'div',
        properties: {
            class: 'testClass'
        },
        body: [{
            tag: 'div',
            properties: {
                style: 'width:50%;height:50%;background-color:blue;'
            }
        }, {
            tag: 'div',
            properties: {
                style: 'position:absolute;width:50%;height:10%;background-color:red;left:20px;top:18px'
            }
        }]
    };

    // let htmlNode = compile(complexTag);

    let htmlNode = '<style> .test { width:50%;height:50%;background-color:blue; }</style><div class="test"></div>';
    console.log(htmlNode);

    nodeHtmlToImage({
        output: './image.png',
        html: htmlNode
        })
        .then(() => console.log('The image was created successfully!'))
}


module.exports = { generateHtmlImage }