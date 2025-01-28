import { Request, Response } from 'express';
import knex from '../db';
import axios from 'axios';
import { JwtPayload } from 'jsonwebtoken';
import * as accountService from '../services/account.services';
import { BadRequestError, NotFoundError } from '../errors/error';
import * as transactionService from '../services/transaction.services';
import { TransactionType } from '../enum/transaction.enum';
import { StatusCodes } from 'http-status-codes';
import { successResponse } from '../helpers/success-response';
const RAVEN_API_KEY = process.env.RAVEN_API_KEY;

export const transferMoneyController = async (req: JwtPayload, res: Response): Promise<void> => {
  const { user } = req as any;
  const { recipientAccount, amount, description } = req.body;

  try {
    const account = await accountService.isExsitingAccount(user.id);

    if (!account) {
        throw new NotFoundError('Account not found');
    }

    if (account.balance < amount) {
        throw new BadRequestError('Insufficient balance');
    }

    const response = await axios.post(
      'https://api.getravenbank.com/transfers',
      {
        fromAccount: account.account_number,
        toAccount: recipientAccount,
        amount,
        description,
      },
      {
        headers: { Authorization: `Bearer ${RAVEN_API_KEY}` },
      }
    );
    await accountService.decreaseBalance(account.id, amount);
    await transactionService.createTransaction({account_id: account.id, amount, description, type:TransactionType.TRANSFER});    

    successResponse(res,StatusCodes.CREATED, "Transfer Successful");
} catch (error) {
    console.error('Error processing transfer:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
