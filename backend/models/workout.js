import { DataTypes } from 'sequelize';
import sequelize from '../utils/database.js';
import User from './user.js';
import Exercise from './exercise.js';

const Workout = sequelize.define('Workout', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date_created: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        },
        field: 'user_id'
    }
}, {
    timestamps: false
});

Workout.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(Workout, { foreignKey: 'user_id' });

// Many-to-Many relationship between Workout and Exercise
Workout.belongsToMany(Exercise, { through: 'WorkoutExercises' });
Exercise.belongsToMany(Workout, { through: 'WorkoutExercises' });

export default Workout;