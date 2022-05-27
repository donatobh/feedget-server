import nodemailer from 'nodemailer';
import { MailAdapter, SendMailData } from "../mail-adapter";

const transport = nodemailer.createTransport({
  host: "smtp.sendgrid.net",
  port: 587,
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PWD
  }
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({subject, body}: SendMailData) {
    await transport.sendMail({
      from: 'Equipe Feedget<donato@donatobh.com.br>',
      to: 'Dieimes Donato <dieimes@yahoo.com>',
      subject,
      html: body,
    })
  };
}