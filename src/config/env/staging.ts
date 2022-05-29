import { config } from 'dotenv';
config();
export default {
    ip_host: process.env.IP_HOST || 'http://103.92.29.62',
    whitelist: '*',
    mail_host: process.env.MAIL_HOST,
    mail_port: process.env.MAIL_PORT,
    mail_username: process.env.MAIL_USERNAME,
    mail_password: process.env.MAIL_PASSWORD,
};
