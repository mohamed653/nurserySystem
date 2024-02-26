const { validationResult } = require("express-validator");
const path  = require("path");
const fs = require("fs");


module.exports = (req, res, next) => {
    const result = validationResult(req);
    console.log(result);
    if (!result.isEmpty()) {
        // delete the image if the data not valid
        if(req.file)
            deleteFile(req.file.path);

        const errors = result.array().map(error => error.msg);
        return res.status(422).json({ errors: errors });
    }
    next();
};

async function deleteFile(filePath) {
    try {
        await fs.unlink(filePath);
        console.log('File deleted successfully');
    } catch (err) {
        console.error('Error deleting file:', err);
    }
}

