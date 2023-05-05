/* eslint-disable prettier/prettier */
import { Prisma } from '@prisma/client';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Expense } from '../entities/expense.entity';

export class CreateExpenseDto extends Expense{
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  date: Date;

  @IsOptional()
  @IsString()
  description?: string;

  userId: number;

  user: Prisma.UserCreateNestedOneWithoutExpensesInput;
}
