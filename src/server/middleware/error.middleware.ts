import { ErrorRequestHandler } from 'express';
import jsonStringifySafe from 'json-stringify-safe';

import type { AxiosError } from 'axios';
import { getContext } from './context.middleware';
import { env } from '../env';

export const errorMiddleware: ErrorRequestHandler = (
  error: Error | AxiosError,
  request,
  response,
  next,
) => {
  if (!error) return next();
  console.log(error);
  const context = getContext();

  if (context.isDebug) {
    return response.status(500).render('debug', {
      message: error.message,
      details: jsonStringifySafe({
        error: error.stack?.split('\n').map((line) => line.trim()),
        env,
        request,
        context,
      }),
    });
  }

  return response.status(500).render('500');
};
