const TokenGenerator = require('uuid-token-generator');
const { SystemError } = require('./error');
const generator = new TokenGenerator();
const Imap = require('imap');
const simpleParser = require('mailparser').simpleParser;

const YANDEX_IMAP_HOST = 'imap.yandex.ru';
const YANDEX_IMAP_PORT = 993;

class Session {

  constructor(email, pwd) {
    this.email = email;
    this.pwd = pwd;
    this.isConnected = false;
  }

  connect() {
    return new Promise((resolve, reject) => {
      this.imap = new Imap({
        user: this.email,
        password: this.pwd,
        host: YANDEX_IMAP_HOST,
        port: YANDEX_IMAP_PORT,
        tls: true
      });

      console.log(`session: try to connect ${this.email}`);

      this.imap.once('ready', () => {
        console.log(`session: connected ${this.email}`);
        this.isConnected = true;
        resolve();
      });
      this.imap.once('error', error => {
        const message = error.message;

        if (message.indexOf('Unable to login') !== -1) {
          reject(new SystemError(401, {
            login: 'invalid',
            password: 'invalid',
            success: false,
            message: 'Пароль или логин не верны'
          }));
        } else {
          console.log(`session: connection error`, error.message);
          reject(error);
        }

      });
      this.imap.once('end', () => {
        console.log(`session: connection end ${this.email}`);
        this.isConnected = false;
      });

      this.imap.connect();
    });
  }

  openInbox() {
    return new Promise((resolve,reject) => {
      this.imap.openBox('INBOX', true, (err, box) => {
        if (err) {
          reject(err);
        } else {
          resolve(box);
        }
      });
    })
  }

  fetch(total) {
    return new Promise((resolve, reject) => {
      const f = this.imap.seq.fetch(total + ':*', { bodies: [
          'HEADER.FIELDS (FROM TO SUBJECT DATE)', 'TEXT',
        ]
      });
      const messages = [];
      f.on('message', function(msg, seqno) {
        const prefix = '(#' + seqno + ') ';
        const message = { prefix, headers: {} };

        msg.on('body', function(stream, info) {
          let buffer = '';

          stream.on('data', function(chunk) {
            buffer += chunk.toString('utf8');
          });

          stream.once('end', function() {
            if (info.which.indexOf('HEADER.FIELDS') !== -1) {
              message.headers = { ...message.headers, ...Imap.parseHeader(buffer) };
            } else {
              message[info.which.toLowerCase()] = buffer;
            }
          });

          console.log(info.which);
        });
        msg.once('attributes', function(attrs) {
          message.attrs = attrs;
        });
        msg.once('end', function() {
          messages.push(message);
        });
      });
      f.once('error', function(err) {
        reject(err);
      });
      f.once('end', function() {
        resolve(messages);
      });
    })
  }



  async getMessages() {

    if (!this.isConnected) {
      await this.connect();
    }

    const box = await this.openInbox();
    const mails = await this.fetch(box.messages.total);
    const messages = [];

    for (const mail of mails) {
      messages.push({ ... await simpleParser(mail.text), ...mail.headers });
    }

    return {
      name: box.name,
      total: box.messages.total,
      unread: box.messages.unread,
      messages
    };
  }


}

const sessions = {};

exports.create = async function (email, pwd) {
  const session = new Session(email, pwd);
  const token = generator.generate();

  await session.connect();
  sessions[token] = session;

  return token;
};

exports.get = function (token) {
  const session = sessions[token];

  if (!session) {
    throw new SystemError(401, { token: 'invalid' });
  }

  return session;
};