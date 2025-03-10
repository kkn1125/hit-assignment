export const Protocol = {
  /* common error */
  BadRequest: { errorCode: 1000, message: '잘못된 요청입니다.' }, // 400
  UnAuthorized: { errorCode: 1001, message: '인증이 필요합니다.' }, // 401
  Forbidden: { errorCode: 1002, message: '접근 권한이 없습니다.' }, // 403
  NotFound: { errorCode: 1003, message: '리소스를 찾을 수 없습니다.' }, // 404
  Conflict: { errorCode: 1004, message: '리소스가 중복됩니다.' }, // 409
  ServerError: { errorCode: 1005, message: '서버에 문제가 발생했습니다.' }, // 500

  WrongCookieType: { errorCode: 2000, message: '잘못된 쿠키 정보입니다.' }, // 400
} as const;
export type Protocol = (typeof Protocol)[keyof typeof Protocol];

export type ErrorType = {
  errorCode: number;
  message: string;
};
