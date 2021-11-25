const express = require('express');
const router = express.Router();
const path = require('path');

const settings = require('../../settings');
const returnGen = require('../utils/resultUtil')
const fileUtil = require('../utils/fileUtil');


router.get('/', (((req, res, next) => {
    const origin = 'Directory endpoint - Get directory listing in project root';
    fileUtil.getDirectoryListings('./')
        .then(results => {
            returnGen.generateResult(res, 200, 'success', origin, 'Directory listing fetched successfully', results);
        })
        .catch(err => {
            returnGen.generateResult(res, 500, 'failure', origin, 'An internal error occurred', err);
        })
})))

router.get('/sub', (((req, res, next) => {
    const origin = 'Directory endpoint - Get directory listing in given path';
    const subdir = path.join(settings.PROJECT_DIR, req.query.path);
    fileUtil.getDirectoryListings(subdir)
        .then(results => {
            returnGen.generateResult(res, 200, 'success', origin, 'Sub directory listing fetched successfully', results);
        })
        .catch(err => {
            returnGen.generateResult(res, 500, 'failure', origin, 'An internal error occurred', err);
        })
})))

module.exports = router;
