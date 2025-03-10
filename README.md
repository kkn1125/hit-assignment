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

## API 개요

### API 진입점

- API: http://<host>:<port>/api

### Swagger 문서

- Swagger Docs: http://<host>:<port>/docs

### 로그인 방식

- Bearer access token 사용한 인증
- cookie를 이용한 refresh token 발급
- refresh 요청을 통한 로그인 연장 (access token 재발급)

## 특이사항

Notion 문서를 참조하시기 바랍니다.
