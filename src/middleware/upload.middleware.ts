import * as variables from '../base/variable';
import path from 'path';

const multer = require('multer');

const getPathToSave = req => {
    return 'uploads/';
};

const filter = function (req, file, callback) {
    var ext = path.extname(file.originalname.toLowerCase());
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
        callback(new Error('Only support png|jpg|jpeg|gif file type'), false);
    }

    callback(null, true);
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, getPathToSave(req));
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname.toLowerCase());
        cb(
            null,
            `${Date.now()}_image_${Math.floor(Math.random() * 1_000_000)}${ext}`
        );
    },
});
const uploadFile = multer({
    storage: storage,
    fileFilter: filter,
    limits: {
        fileSize: variables.MAX_SIZE,
    },
});

export default uploadFile;
