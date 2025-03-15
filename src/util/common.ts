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
          'port-0-hit-assignment-m8ai2uwf803314cf.sel4.cloudtype.app:443',
          'localhost:8080',
        ],
};
