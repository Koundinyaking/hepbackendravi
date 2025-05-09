const express = require('express');
const router = express.Router();
const { protectAll3, checkPremiumAccess } = require('../middleware/authMiddleware');
const multer = require('multer');

const {
  getExerciseById,
  filterExercises,
  getExercisesByCreator,
  createExercise,
  editExercise,
  deleteExercise,
  getAllExercises
} = require('../controllers/exerciseController');

// Setup multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Middleware for handling file uploads
const uploadFiles = upload.fields([
  { name: 'images', maxCount: 5 },
  { name: 'video', maxCount: 1 }
]);

// Public routes with membership check
router.get('/filters', checkPremiumAccess, filterExercises);
router.get('/creator/:id', protectAll3, getExercisesByCreator);

router.route('/')
  .get(checkPremiumAccess, getAllExercises)
  .post([protectAll3, uploadFiles], createExercise);

router.route('/:id')
  .get(checkPremiumAccess, getExerciseById)
  .put([protectAll3, uploadFiles], editExercise)
  .delete(protectAll3, deleteExercise);

module.exports = router;
