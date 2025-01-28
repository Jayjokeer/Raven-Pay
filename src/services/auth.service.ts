import knex from "../db";

export const checkEmailExists = async (email: string) => {
return await knex('users').where({ email }).first();
};

export const createUser = async (userPayload: any) => {
const [user] = await knex('users').insert(
    userPayload,
        ['id', 'name', 'email']
      );(user);

      return user;
};