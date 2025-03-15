import { fakerKO as faker } from '@faker-js/faker';

const user1 = {
  userId: 'tomastrain1',
  phone: '010-1234-5678',
  email: 'tomastrain1@example.com',
  username: '김영호',
  password: 'qweQQ!!1',
  role: 1,
};
const user2 = {
  userId: 'matjung1221',
  phone: '010-2589-3562',
  email: 'matyoujung@example.com',
  username: '최유정',
  password: 'qweQQ!!1',
  role: 1,
};
const user3 = {
  userId: 'resting0301',
  phone: '010-9562-4253',
  email: 'matzip@example.com',
  username: '구승용',
  password: 'qweQQ!!1',
  role: 1,
};

const shopkeeper1 = {
  userId: 'sushiryu0423',
  phone: '010-5132-9584',
  email: 'ryu0423@example.com',
  username: '류정열',
  password: 'qweQQ!!1',
  role: 2,
};
const shopkeeper2 = {
  userId: 'imfinedining',
  phone: '010-8261-0021',
  email: 'dining-fore0306@example.com',
  username: '이승재',
  password: 'qweQQ!!1',
  role: 2,
};
const restaurant1 = {
  userId: 4,
  category: 'omakase',
  name: '스시오마주',
  location: '울산광역시 남구 삼산중로00번길 0-00',
};
const restaurant2 = {
  userId: 5,
  category: 'fine dining',
  name: '메종 드 레브',
  location: '서울특별시 서초구 효령로00길 00',
};

const omakaseMenus = [
  {
    restaurantId: 1,
    category: 'main',
    name: '런치 코스',
    price: 25000,
    description:
      '츠마미 or 숙성회 아에모노, 시그니처 마끼 or 고등어봉초밥, 멘치카츠 치즈버거, 선택 1 단품 시스 (못 드시는 음식이 있으시면, 다른 메뉴로 변경해드립니다.)',
  },
  {
    restaurantId: 1,
    category: 'main',
    name: '디너 코스',
    price: 35000,
    description: '츠마미, 방어회, ',
  },
  {
    restaurantId: 1,
    category: 'side',
    name: '구운 전복',
    price: 35000,
    description: '버터와 간장으로 구운 전복, 깊은 감칠맛이 특징.',
  },
  {
    restaurantId: 1,
    category: 'side',
    name: '와규 타다끼',
    price: 48000,
    description:
      '겉만 살짝 익혀 풍미를 살린 와규 타다끼, 트러플 소스와 함께 제공.',
  },
  {
    restaurantId: 1,
    category: 'side',
    name: '제철 해산물 찜',
    price: 32000,
    description: '신선한 해산물을 쪄서 자연 그대로의 맛을 살린 요리.',
  },
  {
    restaurantId: 1,
    category: 'side',
    name: '일본식 계란찜 (차왕무시)',
    price: 18000,
    description:
      '부드러운 일본식 계란찜, 대합과 다시마 육수의 깊은 맛이 어우러짐.',
  },
  {
    restaurantId: 1,
    category: 'side',
    name: '트러플 우니(성게) 덮밥',
    price: 52000,
    description: '신선한 우니와 트러플이 어우러진 럭셔리한 미니 덮밥.',
  },
  {
    restaurantId: 1,
    category: 'soup',
    name: '미소된장국',
    price: 8000,
    description: '구운 두부와 다시마 육수를 사용한 깊은 맛의 미소된장국.',
  },
  {
    restaurantId: 1,
    category: 'soup',
    name: '트러플 도미탕',
    price: 38000,
    description:
      '트러플과 도미를 사용하여 깊은 향과 감칠맛을 살린 특별한 국물 요리.',
  },
  {
    restaurantId: 1,
    category: 'dessert',
    name: '말차 티라미수',
    price: 20000,
    description:
      '말차의 쌉싸름한 맛과 크리미한 마스카포네 치즈가 어우러진 일본식 티라미수.',
  },
  {
    restaurantId: 1,
    category: 'dessert',
    name: '유자 셔벗',
    price: 15000,
    description: '상큼한 유자의 향을 살린 시원한 셔벗 디저트.',
  },
  {
    restaurantId: 1,
    category: 'dessert',
    name: '흑임자 아이스크림',
    price: 18000,
    description: '고소한 흑임자를 활용한 부드러운 일본식 아이스크림.',
  },
  {
    restaurantId: 1,
    category: 'beverage',
    name: '사케 페어링',
    price: 60000,
    description: '각 코스에 어울리는 사케를 소믈리에가 직접 페어링하여 제공.',
  },
];

const fineDiningMenus = [
  {
    restaurantId: 2,
    category: 'main',
    name: '트러플 인퓨전 한우 스테이크',
    price: 180000,
    description:
      '숙성된 한우 안심을 트러플 오일로 마리네이드하고 저온 조리한 스테이크, 블랙 트러플 소스와 함께 제공.',
  },
  {
    restaurantId: 2,
    category: 'main',
    name: '벨루가 캐비어를 곁들인 참돔 카르파초',
    price: 150000,
    description:
      '신선한 참돔을 얇게 저민 후 벨루가 캐비어와 감귤 비네그레트 소스로 마무리한 정제된 요리.',
  },
  {
    restaurantId: 2,
    category: 'main',
    name: '프렌치 오마카세 디너 코스',
    price: 280000,
    description: '셰프가 엄선한 제철 식재료로 구성된 프랑스식 풀코스 오마카세.',
  },
  {
    restaurantId: 2,
    category: 'main',
    name: '랍스터 비스크와 수비드 가리비',
    price: 170000,
    description:
      '랍스터 껍질을 우려낸 진한 비스크와 수비드한 가리비를 곁들인 해산물 요리.',
  },
  {
    restaurantId: 2,
    category: 'main',
    name: '와규 숯불구이와 레드와인 소스',
    price: 190000,
    description:
      'A5 등급 와규를 숯불에서 구워 레드와인 소스와 감자 퓨레를 곁들인 고급 요리.',
  },
  {
    restaurantId: 2,
    category: 'side',
    name: '포르치니 머쉬룸 리조또',
    price: 75000,
    description: '포르치니 버섯과 트러플을 사용한 깊은 풍미의 크리미한 리조또.',
  },
  {
    restaurantId: 2,
    category: 'side',
    name: '감태와 우니(성게) 브루스케타',
    price: 90000,
    description:
      '바삭한 브루스케타 위에 감태와 신선한 우니를 얹어 고급스러운 감칠맛을 살린 요리.',
  },
  {
    restaurantId: 2,
    category: 'side',
    name: '이베리코 하몽과 무화과',
    price: 82000,
    description:
      '숙성된 이베리코 하몽과 신선한 무화과를 곁들인 고급 전채 요리.',
  },
  {
    restaurantId: 2,
    category: 'side',
    name: '트러플 버터를 곁들인 수제 바게트',
    price: 65000,
    description: '프랑스산 트러플 버터를 곁들인 갓 구운 수제 바게트.',
  },
  {
    restaurantId: 2,
    category: 'side',
    name: '양갈비 크러스트와 허브 소스',
    price: 120000,
    description:
      '허브와 파르메산 치즈 크러스트를 입힌 양갈비, 레드와인 소스와 함께 제공.',
  },
  {
    restaurantId: 2,
    category: 'soup',
    name: '송로버섯 콘소메',
    price: 85000,
    description: '블랙 트러플과 가리비를 곁들인 클리어 콘소메 스프.',
  },
  {
    restaurantId: 2,
    category: 'soup',
    name: '프렌치 어니언 스프',
    price: 68000,
    description:
      '오랜 시간 카라멜라이즈한 양파와 깊은 육수, 그뤼에르 치즈를 얹어 구운 정통 프렌치 스프.',
  },
  {
    restaurantId: 2,
    category: 'soup',
    name: '랍스터 콘소메와 캐비어',
    price: 110000,
    description:
      '진한 랍스터 육수로 만든 콘소메에 캐비어를 곁들여 감칠맛을 극대화한 수프.',
  },
  {
    restaurantId: 2,
    category: 'dessert',
    name: '바닐라 빈 크렘 브륄레',
    price: 50000,
    description:
      '마다가스카르산 바닐라 빈을 사용한 부드럽고 고급스러운 크렘 브륄레.',
  },
  {
    restaurantId: 2,
    category: 'dessert',
    name: '루비 초콜릿 무스',
    price: 62000,
    description: '진귀한 루비 초콜릿을 활용한 가벼운 무스 디저트.',
  },
  {
    restaurantId: 2,
    category: 'dessert',
    name: '유자 마카롱',
    price: 45000,
    description: '프랑스식 마카롱과 상큼한 유자 크림의 조화.',
  },
  {
    restaurantId: 2,
    category: 'beverage',
    name: '도멘 르로와 샴페인 페어링',
    price: 220000,
    description: '최고급 샴페인을 각 코스에 맞춰 제공하는 페어링 옵션.',
  },
  {
    restaurantId: 2,
    category: 'beverage',
    name: '프리미엄 바쇼 말차',
    price: 50000,
    description: '일본 바쇼 농장의 최상급 말차를 사용한 고급 차 음료.',
  },
  {
    restaurantId: 2,
    category: 'beverage',
    name: '프랑스산 레드와인 샤또 마고',
    price: 350000,
    description: '보르도 지역 최고급 레드와인 샤또 마고, 와인 페어링에 적합.',
  },
];

export function createDummyUser() {
  return [user1, user2, user3, shopkeeper1, shopkeeper2];
}

export function createDummyRestaurant() {
  return [restaurant1, restaurant2];
}

export function createDummyMenus() {
  return [...omakaseMenus, ...fineDiningMenus];
}
