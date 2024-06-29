const { Router } = require('express');

const { validateAward } = require('../middlewares');
const { getAllAwards, addAward, editAward, deleteAward } = require('../services');

const router = Router();
// 수상 이력 조회
router.get('/:userId', getAllAwards);
// 수상 이력 추가
router.post('/', validateAward, addAward);
// 수상 이력 수정
router.put('/:awardId', validateAward, editAward);
// 수상 이력 삭제
router.delete('/:awardId', deleteAward);

module.exports = router;