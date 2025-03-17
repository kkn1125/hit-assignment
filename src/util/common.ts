import { PORT, RUN_MODE, VERSION } from '@common/variables/environment';

export const commonOption = {
  version: VERSION,
  port: PORT,
  allowOrigins:
    RUN_MODE === 'development'
      ? ['localhost:8080']
      : [
          /* production host */
          'http://43.202.247.4:8080',
          'http://localhost:8080',
        ],
};
