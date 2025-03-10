export const UserRole = {
  Customer: 1, // 고객
  Shopkeeper: 2, // 식당 주인
} as const;
export type UserRole = (typeof UserRole)[keyof typeof UserRole];
