
const nodemailer = require('nodemailer');

import fs from 'fs';
import * as path from 'path';
import handlebars from 'handlebars';
import keys from '../../config/env/keys';

export class MailService {
    private transporter;
    private toEmail;
    private subjectMail;
    private textMail = '';
    private template;
    constructor() {
        this.transporter = nodemailer.createTransport({ // config mail server
            host: keys.mail_host,
            port: keys.mail_port,
            auth: {
                user: keys.mail_username,
                pass: keys.mail_password
            }
        });

    }

    public to(email) {
        this.toEmail = email
        return this;
    }

    public subject(subject) {
        this.subjectMail = subject
        return this;
    }

    public text(text) {
        this.textMail = text
        return this;
    }

    private getOptions() {
        return {
            from: 'Assigment Project',
            to: this.toEmail,
            subject: this.subjectMail,
            text: this.textMail,
            html: this.template
        }
    }

    public execute() {
        if (!this.toEmail) throw new Error('To email required');
        if (!this.template) throw new Error('Template required');
        if (!this.subjectMail) throw new Error('Subject required');
        this.transporter.sendMail(this.getOptions(), function (err, info) {
            if (err) {
                console.log(err)
            } else {
                console.log(info)
            }
        });

    }
    public sendJoinGroup(student, groups) {
        let groupNames = groups.map(group => " " + group.name)
        this.subjectMail = `Hi ${student.name}, You was added groups`
        this.template = this.renderEmailTemplate({
            template: 'send-user-join-group',
            data: {
                name: student.name,
                groupNames: groupNames,
            },
        });
        return this
    }

    private renderEmailTemplate({ template, data }) {
        try {
            const templatePath = path.join(__dirname, '.', 'templates', `${template}.hbs`);
            const rawContent = fs.readFileSync(templatePath, 'utf8');
            return handlebars.compile(rawContent)(data);
        } catch (error) {
            return error;
        }
    };
}