import nodemailer from 'nodemailer';
import { MailAdapter, SendMailData } from "../mail-adapter";

const transport = nodemailer.createTransport({
  host: "smtp.mailgun.org",
  port: 587,
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PWD
  }
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({subject, body}: SendMailData) {
    await transport.sendMail({
      from: 'Equipe Feedget<postmaster@sandbox3c4c9d6a06fc42a1b4e96bd67c70531b.mailgun.org>',
      to: 'Dieimes Donato <dieimes@yahoo.com.com>',
      subject,
      html: body,
    })
  };
}