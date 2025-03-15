import { fakerKO as faker } from '@faker-js/faker';

export function createDummyUser() {
  const user1 = {
    userId: '토마스기차1',
    phone: '010-1234-5678',
    email: 'tomastrain1@example.com',
    username: '김기차',
    password: 'qweQQ!!1',
    role: 1,
  };
  const user2 = {
    userId: '맛도락1',
    phone: '010-2589-3562',
    email: 'matyoujung@example.com',
    username: '최유정',
    password: 'qweQQ!!1',
    role: 1,
  };
  const user3 = {
    userId: '이집맛집인가요',
    phone: '010-1234-5678',
    email: 'matzip@example.com',
    username: '구승용',
    password: 'qweQQ!!1',
    role: 1,
  };

  const shopkeeper1 = {
    userId: '류니끄',
    phone: '010-1234-5678',
    email: 'ryu0423@example.com',
    username: '류정열',
    password: 'qweQQ!!1',
    role: 1,
  };
  const shopkeeper2 = {
    userId: '다이닝포레',
    phone: '010-1234-5678',
    email: 'dining-fore0306@example.com',
    username: '이승재',
    password: 'qweQQ!!1',
    role: 1,
  };
}
