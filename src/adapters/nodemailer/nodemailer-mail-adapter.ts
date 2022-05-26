import nodemailer from 'nodemailer';
import { MailAdapter, SendMailData } from "../mail-adapter";

console.log(process.env.SMTP_USER, process.env.SMTP_PWD);

const transport = nodemailer.createTransport({
  host: "smtp.mailgun.org",
  port: 587,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PWD
  }
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({subject, body}: SendMailData) {
    await transport.sendMail({
      from: 'Equipe Feedget<feedget@donatobh.com.br>',
      to: 'Dieimes Donato <donatobh@gmail.com>',
      subject,
      html: body,
    })
  };
}