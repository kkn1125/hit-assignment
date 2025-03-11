import { FindManyOptions, ObjectLiteral, Repository } from 'typeorm';

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
