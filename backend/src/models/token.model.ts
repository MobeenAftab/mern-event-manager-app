import { model, Schema, Types } from 'mongoose';
import { IUser } from './user.model';

/**
 * Interface for return value of authenticating a user.
 */
export interface IAuthenticatedUser {
  user: IUser;
  accessToken: string;
  refreshToken: string;
}

/**
 * Interface to represent the values of a decoded token for authorisation middleware
 */
export interface IDecodedToken {
  user?: IUser;
  accessToken?: string;
  refreshToken?: string;
  id: string;
}

/**
 * Interface for a token represented in mongodb.
 * Verify token to retrieve IDecodedToken values.
 */
export interface IToken {
  id?: Types.ObjectId;
  token: string;
}

const TokenSchema = new Schema<IToken>(
  {
    token: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

export const Token = model<IToken>('Token', TokenSchema);
export type Tokens = Array<IToken>;
