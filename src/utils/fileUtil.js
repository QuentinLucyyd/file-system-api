const fsUtils = require("nodejs-fs-utils");
const fs = require('fs');
const path = require('path');

exports.getDirectoryListings = (directory) => {
    return new Promise((resolve, reject) => {
        fs.access(directory, fs.F_OK, (err => {
            if (err)
                reject(err);
            else {
                fs.readdir(directory, async function (err, filenames) {
                    if (err)
                        reject(err)
                    else {
                        let listings = [];
                        for (let file of filenames) {
                            try {
                                const joinedpath = path.join(directory, file);
                                const stats = await fs.statSync(joinedpath);
                                listings.push({
                                    name: file,
                                    size: getFileSize(joinedpath),
                                    directory: stats.isDirectory(),
                                    created: stats["birthtime"],
                                    extension: (!stats.isDirectory()) ? file.split('.').slice(1).join('.') : '',
                                    permissions: generateFilePermissions(stats)
                                });
                            } catch (err) {
                                reject(err);
                            }
                        }
                        resolve(listings);
                    }
                })
            }
        }))
    })

}

generateFilePermissions = (stats) => {
    let permString = '';
    //others permissions
    permString = permString.concat((stats["mode"] & 1 ? 'x' : '-'));
    permString = permString.concat((stats["mode"] & 2 ? 'w' : '-'));
    permString = permString.concat((stats["mode"] & 4 ? 'r' : '-'));

    //group permissions
    permString = permString.concat((stats["mode"] & 10 ? 'x' : '-'));
    permString = permString.concat((stats["mode"] & 20 ? 'w' : '-'));
    permString = permString.concat((stats["mode"] & 40 ? 'r' : '-'));

    //owner permissions
    permString = permString.concat((stats["mode"] & 100 ? 'x' : '-'));
    permString = permString.concat((stats["mode"] & 200 ? 'w' : '-'));
    permString = permString.concat((stats["mode"] & 400 ? 'r' : '-'));
    return permString;
}

getFileSize = (file) => {
    let size = fsUtils.fsizeSync(file);
    return (convertBytes(size));
}

const convertBytes = function (bytes) {
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"]

    if (bytes == 0) {
        return "n/a"
    }

    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))

    if (i == 0) {
        return bytes + " " + sizes[i]
    }

    return (bytes / Math.pow(1024, i)).toFixed(1) + " " + sizes[i]
}
