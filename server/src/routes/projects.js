const express = require('express');
const {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject
} = require('../controllers/ProjectController');

const router = express.Router();

const { protect } = require('../middleware/auth');
const { cacheMiddleware, clearCache } = require('../middleware/cache');

router
  .route('/')
  .get(cacheMiddleware(300), getProjects)
  .post(protect, (req, res, next) => {
    clearCache();
    next();
  }, createProject);

router
  .route('/:id')
  .get(cacheMiddleware(600), getProject)
  .put(protect, (req, res, next) => {
    clearCache();
    next();
  }, updateProject)
  .delete(protect, (req, res, next) => {
    clearCache();
    next();
  }, deleteProject);

module.exports = router;
