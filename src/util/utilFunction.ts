import {
  FindManyOptions,
  FindOptionsSelect,
  FindOptionsWhere,
  ObjectLiteral,
  Repository,
} from 'typeorm';
import { Protocol } from './protocol';
import { NotFoundException } from '@nestjs/common';

export async function searchPagination<
  Orm extends Repository<Domain>,
  Domain extends ObjectLiteral,
  Query extends FindManyOptions<Domain>,
>(
  orm: Orm,
  path: string,
  query: Query,
  page: number = 1,
  perPage: number = 10,
) {
  const dataList = await orm.find(query);
  const totalAmount = await orm.countBy(query.where ?? {});
  const total = Math.ceil(perPage / totalAmount);
  const prev = (page - 1) * perPage > 0;
  const next = (page + 1) * perPage <= totalAmount;
  return {
    data: dataList,
    pagination: {
      page,
      total,
      prev: prev ? `${path}?page=${page - 1}` : undefined,
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
) {
  const domainName = orm.create().constructor.name;
  const entity = await orm.findOne({
    where: whereOption,
    select: selectOption,
  });

  if (!entity) {
    const errorProtocol = Protocol.NotFound;
    throw new NotFoundException(errorProtocol, {
      cause: [domainName],
    });
  }

  return entity;
}
