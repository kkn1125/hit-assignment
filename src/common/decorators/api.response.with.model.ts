import { API_PATH } from '@common/variables/environment';
import { applyDecorators, Type } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiResponse,
  ApiResponseOptions,
  getSchemaPath,
} from '@nestjs/swagger';

export const ApiResponseWithModel = <Model extends Type<any> | object>(
  modelProps: { [k: string]: Model },
  { ok, status, method, path, message }: ResponseProperty,
  options?: Omit<ApiResponseOptions, 'schema'>,
) => {
  const [modelName, model] = Object.entries(modelProps)[0];
  const isArray = Array.isArray(model);
  const properties: Record<string, any> = {};
  properties.ok = { type: 'boolean', example: ok };
  properties.status = { type: 'number', example: status };
  properties.method = { type: 'string', example: method };
  properties.path = { type: 'string', example: API_PATH + path };
  properties.payload = {};
  if (message) {
    properties.message = { type: 'string', example: message };
  }
  properties.timestamp = { type: 'string', example: '2025-03-14 21:28:30.718' };

  const pickModel = isArray ? model[0] : model;
  const isClass =
    pickModel.constructor.toString().startsWith('class') ||
    pickModel.constructor.toString().match(/function (Function)/);

  if (isClass) {
    properties.payload = isArray
      ? { type: 'array', items: { $ref: getSchemaPath(pickModel) } }
      : {
          $ref: getSchemaPath(pickModel),
        };

    return applyDecorators(
      ApiResponse({
        ...options,
        status,
        schema: { properties },
      }),
      ApiExtraModels(pickModel),
    );
  }

  properties.payload = {
    properties: isArray
      ? Object.fromEntries(
          Object.entries(model[0]).map(([k, v]) => [
            k,
            {
              type: typeof v,
              example: v,
            },
          ]),
        )
      : Object.fromEntries(
          Object.entries(model).map(([k, v]) => [
            k,
            {
              type: typeof v,
              example: v,
            },
          ]),
        ),
  };

  return applyDecorators(
    ApiResponse({
      ...options,
      status,
      schema: {
        title: modelName,
        properties,
      },
    }),
  );
};
