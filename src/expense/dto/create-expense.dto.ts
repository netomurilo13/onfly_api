/* eslint-disable prettier/prettier */
import { Prisma } from '@prisma/client';
import { IsNotEmpty, IsNumber, IsOptional, IsString,Validate,MaxLength,Min } from 'class-validator';
import { Expense } from '../entities/expense.entity';
import { DataPassada } from './../../validators/expense.validator';

export class CreateExpenseDto extends Expense{
  @IsNotEmpty()
  @IsNumber()
  @Min(0, { message: 'O valor não pode ser negativo' })
  amount: number;
  
  @IsNotEmpty({ message: 'A data não pode estar vazia' })
  @Validate(DataPassada)
  date: Date;

  @IsOptional()
  @IsString()
  @MaxLength(191, { message: 'Description must have less than or equal to $constraint1 characters' })
  description?: string;

  userId: number;

  user: Prisma.UserCreateNestedOneWithoutExpensesInput;
}
