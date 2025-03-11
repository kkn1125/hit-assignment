import { applyDecorators, Type } from '@nestjs/common';
import { ApiBody, ApiExtraModels, getSchemaPath } from '@nestjs/swagger';

export const ApiBodyWithModel = <Model extends Type<any> | object>(modelProps: {
  [k: string]: Model;
}) => {
  const [modelName, model] = Object.entries(modelProps)[0];
  const isClass =
    model.constructor.toString().startsWith('class') ||
    model.constructor.toString().match(/function (Function)/);

  if (isClass) {
    const extendsModel = model as Type<any>;
    const createClass = {
      [modelName]: class extends extendsModel {},
    }[modelName];
    return applyDecorators(
      ApiBody({
        schema: { $ref: getSchemaPath(createClass) },
      }),
      ApiExtraModels(createClass),
    );
  }

  return applyDecorators(
    ApiBody({
      schema: {
        title: modelName,
        properties: Object.fromEntries(
          Object.entries(model).map(([k, v]) => [
            k,
            {
              type: typeof v,
              example: v,
            },
          ]),
        ),
      },
    }),
  );
};
