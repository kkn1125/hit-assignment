import { registerAs } from '@nestjs/config';
import { commonOption } from '@util/common';

export type CommonOption = (...args: any) => typeof commonOption;

export default registerAs('common', () => commonOption);
