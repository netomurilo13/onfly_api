/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { ExpenseService } from '../../src/expense/expense.service';
import { PrismaService } from '../../src/prisma/prisma.service';

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
    date:  new Date(),
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
    date:  new Date(),
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
    date:  new Date(),
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


const prismaMock = {
  expense: {
    create: jest.fn().mockReturnValue(fakeExpenses[0]),
    findMany: jest.fn().mockResolvedValue(fakeExpenses),
    findUnique: jest.fn().mockResolvedValue(fakeExpenses[0]),
    update: jest.fn().mockResolvedValue(fakeExpenses[0]),
    delete: jest.fn(), // O método delete não retorna nada
  },
};

describe('ExpensesService', () => {
  let service: ExpenseService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExpenseService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<ExpenseService>(ExpenseService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(prisma).toBeDefined();
  });

  describe('create', () => {
    it(`should create a new post`, async () => {
      const response = await service.create(fakeExpenses[0], "teste0131@gmail.com");

      expect(response).toBe(fakeExpenses[0]);
      expect(prisma.expense.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('updateOne', () => {
    it(`should update a post`, async () => {
      const response = await service.update(13, fakeExpenses[0], 5);

      expect(response).toEqual(fakeExpenses[0]);
      expect(prisma.expense.update).toHaveBeenCalledTimes(1);
    });

    it(`should return NotFoundException when no post is found`, async () => {
      const unexistingPost = {
        id: 42,
        titulo: 'teste',
        conteudo: 'Conteudo Teste',
        publicado: false,
        autor: 'Teste',
      };

      jest.spyOn(prisma.expense, 'update').mockRejectedValue(new Error());

      try {
        await service.update(42, unexistingPost, 1);
      } catch (error) {
        expect(error).toEqual(new Error("There is no such expense"));
      }

    });
  });

  describe('deleteOne', () => {
    it(`should delete post and return empty body`, async () => {
      expect(await service.remove(13,5)).toBeUndefined();
      expect(prisma.expense.delete).toHaveBeenCalledTimes(1);
    });

    it(`should return NotFoundException if post does not exist`, async () => {
      jest.spyOn(prisma.expense, 'delete').mockRejectedValue(new Error());

      try {
        await service.remove(99,1);
      } catch (error) {
        expect(error).toEqual(new Error('There is no such expense'));
      }

      expect(prisma.expense.delete).toHaveBeenCalledTimes(0);
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
