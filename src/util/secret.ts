import {
  SECRET_ACCESS_TOKEN,
  SECRET_HASH_PASSWORD,
  SECRET_REFRESH_TOKEN,
} from '@common/variables/environment';

export const secretOption = {
  password: SECRET_HASH_PASSWORD,
  accessToken: SECRET_ACCESS_TOKEN,
  refreshToken: SECRET_REFRESH_TOKEN,
};
