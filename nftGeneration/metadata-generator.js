const fs = require('fs');
const imageDir = fs.readdirSync("./images");
imageDir.forEach(img => {
    const metadata = {
        name: `Pinnie ${img.split(".")[0]}`,
        description: "A Pinnie in the Limited Pinata Family Collection",
        image: `ipfs://QmRafV2oB9UzSBjWBqcEcnpZhDjAcX1uLAAMBACQBSsMw8/${img.split(".")[0]}.jpg`,
        attributes: []
    }
    fs.writeFileSync(`./metadata/${img.split(".")[0]}`, JSON.stringify(metadata))
});
