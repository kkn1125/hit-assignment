# HIT Restaurant API

에이치아이티 식당(가명)을 위한 API 제작

1. 개발 환경
2. 설치 및 실행
3. API 개요

## 개발 환경

- Node.js: v20.11.1
- Npm: v10.9.0
- Windows: 11 home
- MariaDB: 10.1.13
- Vitest: v3.0.8

## 폴더 구조

```plaintext
root/
├── src/  # 애플리케이션 소스 코드
│   ├── auth/  # 인증 관련 모듈
│   ├── common/  # 공통 유틸리티 및 상수
│   ├── database/  # 데이터베이스 설정 및 관련 코드
│   ├── logger/  # 로깅 관련 기능
│   ├── middleware/  # 미들웨어 관련 코드
│   ├── restaurants/  # 레스토랑 관련 기능
│   ├── types/  # 공통 타입 관리
│   ├── users/  # 유저 관련 기능
│   ├── util/  # 유틸리티 기능 모음
│   │   ├── typeorm.ts  # TypeORM 설정 관련 파일
│   │   ├── swagger.ts  # Swagger 설정 파일
│   │   ├── utilFunction.ts  # 공통 유틸리티 함수
│   │   ├── responses.ts  # 공통 응답 포맷
│   │   └── validator.ts  # 검증 로직
│   ├── app.controller.ts  # 앱 컨트롤러
│   ├── app.module.ts  # 앱 모듈
│   ├── app.service.ts  # 앱 서비스
│   └── main.ts  # 메인 부트스트랩 실행
│
├── swagger-publish/  # 스웨거 문서 깃허브 공개용
├── coverage/  # 테스트 커버리지 결과
├── dist/  # 빌드된 파일
├── docs/  # 프로젝트 문서
├── lib/  # 외부 라이브러리
├── sql/  # SQL 관련 쿼리 파일
├── test/  # 테스트 코드
│
├── .dependency-cruiser.js  # 의존성 크루징 설정
├── .env  # 환경변수 파일
├── .env.test  # 테스트 환경변수 파일
├── .gitignore  # Git 무시 목록
├── .prettierrc  # Prettier 설정
├── eslint.config.mjs  # ESLint 설정
├── nest-cli.json  # NestJS CLI 설정
├── package-lock.json  # 패키지 버전 고정 파일
├── package.json  # 프로젝트 메타 정보 및 종속성 관리
├── README.md  # 프로젝트 설명 문서
├── tsconfig.build.json  # TypeScript 빌드 설정
├── tsconfig.json  # TypeScript 설정
└── vitest.config.mjs  # Vitest 설정 파일
```

### 환경변수

```properties
# .env 파일

# 데이터베이스 옵션
DB_USER = <username>
DB_PASS = <password>
DB_HOST = 127.0.0.1
DB_PORT = 3306
DB_NAME = hit_restaurant

# 서버 옵션
PORT = 8080

# 시크릿 키 옵션
# 아래는 openssl을 이용한 base64키입니다.
# 사용자 계정 비밀번호가 해시처리되었기 때문에 아래처럼 공개하여 업로드합니다.

SECRET_HASH_PASSWORD = "NyRqq-BlQO31A_3ip3vCi5s2ezRT1Pg7tiwHA43T3U5cdwudOARQmW8RxbJuLqgfUcE1xWhHaWQ2YI0cSkErIw"
SECRET_ACCESS_TOKEN = "ZrOZ-qTMeZUpnfFD4aJ5ocEcjxl1Q45B4RYIsamRkYJ-Th4SA7LIIJzTJqRKwT58vwuEBROVY_jlyyGH8hkXgw"
SECRET_REFRESH_TOKEN = "bMsc0UxphY7EAK8KcQeNgC5_DsHcBNljrtDbIpXb-TYFgmzjSH2VpOzfy9R-eF6GsWNIgxnpRH5zkG85_6l3rA"

LOG_LEVEL = 2
```

아래는 테스트용 환경변수입니다. 테스트 시 다른 데이터베이스를 사용하고, 실행마다 초기화되기 때문에 별도의 스키마를 사용하도록 합니다.

```properties
# .env.test 파일

# 테스트 데이터베이스
DB_NAME = hit_restaurant_test
```

## 설치 및 실행

소스코드를 다운로드 하거나 git clone을 통해 내려받습니다.

```bash
git clone https://github.com/kkn1125/hit-assignment.git
```

프로젝트 폴더로 이동해서 의존을 설치합니다.

```bash
npm ci
# or
npm install
```

MariaDB가 없으시다면 아래 명령을 참조해주세요. 도커를 사용하고 계시다면 도커를 권장드립니다.

```bash
# Windows
curl -o- https://archive.mariadb.org/mariadb-10.3.13/winx64-packages/mariadb-10.3.13-winx64.msi
# 또는
choco install mariadb --version=10.3.13
# https://community.chocolatey.org/packages/mariadb/10.3.13 참조

# Docker
docker run -it -d -p <port>:3306 -e MYSQL_ROOT_PASSWORD=<password> --name mariadb mariadb:10.3.13

# Mac
brew install mariadb
```

데이터베이스와 npm 설치가 끝났다면 다음과 같이 실행합니다.

```bash
# 개발 버전
npm run start:dev

# 프로덕션
npm run build
npm run start:prod
```

## API 진입점

> 아래 호스팅 API의 경우 cloudtype 특성상 새벽에 서버 다운이 됩니다. 주기적으로 다시 실행 중이며, 접근이 안될 시 연락바랍니다.

- 호스팅 API: https:port-0-hit-assignment-m8ai2uwf803314cf.sel4.cloudtype.app
- API: http://<host>:<port>/api
- 인가: 헤더 Authorization: Bearer <token> 사용

## Swagger 문서

- Swagger Docs (Local): http://<host>:<port>/docs (로컬 실행 시)
- Swagger Docs (GitHub Page): https://kkn1125.github.io/hit-assignment

## 로그인 방식

- Bearer access token 사용한 인증
- cookie를 이용한 refresh token 발급
- refresh 요청을 통한 로그인 연장 (access token 재발급)

## 더미 데이터

더미 데이터는 고객 계정 3개, 점주 계정 2개이며, 식당 정보는 두 가지입니다. 각 식당에 등록된 메뉴는 10가지 내외입니다.

- 유저 아이디
  - tomastrain1, matjung1221, resting0301
- 점주 아이디
  - sushiryu0423, imfinedining
- 공통 비밀번호
  - qweQQ!!1 (대소문자 주의)

\* "sushiryu0423"유저(점주)는 오마카세 식당("스시오마주") 데이터를 가지고 있습니다.  
\* "imfinedining"유저(점주)는 파인다이닝 식당("메종 드 레브") 데이터를 가지고 있습니다.

### SQL 파일

SQL 파일은 더미 데이터 insert가 없는 파일과 있는 파일이 두 가지 있습니다.

루트 경로에서 .sql 디렉토리에 위치합니다.

- dump-hit_restaurant-inlcude-row-data.sql: 더미 데이터 insert 구문 포함
- dump-hit_restaurant-only-structure.sql: 테이블 구조만

## 발생 이슈

과제를 진행하면서 마주했던 이슈와 해결 방향에 대한 내용입니다.

### JWT 로그인 처리 구현

- 문제: json web token(이하 JWT) 구현 시 유지보수와 기능 확장 측면에서 어떤 방식이 더 나은지에 대한 고민
- 고민 과정:
  1. access token(이하 액세스 토큰)을 사용할 때 쿠키, 헤더 중 어디에 포함해서 요청할 것인가?
  2. 액세스 토큰을 미들웨어로 처리할지, 토큰이 필요한 경로마다 가드로 설정할지?
  3. JWT 페이로드에 사용자의 정보를 어디까지 표시할 지?
- 해결 과정:
  1. 헤더에 Authorization키에 Bearer 값으로 토큰을 요청
  2. 미들웨어로 처리하여 모든 경로에서 Authorization헤더 키 검증
     - Authorization키가 헤더에 있다면, JWT 검증 및 유저 존재, 정보 일치 검증, request객체에 user프로퍼티에 사용자 정보 저장
     - 없다면, 미들웨어 통과
  3. JWT에 포함되는 사용자 정보는 식별을 위해 userId와 사용자명, 역할(고객/점주), 휴대전화번호로 제한
- 이유:
  1. 프론트에서 redux나 recoil과 같은 state로 액세스 토큰을 관리 한다는 가정이며, 로컬스토리지 등에 저장하는 것보다 안전할 것으로 판단
  2. Bearer를 전역 미들웨어에서 파싱하는 이유
     1. 각 도메인별 컨트롤러에 가드 사용을 최소화하고 간단한 구조를 만들기 위함
     2. 이후 각 API별 인증이 필요한 경우 권한 검증 Roles 데코레이터에서 로그인을 기본적으로 검증하고, 권한을 검증하기 때문에 파싱과 인증 성격을 분류하기 위함
  3. JWT를 파싱하는 미들웨어에서 데이터베이스 사용자 정보 조회가 매 요청마다 일어난다면 비효율적일 것으로 판단하고 최소한 검증에 필요한 id, userId, username, phone, role 정보를 포함

### ApiResponse, ApiBody 데코레이터 커스텀

- 문제: 스웨거 문서 작성 시 코드가 길어지는 현상으로 인해 커스터마이징 필요성 고민
- 고민 과정:
  1. 기본적으로 제공되는 ApiResponse와 같은 데코레이터에 응답 또는 바디 데이터 예시를 작성할 때 문서 관련 코드가 길어져 가독성이 떨어질 것으로 생각
  2. Dto와 같은 형태로 응답, 바디 데이터를 따로 만들어 import할지?
- 해결 과정:
  1. @nestjs/common에서 제공하는 `applyDecorators`를 사용하여 공통적인 데이터와 포맷을 따로 작성하여 활용
- 이유:
  1. 각 응답과 바디 데이터를 위해 클래스를 별도로 생성하기 보다 하나의 커스텀 데코레이터를 수정하는 편이 효율적이라 판단

### 유틸 함수 및 환경변수 처리

- 문제: 과제 내용 중 파일 구조를 참고하여 유틸 함수에 대해 nest 방식의 주입, import 하여 사용하는 면에 대해 고민
- 고민 과정:
  1. 주입, import는 컨트롤러, 비즈니스 로직 등에 모두 사용 가능
  2. 환경변수 사용 시 상수 파일과 유틸함수 파일 간 dotenv 호출 중복되는 경우 발생
- 해결 과정:
  1. nest의 기능으로 유틸 모듈을 생성하여 글로벌로 적용
  2. 필요한 도메인에 유틸 서비스를 주입받아 사용
- 이유:
  1. 주입을 통해 확장하는 편이 import cost를 줄이며 유연한 관계를 유지할 수 있다고 판단
  2. 유틸 서비스를 이용해 도메인별 서비스단에 주입하여 사용 및 환경변수를 dotenv 호출 중복 없이 사용

### 토큰 검증 및 데이터 존재 여부, 주인 여부 검증

- 문제: 사용자 또는 식당 점주, 예약자 본인 검증을 어떤 방식으로 할지에 대한 고민
- 고민 과정:
  1. 도메인 데이터에 접근, 수정 시 사용자 본인 검증을 가드로 하는게 좋은가?
  2. 데이터의 주인을 검증하기 위해 가드 사용보다 미들웨어에서 검증하게 된다면, 미들웨어만 유지보수만 하면 되지 않을까?
  3. 데이터 존재 여부는 어떤 방식이 유지보수하기에 용이한가?
- 해결 과정:
  1. 오너 가드를 구현
  2. 오너 가드는 식당 도메인(하위 도메인 포함)에 사용
  3. 데이터 존재 검증은 미들웨어에서 2번과 마찬가지로 restaurantId를 사용
- 이유:
  1. 데이터 주인 검증은 일부 API에만 필요하기 때문
  2. 중간 path parameter인 :restaurantId를 통해 파싱된 토큰 정보와 식당 정보를 대조하여 점주인지 판별
  3. 식당 존재를 데이터베이스 조회를 통해 검증, 단, 식당 도메인을 제외한 하위 도메인(메뉴, 예약)에만 사용
