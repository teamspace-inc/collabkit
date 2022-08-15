import nodemailer from 'nodemailer';
import { buildSendMail } from 'mailing-core';

const transport = nodemailer.createTransport({
  pool: true,
  host: 'smtp.mailgun.org',
  port: 587,
  secure: true, // use TLS
  auth: {
    user: process.env.MAILER_USER,
    pass: process.env.MAILER_PASSWORD,
  },
});

const sendMail = buildSendMail({
  transport,
  defaultFrom: 'noreply@mail.collabkit.dev',
});

export { sendMail };
