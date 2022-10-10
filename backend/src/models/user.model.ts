import { model, Model, Schema, Types } from 'mongoose';

export interface IUser {
  _id: Types.ObjectId;
  email: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  password: string;
  mobileNumber?: number;
  homePhone?: number;
  emergencyContactName?: string;
  emergencyContactNumber?: number;
  canDrive?: boolean;
  events?: Types.ObjectId[] | Array<Record<string, Types.ObjectId>>;
  isAdmin: boolean;
  roles?: number[];
  createdAt: Date;
}

// Put all user instance methods in this interface:
interface IUserMethods {
  fullName(): string;
}

// Create a new Model type that knows about IUserMethods...
type UserModel = Model<IUser, {}, IUserMethods>;

const UserSchema = new Schema<IUser, UserModel, IUserMethods>(
  {
    email: { type: String, required: true, trim: true },
    firstName: { type: String, required: true, trim: true },
    middleName: { type: String, required: false, trim: true },
    lastName: { type: String, required: true, trim: true },
    password: { type: String, required: true, trim: true },
    mobileNumber: { type: Number, required: false, trim: true },
    homePhone: { type: Number, required: false, trim: true },
    emergencyContactName: { type: String, required: false, trim: true },
    emergencyContactNumber: { type: Number, required: false, trim: true },
    canDrive: { type: Boolean, required: true, default: false },
    // TODO: Update the event field to reference the sub document event model
    events: { type: [Schema.Types.ObjectId], default: [], required: true },
    isAdmin: { type: Boolean, default: false, required: true },
    // createdAt: { type: Date, default: Date.now, required: true },
  },
  { timestamps: true }
);

UserSchema.method('fullName', function fullName() {
  return this.firstName + ' ' + this.lastName;
});

export const User = model<IUser>('User', UserSchema);
export type Users = Array<IUser>;
