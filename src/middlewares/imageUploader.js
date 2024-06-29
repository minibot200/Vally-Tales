const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const { s3AccessKey, s3SecretKey } = require('../config');

// aws s3에 이미지 파일을 업로드 하는 기능
// 업로드 후 저장된 url을 User의 imageUrl에 저장
// 현재 사용하지 않습니다.
AWS.config.update({
    region: 'ap-northeast-2',
    accessKeyId: s3AccessKey,
    secretAccessKey: s3SecretKey,
});
const s3 = new AWS.S3();

const imageUploader = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'webbukettest',
        acl: 'public-read',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: (req, file, callback) => {
            callback(null, `${Date.now()}_${file.originalname}`);
        }
    })
});

module.exports = imageUploader;