/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { Expense } from './entities/expense.entity';
import { CurrentUser } from 'src/auth/decorators/currentUser.decorator';
import { User } from './../user/entities/user.entity';

@Controller('expense')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Post()
  create(@Body() createExpenseDto: CreateExpenseDto, @CurrentUser() user: User) {
    createExpenseDto.userId = user.id;
    return this.expenseService.create(createExpenseDto);
  }

  @Get()
  findAll() {
    return this.expenseService.findAll();
  }
  //TODO Incluir tipagem
  @Get('/myexpenses/:userId')
  async findByUser(@Param('userId') userId: number){
  const expenses = await this.expenseService.findByUser(userId);

  return expenses;
}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.expenseService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExpenseDto: UpdateExpenseDto) {
    return this.expenseService.update(+id, updateExpenseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.expenseService.remove(+id);
  }
}
