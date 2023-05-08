/* eslint-disable @typescript-eslint/no-var-requires */
import { Expense } from '../entities/expense.entity';
const nodemailer = require('nodemailer');

export async function sendEmailToUser(email: string, expense: Expense) {
  // cria o transportador de e-mail
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // define as informações do e-mail
  const mailOptions = {
    from: process.env.EMAIL_USER,
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
