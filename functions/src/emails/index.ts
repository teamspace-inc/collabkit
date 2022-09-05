import nodemailer from 'nodemailer';
import { buildSendMail } from 'mailing-core';
import * as functions from 'firebase-functions';
const transport = nodemailer.createTransport({
  pool: true,
  host: 'smtp.sendgrid.net',
  port: 465,
  secure: true, // use TLS
  auth: {
    user: functions.config().mailer?.user ?? process.env.MAILER_USER,
    pass: functions.config().mailer?.pass ?? process.env.MAILER_PASSWORD,
  },
});

const sendMail = buildSendMail({
  transport,
  defaultFrom: 'noreply@collabkit.dev',
});

export { sendMail };
