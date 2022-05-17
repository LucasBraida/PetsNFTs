const Jimp = require('jimp');
const fs = require('fs');

async function getImages(dir){
    const filesName = fs.readdirSync(dir)
    const filesPath = filesName.map(file => {
        return dir + file
    })

    let images = []
    for(const i in filesPath){
        let newImage = await Jimp.read(filesPath[i])
        images.push({
            name: filesName[i].split('.')[0],
            jimpObj: newImage
        })
    }
    return images
}

function setTrasnparentBG(obj){
    return obj.background(0xFFFFFFFF)
}

function combineImages(base, text){
    base.jimpObj.clone().resize(1500,2000).composite(text.jimpObj, 270, 80).write(`./images/generatedImages/${base.name}-${text.name}.jpg`)

}
async function imageCompose(){
    const baseImages = await getImages('./images/baseImages/')
    const textImages = await getImages('./images/textImages/')
    // for(const i in baseImages){

    //     for(const j in textImages){
    //         let newObj = baseImages[i]
    //         await textImages[j].jimpObj.background(0xFFFFFFFF)
    //         await newObj.jimpObj.clone().resize(720,1080).quality(60).composite(textImages[j].jimpObj, 200, 120).write(`./images/generatedImages/${baseImages[i].name}${textImages[j].name}.png`)
    //     }
    // }
    baseImages.forEach(baseImage => {
        textImages.forEach(textImage => {
            combineImages(baseImage,textImage)
        })
    })
}

async function readFiles(){
    const files = fs.readdirSync('./images/baseImages')
    console.log(files)
}
async function TEst(){
    const base = await Jimp.read("./images/baseImages/EmmaPNG.png")
    const nick = await Jimp.read('./images/textImages/vidaIrada2.png')
    await nick.background(0xFFFFFFFF)
    base.composite(nick,0,0).write('teste2.jpg')
}
// Jimp.read("./images/baseImages/Emma.jpg", function (err, image) {
//     if (err) {
//       console.log(err)
//     } else {
//       image.write("./images/baseImages/EmmaPNG.png")
//     }
//   })
//test()
//getImages('./images/baseImages/').then(data => {console.log(data)})
imageCompose()
//TEst()
