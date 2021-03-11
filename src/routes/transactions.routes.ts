import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';
import DeleteTransactionService from '../services/DeleteTransactionService';
import ImportTransactionsService from '../services/ImportTransactionsService';

const transactionsRouter = Router();

transactionsRouter.get('/', async (request, response) => {
  const transactionRepository = getCustomRepository(TransactionsRepository);

  const transactions = await transactionRepository.find();
  const balance = await transactionRepository.getBalance();

  return response.json({ transactions, balance })
});

transactionsRouter.post('/', async (request, response) => {
  const {title, value, type, category} = request.body;

  const createTransactionService = new CreateTransactionService();

  const newTransaction = await createTransactionService.execute({title, value, type, category});

  return response.json(newTransaction);
});


transactionsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const deleteTransactions = new DeleteTransactionService();

  await deleteTransactions.execute(id);

  return response.status(204).send();
});

transactionsRouter.post('/import', async (request, response) => {
  const importTransactionsService = new ImportTransactionsService();

  const transactions = await importTransactionsService.execute();

  return response.json( {transactions} );
});

export default transactionsRouter;
