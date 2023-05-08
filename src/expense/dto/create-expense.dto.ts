/* eslint-disable prettier/prettier */
import { Prisma } from '@prisma/client';
import { IsNotEmpty, IsNumber, IsOptional, IsString,Validate,MaxLength,Min } from 'class-validator';
import { Expense } from '../entities/expense.entity';
import { DataPassada } from './../../validators/expense.validator';

export class CreateExpenseDto extends Expense{
  @IsNotEmpty()
  @IsNumber()
  @Min(0, { message: 'The value cannot be negative' })
  amount: number;
  
  @IsNotEmpty({ message: 'Date cannot be empty' })
  @Validate(DataPassada)
  date: Date;

  @IsOptional()
  @IsString()
  @MaxLength(191, { message: 'Description must have less than or equal to $constraint1 characters' })
  description?: string;

  userId: number;

  user: Prisma.UserCreateNestedOneWithoutExpensesInput;
}
