import { applyDecorators, Type } from '@nestjs/common';
import { ApiBody, ApiExtraModels, getSchemaPath } from '@nestjs/swagger';
import { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export const ApiBodyWithCaseModel = <
  Model extends Type<any> | object,
>(modelProps: {
  [k: string]: {
    [summary: string]: Model | Model[];
  };
}) => {
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
        return isArray
          ? {
              title: summary,
              type: 'array',
              items: {
                $ref: getSchemaPath(useModel),
              },
            }
          : {
              title: summary,
              type: 'object',
              $ref: getSchemaPath(useModel),
            };
      }

      return isArray
        ? {
            title: summary,
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
            title: summary,
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
          };
    }),
  };

  if (extraModels.length > 0) {
    return applyDecorators(ApiBody({ schema }), ApiExtraModels(...extraModels));
  }
  return applyDecorators(ApiBody({ schema }));
};
