import { API_PATH } from '@common/variables/environment';
import { applyDecorators, HttpStatus, Type } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger';
import { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export const ApiResponseWithCaseModel = <Model extends Type<any> | object>(
  modelProps: {
    [k: string]: {
      [summary: string]: Model | Model[];
    };
  },
  status: HttpStatus,
  path: string,
  method: string,
) => {
  const [modelName, models] = Object.entries(modelProps)[0];
  const extraModels: Type<any>[] = [];
  const schema: SchemaObject = {
    title: modelName,
    oneOf: Object.entries(models).map(([summary, model]) => {
      const isArray = Array.isArray(model);
      const useModel = isArray ? model[0] : model;
      const isClass = typeof useModel === 'function';

      if (isClass) {
        extraModels.push(useModel);
        return {
          title: summary,
          type: 'object',
          properties: {
            ok: { type: 'boolean', example: [200, 201].includes(status) },
            status: { type: 'number', example: status },
            method: { type: 'string', example: method },
            path: { type: 'string', example: API_PATH + path },
            payload: isArray
              ? {
                  type: 'array',
                  items: {
                    $ref: getSchemaPath(useModel),
                  },
                }
              : {
                  type: 'object',
                  $ref: getSchemaPath(useModel),
                },
            timestamp: { type: 'string', example: '2025-03-14 21:28:30.718' },
          },
        };
      }
      return {
        title: summary,
        type: 'object',
        properties: {
          ok: { type: 'boolean', example: [200, 201].includes(status) },
          status: { type: 'number', example: status },
          method: { type: 'string', example: method },
          path: { type: 'string', example: API_PATH + path },
          payload: isArray
            ? {
                type: 'array',
                items: {
                  properties: Object.fromEntries(
                    Object.entries(useModel).map(([k, v]) => [
                      k,
                      {
                        type: typeof v,
                        value: v,
                      },
                    ]),
                  ),
                },
              }
            : {
                type: 'object',
                properties: Object.fromEntries(
                  Object.entries(useModel).map(([k, v]) => [
                    k,
                    {
                      type: typeof v,
                      value: v,
                    },
                  ]),
                ),
              },
          timestamp: { type: 'string', example: '2025-03-14 21:28:30.718' },
        },
      };
    }),
  };

  const examples = Object.fromEntries(
    Object.entries(models).map(([summary, model]) => [
      summary,
      {
        summary,
        value: {
          ok: true,
          status,
          method,
          path: API_PATH + path,
          payload: model,
          timestamp: '2025-03-14 21:28:30.718',
        },
      },
    ]),
  );

  if (extraModels.length > 0) {
    return applyDecorators(
      ApiResponse({ schema, examples }),
      ApiExtraModels(...extraModels),
    );
  }
  return applyDecorators(ApiResponse({ schema, examples }));
};
