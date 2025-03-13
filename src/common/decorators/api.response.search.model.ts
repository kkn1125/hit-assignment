import { applyDecorators, HttpStatus, Type } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger';

export const ApiResponseSearchModel = <Model extends Type<any>>(
  modelProps: {
    [k: string]: Model;
  },
  path: string,
  pagination: PaginationType,
) => {
  const [modelName, model] = Object.entries(modelProps)[0];

  return applyDecorators(
    ApiResponse({
      status: HttpStatus.OK,
      schema: {
        anyOf: [
          {
            title: modelName,
            properties: {
              ok: {
                type: 'boolean',
                example: true,
              },
              status: {
                type: 'number',
                example: HttpStatus.OK,
              },
              path: {
                type: 'string',
                example: path,
              },
              payload: {
                properties: {
                  data: {
                    type: 'array',
                    items: {
                      $ref: getSchemaPath(model),
                    },
                  },
                  pagination: {
                    required: ['page', 'total'],
                    properties: {
                      page: {
                        type: 'number',
                        example: pagination.page,
                      },
                      count: {
                        type: 'number',
                        example: pagination.count,
                      },
                      total: {
                        type: 'number',
                        example: pagination.total,
                      },
                      prev: {
                        type: 'string',
                        example: `${path}?page=${pagination.page - 1}`,
                        description:
                          '이전 페이지가 없을 시 prev는 응답에 포함되지 않습니다.',
                      },
                      next: {
                        type: 'string',
                        example: `${path}?page=${pagination.page + 1}`,
                        description:
                          '다음 페이지가 없을 시 next는 응답에 포함되지 않습니다.',
                      },
                    },
                  },
                },
              },
            },
          },
          {
            title: modelName,
            properties: {
              ok: {
                type: 'boolean',
                example: true,
              },
              status: {
                type: 'number',
                example: HttpStatus.OK,
              },
              path: {
                type: 'string',
                example: path,
              },
              payload: {
                properties: {
                  data: {
                    type: 'array',
                    items: {
                      $ref: getSchemaPath(model),
                    },
                  },
                  pagination: {
                    required: ['page', 'total'],
                    properties: {
                      page: {
                        type: 'number',
                        example: pagination.page,
                      },
                      count: {
                        type: 'number',
                        example: pagination.count,
                      },
                      total: {
                        type: 'number',
                        example: pagination.total,
                      },
                    },
                  },
                },
              },
            },
          },
        ],
      },
    }),
    ApiExtraModels(model),
  );
};
