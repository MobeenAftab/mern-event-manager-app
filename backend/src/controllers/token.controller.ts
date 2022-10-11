import { sign, verify } from 'jsonwebtoken';
import { Types } from 'mongoose';
import { Token } from '../models/token.model';

const options = {
  new: true,
  upsert: true,
};

/**
 *
 * @param userId Valid MongoDB ID
 * @param email User email
 * @param tokenSecret Access or refresh token secret to sign with
 * @param expiresIn Life of token
 * @returns Signed access or refresh JWT
 */
export const generateToken = async (
  userId: Types.ObjectId,
  email: string,
  tokenSecret: string,
  expiresIn: string
) => {
  try {
    return await sign(
      {
        userId,
        email,
      },
      tokenSecret,
      {
        expiresIn: expiresIn,
      }
    );
  } catch (error) {
    return error;
  }
};

export const saveToken = async (token: string) => {
  try {
    const query = {
      token: token,
    };

    return await Token.findOneAndUpdate(query, query, options).exec();
  } catch (error) {
    return error;
  }
};

export const deleteRefreshToken = async (token: string) => {
  try {
    const query = {
      token: token,
    };
    return await Token.findOneAndDelete(query).exec();
  } catch (error) {
    return error;
  }
};

export const verifyToken = async (token: string, secret: string) => {
  try {
    return await verify(token, secret);
  } catch (error) {
    return error;
  }
};

export const checkIfRefreshTokenExists = async (
  token: string
): Promise<boolean> => {
  try {
    const query = {
      token: token,
    };
    return await Token.findOne(query).then((doc) => (doc ? true : false));
  } catch (error) {
    return error;
  }
};
