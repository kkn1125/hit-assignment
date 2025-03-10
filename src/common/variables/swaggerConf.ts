import { registerAs } from '@nestjs/config';
import { swaggerOption } from '@util/swagger';

export type SwaggerOption = (...args: any) => typeof swaggerOption;

export default registerAs('swagger', () => swaggerOption);
