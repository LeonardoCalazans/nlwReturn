import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from 'nodemailer';

export const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "9577f27b8250c9",
        pass: "cdef791353d949"
    }
});
export class NodemailerMailAdapter implements MailAdapter {
    async sendMail({ subject, body }: SendMailData) {
        await transport.sendMail({
            from: 'Equipe Feedget <oi@feedget.com',
            to: 'Leonardo Calazans <leonardopintosilva@hotmail.com>',
            subject,
            html: body
        });
    }
}