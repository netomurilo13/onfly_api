/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { Expense } from './entities/expense.entity';
import { User } from './../user/entities/user.entity';
import { CurrentUser } from './../auth/decorators/currentUser.decorator';

@Controller('expense')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Post()
  create(@Body() createExpenseDto: CreateExpenseDto, @CurrentUser() user: User) {
    createExpenseDto.userId = user.id;
    return this.expenseService.create(createExpenseDto, user.email);
  }

  @Get()
  findAll() {
    return this.expenseService.findAll();
  }

  //TODO Incluir tipagem
  @Get('/myexpenses')
  async findByUser(@CurrentUser() user: User){
  const expenses = await this.expenseService.findByUser(user.id);

  return expenses;
}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.expenseService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExpenseDto: UpdateExpenseDto,@CurrentUser() user: User) {
    return this.expenseService.update(+id, updateExpenseDto,user.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string,@CurrentUser() user: User) {
    return this.expenseService.remove(+id,user.id);
  }
}
