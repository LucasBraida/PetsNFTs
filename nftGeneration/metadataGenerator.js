const fs = require('fs');
const imageDir = fs.readdirSync("./images/generatedImages");
const namesArray = []
imageDir.forEach(img => {
    const metadata = {
        name: `${img.split('-')[0]} ${img.split('-')[1].split('.')[0]} edition`,
        description: "A cute lazy pet with a funny phrase",
        image: `ipfs://QmatttDpcg8wMGLwwzLKHUaTzPzgMGzdGcPu4f81Ao8JgY/${img.split(".")[0]}.jpg`,
        attributes: []
    }
    fs.writeFileSync(`./metadata/${img.split(".")[0]}`, JSON.stringify(metadata))
    namesArray.push(`${img.split(".")[0]}`)
});

console.log(namesArray)
fs.writeFileSync('./namesArray.txt', JSON.stringify(namesArray))
