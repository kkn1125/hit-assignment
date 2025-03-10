import { registerAs } from '@nestjs/config';
import { typeormOption } from '@util/typeorm';

export type DatabaseOption = (...args: any) => typeof typeormOption;

export default registerAs('database', () => typeormOption);
