import {
  FindManyOptions,
  FindOptionsRelations,
  FindOptionsSelect,
  FindOptionsWhere,
  ObjectLiteral,
  Repository,
} from 'typeorm';
import { Protocol } from './protocol';
import { NotFoundException } from '@nestjs/common';

export async function searchPagination<Domain extends ObjectLiteral>(
  orm: Repository<Domain>,
  path: string,
  query: FindManyOptions<Domain>,
  page: number,
  perPage: number,
): Promise<{ data: Domain[]; pagination: Pagination }> {
  const dataList = await orm.find(query);
  const totalAmount = await orm.countBy(query.where ?? {});
  const total = Math.ceil(totalAmount / perPage);
  const prev = (page - 1) * perPage > 0;
  const next = (page + 1) * perPage <= totalAmount;
  return {
    data: dataList,
    pagination: {
      page,
      count: dataList.length,
      total,
      prev: prev ? `${path}${page > 1 ? `?page=${page - 1}` : ''}` : undefined,
      next: next ? `${path}?page=${page + 1}` : undefined,
    },
  };
}

export async function throwNoExistsEntityWithSelectBy<
  Domain extends ObjectLiteral,
>(
  orm: Repository<Domain>,
  whereOption: FindOptionsWhere<Domain>,
  selectOption?: FindOptionsSelect<Domain>,
  relations?: FindOptionsRelations<Domain>,
) {
  const domainName = orm.create().constructor.name;
  const entity = await orm.findOne({
    where: whereOption,
    select: selectOption,
    relations,
  });

  if (!entity) {
    const errorProtocol = Protocol.NotFound;
    throw new NotFoundException(errorProtocol, {
      cause: [domainName],
    });
  }

  return entity;
}

export function isEmptyObject<Obj extends object>(obj: Obj) {
  return Object.keys(obj).length === 0;
}
