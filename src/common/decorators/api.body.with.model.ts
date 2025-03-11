import { applyDecorators, Type } from '@nestjs/common';
import { ApiBody, ApiExtraModels, getSchemaPath } from '@nestjs/swagger';

export const ApiBodyWithModel = <Model extends Type<any>>(
  name: string,
  model: Model,
) => {
  const createClass = {
    [name]: class extends model {},
  }[name];
  return applyDecorators(
    ApiBody({
      schema: { $ref: getSchemaPath(createClass) },
    }),
    ApiExtraModels(createClass),
  );
};
