/* eslint-disable prettier/prettier */
import { Prisma } from '@prisma/client';

export class Expense implements Prisma.ExpenseUncheckedCreateInput{
  id?: number;
  amount: number;
  date: Date;
  description?: string;
  user: Prisma.UserCreateNestedOneWithoutExpensesInput;
  userId: number;
}
