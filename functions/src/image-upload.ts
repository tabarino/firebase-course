import * as functions from 'firebase-functions';

const path = require('path');
const os = require('os');
const mkdirp = require('mkdirp-promise')
const { Storage } = require('@google-cloud/storage');

const gcs = new Storage();

export const resizeThumbnail = functions.storage.object().onFinalize(
    async (object, context) => {
        const fileFullPath = object.name || '';
        const contentType = object.contentType || '';
        const fileDir = path.dirname(fileFullPath);
        const fileName = path.basename(fileFullPath);
        const tempLocalDir = path.join(os.tmpdir(), fileDir);

        console.log('Thumbnail generation started: ', fileFullPath, fileDir, fileName);

        if (contentType.startsWith('image/')) {
            console.log('Exiting image processing.');
            return null;
        }

        await mkdirp(tempLocalDir);

        const bucket = gcs.bucket(object.bucket);
        const originalImageFile = bucket.file(fileFullPath);
        const tempLocalFile = path.join(os.tmpdir(), fileFullPath);

        console.log('Downloading image to: ', tempLocalFile);

        await originalImageFile.download({ destination: tempLocalFile });

        return null;
    }
);
