import Joi from "joi";
import { Request, Response, NextFunction } from 'express';


export const validateRegistration = (req: Request, res: Response, next: NextFunction) => {
    const createUserValidation = Joi.object({
      name: Joi.string().required().messages({
        'string.empty': 'Name cannot be empty',
        'string.base': 'Name must be a string'
      }),
      password: Joi.string().required().messages({
        'string.empty': 'Password cannot be empty',
        'string.base': 'Password must be a string',
      }),
      email: Joi.string().required().messages({
        'string.empty': 'Email cannot be empty',
        'string.base': 'Email must be a string',
      }),
    });
  
    const { error } = createUserValidation.validate(req.body, { abortEarly: false });
    if (error) {
      const errorMessages = error.details.map((detail) => detail.message);
     res.status(400).json({ errors: errorMessages });
     return;
    }
  
    next();
  };


  export const validateLogin = (req: Request, res: Response, next: NextFunction) => {
    const loginUserValidation = Joi.object({
      password: Joi.string().required().messages({
        'string.empty': 'Password cannot be empty',
        'string.base': 'Password must be a string',
      }),
      email: Joi.string().required().messages({
        'string.empty': 'Email cannot be empty',
        'string.base': 'Email must be a string',
      }),
    });
  
    const { error } = loginUserValidation.validate(req.body, { abortEarly: false });
    if (error) {
      const errorMessages = error.details.map((detail) => detail.message);
     res.status(400).json({ errors: errorMessages });
     return;
    }
  
    next();
  };