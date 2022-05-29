
const express = require('express');
const router = express.Router({ mergeParams: true });
import * as fileController from '../../controllers/file.controller'
import uploadFile from '../../middleware/upload.middleware';

router.route('/image')
    .post(uploadFile.single("file"), fileController.uploadImage);

module.exports = router;
