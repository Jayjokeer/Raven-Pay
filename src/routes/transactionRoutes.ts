import { Router, Request, Response } from "express";
import { userAuth } from "../middleware/authorization";
import * as transactionController from "../controller/transaction.controller";
const router = Router();

router.route("/transfer").post(userAuth,transactionController.transferMoneyController);

export { router as TransactionRoute };
