/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { ExpenseService } from './../../src/expense/expense.service';
import { ExpenseController } from './../../src/expense/expense.controller';

const fakeExpenses = [
  {
    id: 13,
    amount: 1200,
    date: new Date(),
    description: 'Despesa do Balão',
    userId: 5,
    user: { connect: { id: 5 } },
  },
  {
    id: 14,
    amount: 500,
    date: new Date(),
    description: 'Despesa do Avião',
    userId: 5,
    user: {
      id: 5,
      email: 'netomurilo100@gmail.com',
      password: '$2b$10$.ZFF9JaD6WEBjfqSWwC/G.1olE9XE6wJ3b/aE5RErcziz7FJJTNaa',
      name: 'Murilo de Paula',
    },
  },
  {
    id: 15,
    amount: 500,
    date: new Date(),
    description: 'Despesa do Voo',
    userId: 5,
    user: {
      id: 5,
      email: 'netomurilo100@gmail.com',
      password: '$2b$10$.ZFF9JaD6WEBjfqSWwC/G.1olE9XE6wJ3b/aE5RErcziz7FJJTNaa',
      name: 'Murilo de Paula',
    },
  },
  {
    id: 16,
    amount: 300,
    date: new Date(),
    description: 'Despesa do Barril',
    userId: 5,
    user: {
      id: 5,
      email: 'netomurilo100@gmail.com',
      password: '$2b$10$.ZFF9JaD6WEBjfqSWwC/G.1olE9XE6wJ3b/aE5RErcziz7FJJTNaa',
      name: 'Murilo de Paula',
    },
  },
];

const userMock = {
  id: 5,
  email: 'netomurilo100@gmail.com',
  password: '$2b$10$.ZFF9JaD6WEBjfqSWwC/G.1olE9XE6wJ3b/aE5RErcziz7FJJTNaa',
  name: 'Murilo de Paula',
}

const serviceMock = {
  findAll: jest.fn().mockResolvedValue(fakeExpenses),
  findOne: jest.fn().mockReturnValue(fakeExpenses[0]),
  create: jest.fn().mockReturnValue(fakeExpenses[0]),
  update: jest.fn().mockReturnValue(fakeExpenses[0]),
  remove: jest.fn(),
};

describe('PostsController', () => {
  let controller: ExpenseController;
  let service: ExpenseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExpenseController],
      providers: [{ provide: ExpenseService, useValue: serviceMock }],
    }).compile();

    controller = module.get<ExpenseController>(ExpenseController);
    service = module.get<ExpenseService>(ExpenseService);
  });

  describe('findAll', () => {
    it('should return an array of categories', async () => {
      const response = await controller.findAll();

      expect(service.findAll).toBeCalledTimes(1);
      expect(response).toEqual(fakeExpenses);
    });
  });

  describe('create', () => {
    it('should create a post and return', async () => {
      const response = await controller.create(fakeExpenses[0],userMock);

      expect(service.create).toBeCalledWith(fakeExpenses[0],"netomurilo100@gmail.com");
      expect(response).toEqual(fakeExpenses[0]);
    });
  });

  describe('findOne', () => {
    it('should return one post', async () => {
      const response = await controller.findOne('13');

      expect(service.findOne).toBeCalledWith(13);
      expect(response).toEqual(fakeExpenses[0]);
    });
  });

  describe('update', () => {
    it('should update a post', async () => {
      const response = await controller.update('13', fakeExpenses[0],userMock);

      expect(service.update).toBeCalledWith(13, fakeExpenses[0],5);
      expect(response).toEqual(fakeExpenses[0]);
    });
  });

  describe('remove', () => {
    it('should remove a post', async () => {
      const response = await controller.remove('13',userMock);

      expect(service.remove).toBeCalledWith(13,5);
      expect(response).toBeUndefined();
    });
  });
});
