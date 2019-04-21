const { SystemError } = require('./error');
const { sessions } = require('./sessions');

class Route {

  constructor(router, base, api) {
    this.router = router;
    this.base = base;
    this.api = api;
  }

  register(method, path, fn, isPrivate = false) {
    this.router[method](`/${this.base}${path}`, async (ctx) => {
      try {
        let session;

        if (isPrivate) {
          const { authorization = '' } = ctx.headers;
          session = sessions[authorization.replace(/^Basic\s/i, '')];

          if (!session) {
            this.throwError('401', { auth: 'invalid' });
          }
        }

        const result = await fn.call(this, ctx, session);
        ctx.body = JSON.stringify(result);
      } catch (err) {

        if (err instanceof SystemError) {
          ctx.status = err.status;
          ctx.body = err.reasons;

          console.error('system error', err);
        } else {
          ctx.status = 500;
          ctx.body = { message: err.message };

          console.error('fatal error', err);
        }

      }
    });

    console.log(`[Router] register new route ${method} /${this.base}${path}`);
  }

  throwError(status, reasons) {
    throw new SystemError(status, reasons);
  }

}

exports.Route = Route;