import { TransactionType } from "../enum/transaction.enum";

export interface Transaction {
    id: number;
    account_id: number;
    type: TransactionType;
    amount: number;
    reference: string;
    created_at?: Date;
    updated_at?: Date;
  };
  