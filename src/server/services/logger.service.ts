import pinoHttp from 'pino-http';
import { randomUUID } from 'node:crypto';

import { env } from '../env';

export const loggerService = pinoHttp({
  level: env.LOG === 'true' ? undefined : 'silent',
  genReqId: (request, response) => {
    const requestId = request.headers['X-Request-Id'] || randomUUID();
    response.setHeader('X-Request-Id', requestId);
    return requestId;
  },
});
