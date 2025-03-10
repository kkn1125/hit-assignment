import { registerAs } from '@nestjs/config';
import { secretOption } from '@util/secret';

export type SecretOption = (...args: any) => typeof secretOption;

export default registerAs('secret', () => secretOption);
