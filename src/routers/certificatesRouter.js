const { Router } = require('express');

const { validateCertificate } = require('../middlewares');
const { getAllCertificates, addCertificate, editCertificate, deleteCertificate } = require('../services');

const router = Router();
// 자격증 조회
router.get('/:userId', getAllCertificates);
// 자격증 추가
router.post('/', validateCertificate, addCertificate);
// 자격증 수정
router.put('/:certificateId', validateCertificate, editCertificate);
// 자격증 삭제
router.delete('/:certificateId', deleteCertificate);

module.exports = router;