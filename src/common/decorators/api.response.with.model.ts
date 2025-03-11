import { applyDecorators, Type } from '@nestjs/common';
import {
  ApiResponse,
  ApiResponseOptions,
  getSchemaPath,
} from '@nestjs/swagger';

export const ApiResponseWithModel = <
  Model extends Type<any> | object | boolean | string | number,
>(
  model: Model,
  { ok, status, method, path, message }: ResponseProperty,
  options?: Omit<ApiResponseOptions, 'schema'>,
) => {
  const isClass =
    typeof model === 'object' &&
    model.constructor.toString().startsWith('class');

  const properties: Record<string, any> = {};
  properties.ok = { type: 'boolean', example: ok };
  properties.status = { type: 'number', example: status };
  properties.method = { type: 'string', example: method };
  properties.path = { type: 'string', example: path };
  properties.payload = isClass
    ? {
        $ref: getSchemaPath(model as Type<any>),
      }
    : { example: model };
  if (message) {
    properties.messagee = { type: 'string', example: message };
  }
  properties.timestamp = { type: 'number', example: 1741672686205 };

  return applyDecorators(
    ApiResponse({
      ...options,
      status,
      schema: { properties },
    }),
  );
};
