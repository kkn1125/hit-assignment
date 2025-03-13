/* 오류 발생 내용을 응답 (보안 위해 최소한의 내용만 전달) */
export const Protocol = {
  /* common error */
  BadRequest: { errorCode: 1000, message: '잘못된 요청입니다.' }, // 400
  UnAuthorized: { errorCode: 1001, message: '인증이 필요합니다.' }, // 401
  Forbidden: { errorCode: 1002, message: '접근 권한이 없습니다.' }, // 403
  NotFound: { errorCode: 1003, message: '리소스를 찾을 수 없습니다.' }, // 404
  Conflict: { errorCode: 1004, message: '리소스가 중복됩니다.' }, // 409
  ServerError: { errorCode: 1005, message: '서버에 문제가 발생했습니다.' }, // 500

  /* auth error */
  RequiredLogin: { errorCode: 2000, message: '로그인이 필요합니다.' }, // 401
  NoMatchRoles: { errorCode: 2001, message: '사용자 권한이 없습니다.' }, // 401
  CookieWrongType: { errorCode: 2002, message: '잘못된 쿠키 정보입니다.' }, // 400
  JwtWrongSignature: { errorCode: 2003, message: '잘못된 서명입니다.' }, // 401
  JwtExpired: { errorCode: 2004, message: '토큰이 만료되었습니다.' }, // 401
  JwtMalFormed: { errorCode: 2005, message: '잘못된 토큰 형태입니다.' }, // 401
  JwtCreate: { errorCode: 2006, message: '토큰 발급에 문제가 발생했습니다.' }, // 400
  JwtServerException: {
    errorCode: 2007,
    message: '토큰 인증에 문제가 발생했습니다.',
  }, // 401
  NoRefreshCookie: {
    errorCode: 2008,
    message: '잘못된 접근입니다.',
  }, // 401
  NoMatchUser: {
    errorCode: 2009,
    message: '사용자 정보를 찾지 못했습니다.',
  }, // 404
  WrongLoginData: {
    errorCode: 2010,
    message: '입력 정보를 다시 확인해주세요.',
  }, // 400

  /* guard, controller */
  ArgsRequired: {
    errorCode: 3000,
    message: '데이터를 확인해주세요.',
  }, // 400
  WrongParamType: {
    errorCode: 3001,
    message: '파라미터를 확인해주세요.',
  }, // 400
  NoMatchOwnRestaurant: {
    errorCode: 3002,
    message: '해당 식당의 점주만 이용 가능합니다.',
  }, // 400

  /* type check */
  MustPositive: {
    errorCode: 4000,
    message: '음수 값은 허용되지 않습니다.',
  },
  NotAllowedPastTime: {
    errorCode: 4001,
    message: '현재 시간보다 과거 시간을 설정 할 수 없습니다.',
  },
  InvalidTimeRange: {
    errorCode: 4002,
    message: '종료시간이 시작 시간보다 과거일 수 없습니다.',
  },
} as const;
export type Protocol = (typeof Protocol)[keyof typeof Protocol];

export type ErrorType = {
  errorCode: number;
  message: string;
};
