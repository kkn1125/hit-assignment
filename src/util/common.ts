import { PORT, RUN_MODE, VERSION } from '@common/variables/environment';

export const commonOption = {
  version: VERSION,
  port: PORT,
  allowOrigins:
    RUN_MODE === 'development'
      ? ['localhost:8080']
      : [
          /* production host */
          'kkn1125.github.io/hit-assignment:443',
          '43.201.15.151:8080',
          'localhost:8080',
        ],
};
