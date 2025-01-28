import knex from "../db";

export const createAccount = async (userId:string,  accountNumber:string) => {
    const [account] =  await knex('accounts').insert(
    { user_id: userId, account_number: accountNumber },
    ['id', 'account_number', 'balance']
  );
  return account;
};

export const isExsitingAccount = async (userId:string) => {
  return await knex('accounts').where({ user_id: userId }).first();
}