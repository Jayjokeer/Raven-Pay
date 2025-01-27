import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/error";
import { catchAsync } from "../errors/error-handler";
import { successResponse } from "../helpers/success-response";
import { hashPassword } from "../utils/encryption";
import { NextFunction, Request, Response } from "express";
import knex from "../db";
import { IUser } from "../interface/user.interface";

export const registerUserController = catchAsync( async (req: Request, res: Response) => {
    const {
      name,
      email,
      password,
    } = req.body;

    const isEmailExists = await knex('users').where({ email }).first();
    if(isEmailExists) throw new BadRequestError("User with email already exists!");

    const encryptPwd = await hashPassword(password);

    const userPayload= {
      name,
      email: email.toLowerCase(),
      password: encryptPwd,
    }
   const [user] = await knex('users').insert(
    userPayload,
        ['id', 'name', 'email']
      );(user);
  const data = user;
   return successResponse(res,StatusCodes.CREATED, data);
});
