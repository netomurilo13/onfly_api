/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { PrismaService } from './../prisma/prisma.service';
import { Expense } from '@prisma/client';
import { sendEmailToUser } from './services/sendEmail.service';

@Injectable()
export class ExpenseService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createExpenseDto: CreateExpenseDto, email: string): Promise<Expense> {
    const expense = await this.prisma.expense.create({
      data: {
        amount: createExpenseDto.amount,
        date: createExpenseDto.date,
        description: createExpenseDto.description,
        user: {
          connect: { id: createExpenseDto.userId },
        },
      },
    });
    sendEmailToUser(email, createExpenseDto)
    return expense;
  }

  async findByUser(userId: number): Promise<Expense[]> {
    const expenses = await this.prisma.expense.findMany({
      where: { userId },
      include: { user: true },
    });

    return expenses;
  }

  async update(
    id: number,
    updateExpenseDto: UpdateExpenseDto,
    userId: number,
  ): Promise<Expense> {
    const vectorExpenses = await this.findByUser(userId);
    let isValid = false;
    for (const element of vectorExpenses) {
      if (element.id == id) {
        isValid = true;
      }
    }
    if (isValid) {
      const expense = await this.prisma.expense.update({
        where: { id },
        data: {
          amount: updateExpenseDto.amount,
          date: updateExpenseDto.date,
          description: updateExpenseDto.description,
        },
      });
      return expense;
    }else {
      throw new Error('There is no such expense');
    }
  }

  async remove(id: number, userId: number): Promise<Expense> {
    const vectorExpenses = await this.findByUser(userId);
    let isValid = false;
    for (const element of vectorExpenses) {
      if (element.id == id) {
        isValid = true;
      }
    }
    if (isValid) {
      const expense = await this.prisma.expense.delete({ where: { id } });
      return expense;
    } else {
      throw new Error('There is no such expense');
    }
  }
}
