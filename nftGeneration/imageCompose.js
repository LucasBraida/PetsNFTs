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


function combineImages(base, text){
    base.jimpObj.clone().resize(1500,2000).composite(text.jimpObj, 270, 80).write(`./images/generatedImages/${base.name}-${text.name}.jpg`)

}
async function imageCompose(){
    const baseImages = await getImages('./images/baseImages/')
    const textImages = await getImages('./images/textImages/')

    baseImages.forEach(baseImage => {
        textImages.forEach(textImage => {
            combineImages(baseImage,textImage)
        })
    })
}


imageCompose()

