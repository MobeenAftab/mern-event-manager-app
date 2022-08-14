import { Schema, model } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
interface IWorkout {
  title: string;
  reps: number;
  load: number;
}

// 2. Create a Schema corresponding to the document interface.
const workoutSchema = new Schema<IWorkout>(
  {
    title: {
      type: String,
      required: true,
    },
    reps: {
      type: Number,
      required: true,
    },
    load: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

// 3. Create a Model.
const WorkoutModel = model<IWorkout>('Workout', workoutSchema);

export { WorkoutModel, workoutSchema, IWorkout };
