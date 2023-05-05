/* eslint-disable prettier/prettier */
import { Prisma } from '@prisma/client';

export class User implements Prisma.UserUncheckedCreateInput {
  id?: number;
  email: string;
  password: string;
  name: string;
  expenses?: Prisma.ExpenseUncheckedCreateNestedManyWithoutUserInput;
}
