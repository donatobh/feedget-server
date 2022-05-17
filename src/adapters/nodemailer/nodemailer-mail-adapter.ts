import nodemailer from 'nodemailer';
import { MailAdapter, SendMailData } from "../mail-adapter";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "12922824accb33",
    pass: "a1d8a6a4875476"
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