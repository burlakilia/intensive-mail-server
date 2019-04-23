const { SystemError } = require('./error');
const sessions = require('./sessions');

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
          session = sessions.get(authorization.replace(/^Basic\s/i, ''));

          if (!session) {
            this.throwError('401', { auth: 'invalid', success: false });
          }
        }

        const result = await fn.call(this, ctx, session);
        result.success = true;
        ctx.body = JSON.stringify(result);
      } catch (err) {

        if (err instanceof SystemError) {
          ctx.status = err.status;
          ctx.body = err.reasons;
          ctx.body.success = false;

          console.log('system error', err.reasons);
        } else {
          ctx.status = 500;
          ctx.body = { message: err.message, success: false };

          console.log('fatal error: ', err.message);
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