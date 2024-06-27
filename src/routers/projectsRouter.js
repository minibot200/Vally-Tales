const { Router } = require('express');

const { validateProject } = require('../middlewares');
const { getAllProjects, addProject, editProject, deleteProject } = require('../services');

const router = Router();
// 프로젝트 조회
router.get('/:userId', getAllProjects);
// 프로젝트 추가
router.post('/', validateProject, addProject);
// 프로젝트 수정
router.put('/:projectId', validateProject, editProject);
// 프로젝트 삭제
router.delete('/:projectId', deleteProject);

module.exports = router;