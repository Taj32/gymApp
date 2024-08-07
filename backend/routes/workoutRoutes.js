import express from 'express';
import { getUserWorkouts, addWorkout, removeWorkout, completeWorkout } from '../controllers/workout.js';
import { isAuth } from '../controllers/auth.js';

const router = express.Router();

router.get('/user-workouts', isAuth, getUserWorkouts);
router.post('/add', isAuth, addWorkout);
router.delete('/remove/:workoutId', isAuth, removeWorkout);
router.post('/complete/:workoutId', isAuth, completeWorkout);

export default router;