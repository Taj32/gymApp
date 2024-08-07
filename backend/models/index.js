// models/index.js
import sequelize from '../utils/database.js';
import User from './user.js';
import Workout from './workout.js';
import Exercise from './exercise.js';
import Friendship from './friendship.js';

// Define associations
User.hasMany(Workout, { foreignKey: 'user_id' });
Workout.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(Exercise, { foreignKey: 'userId' });
Exercise.belongsTo(User, { foreignKey: 'userId' });

Workout.hasMany(Exercise, { foreignKey: 'workout_id' });
Exercise.belongsTo(Workout, { foreignKey: 'workout_id' });

//friendship
// Friendship.belongsTo(User, { as: 'user', foreignKey: 'user_id' });
// Friendship.belongsTo(User, { as: 'friend', foreignKey: 'friend_id' });

// Export models and sequelize instance
export { User, Workout, Exercise, Friendship, sequelize };