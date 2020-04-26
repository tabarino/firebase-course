import * as functions from 'firebase-functions';
import {db} from "./init";

const path = require('path');
const os = require('os');
const mkdirp = require('mkdirp-promise')
const spawn = require('child-process-promise').spawn;
const rimraf = require('rimraf');
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

        if (!contentType.startsWith('image/') || fileName.startsWith('thumb_')) {
            console.log('Exiting image processing.');
            return null;
        }

        // Download the original file uploaded by the user
        await mkdirp(tempLocalDir);

        const bucket = gcs.bucket(object.bucket);
        const originalImageFile = bucket.file(fileFullPath);
        const tempLocalFile = path.join(os.tmpdir(), fileFullPath);

        console.log('Downloading image to: ', tempLocalFile);

        await originalImageFile.download({ destination: tempLocalFile });

        // Generate a thumbnail using ImageMagick
        const outputFilePath = path.join(fileDir, 'thumb_' + fileName);
        const outputFile = path.join(os.tmpdir(), outputFilePath);

        console.log('Generating a thumbnail to: ', outputFile);

        await spawn('convert', [tempLocalFile, '-thumbnail', '510x287 >', outputFile], {
            capture: ['stdout', 'stderr']
        });

        // Upload the Thumbnail to storage
        const metadata = {
            contentType: object.contentType,
            cacheControl: 'public, max-age=2592000, s-maxage=2592000'
        }

        console.log('Uploading the thumbnail to storage: ', outputFile, outputFilePath);

        const uploadedFiles = await bucket.upload(outputFile, { destination: outputFilePath, metadata });

        // Delete Local Files to avoid filling up the filesystem overtime
        rimraf.sync(tempLocalDir);

        await originalImageFile.delete();

        // Create link to uploaded file
        const thumbnail = uploadedFiles[0];
        const url = await thumbnail.getSignedUrl({ action: 'read', expires: new Date(2099, 12, 31) });

        console.log('Generate signed url: ', url);

        // Save Thumbnail link in database
        const frags = fileFullPath.split('/');
        const courseId = frags[1];

        console.log('Saving url to database: ', courseId);

        return db.doc(`courses/${courseId}`).update({ uploadedImageUrl: url });
    }
);
