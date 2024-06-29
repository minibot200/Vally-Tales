const { Router } = require('express');

const { validateEducation } = require('../middlewares');
const { getAllEducations, addEducation, editEducation, deleteEducation } = require('../services');

const router = Router();
// 학력 조회
router.get('/:userId', getAllEducations);
// 학력 추가
router.post('/', validateEducation, addEducation);
// 학력 수정
router.put('/:educationId', validateEducation, editEducation);
// 학력 삭제
router.delete('/:educationId', deleteEducation);

module.exports = router;