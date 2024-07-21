const multer = require('multer');
const fs = require('fs');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

// Ensure the 'images' directory exists
if (!fs.existsSync('images')) {
    fs.mkdirSync('images');
}

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        console.log(`Saving file to 'images' directory`);
        callback(null, 'images');
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split('.')[0];
        const extension = MIME_TYPES[file.mimetype];
        const filename = name + Date.now() + '.' + extension;
        console.log(`Generated filename: ${filename}`);
        callback(null, filename);
    }
});

module.exports = multer({ storage: storage }).single('image');
