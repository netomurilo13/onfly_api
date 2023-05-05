/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { PrismaService } from './../prisma/prisma.service';
import { Expense } from '@prisma/client';

@Injectable()
export class ExpenseService {
  constructor(private readonly prisma: PrismaService) {}
  
  async create(createExpenseDto: CreateExpenseDto): Promise<Expense> {
    const expense = await this.prisma.expense.create({
      data: {
        amount: createExpenseDto.amount,
        date: createExpenseDto.date,
        description: createExpenseDto.description,
        user: {
          connect: { id: createExpenseDto.userId }
        }

      }
    });

    return expense;

  }

  findAll() {
    return this.prisma.expense.findMany();
  }

  async findByUser(userId: number): Promise<Expense[]> {
    const expenses = await this.prisma.expense.findMany({
      where: { userId },
      include: { user: true },
    });
  
    return expenses;
  }

  async findOne(id: number) : Promise<Expense> {
    const expense = await this.prisma.expense.findUnique({ where: { id } });
    return expense;
  }

  async update(id: number, updateExpenseDto: UpdateExpenseDto): Promise<Expense> {
    
    const expense = await this.prisma.expense.update({
      where: { id },
      data: {
        amount: updateExpenseDto.amount,
        date: updateExpenseDto.date,
        description: updateExpenseDto.description
      }
    });

    return expense
  }

  async  remove(id: number): Promise<Expense> {
    const expense = await this.prisma.expense.delete({ where: { id } });
    return expense;
  }
}
