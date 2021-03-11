import { response } from 'express';
import path from 'path';

import Transaction from '../models/Transaction';
import loadCSV from '../config/loadCsv';
import CreateTransactionService from './CreateTransactionService';



class ImportTransactionsService {
  async execute(): Promise<Transaction[]> {
    const csvFilePath = path.resolve(__dirname, '..', '__tests__', 'import_template.csv');

    const loadCSVfile = await loadCSV(csvFilePath);

    const transactionsService = new CreateTransactionService();

    console.log(loadCSVfile);

   const newTransactions = loadCSVfile.map(transaction => (
     {
       title: transaction[0],
       type: transaction[1],
       value: transaction[2],
       category: transaction[3]
     }
   ));

   console.log(newTransactions);

    return newTransactions;
  }
}

export default ImportTransactionsService;
