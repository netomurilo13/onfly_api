/* eslint-disable @typescript-eslint/no-var-requires */
import { Expense } from './../expense/entities/expense.entity';
const nodemailer = require('nodemailer');

export async function sendEmailToUser(email: string, expense: Expense) {
  // cria o transportador de e-mail
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'expensesonflyapp@gmail.com', // o e-mail do remetente
      pass: 'oaownbmkgrydmdgn', // a senha do e-mail do remetente
    },
  });

  // define as informações do e-mail
  const mailOptions = {
    from: 'expensesonflyapp@gmail.com',
    to: email, // o e-mail do destinatário
    subject: 'Despesa cadastrada',
    text: `Foi cadastrada uma nova despesa com os seguintes dados:\n
           Descrição: ${expense.description}\n
           Valor: ${expense.amount}\n
           Data: ${expense.date}`,
  };

  // envia o e-mail
  await transporter.sendMail(mailOptions);
}
