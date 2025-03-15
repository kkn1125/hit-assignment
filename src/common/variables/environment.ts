import * as dotenv from 'dotenv';
import * as path from 'path';
import * as pkg from '../../../package.json';

export const RUN_MODE = process.env.NODE_ENV ?? 'production';

dotenv.config({
  path: path.join(path.resolve(), '.env'),
});
dotenv.config({
  path: path.join(path.resolve(), `.env.${RUN_MODE}`),
  override: true,
});

export const VERSION = pkg.version ?? '0.0.1';
export const PORT = +(process.env.PORT ?? 8080);
export const SECRET_HASH_PASSWORD = process.env.SECRET_HASH_PASSWORD as string;
export const SECRET_ACCESS_TOKEN = process.env.SECRET_ACCESS_TOKEN as string;
export const SECRET_REFRESH_TOKEN = process.env.SECRET_REFRESH_TOKEN as string;
export const SWAGGER_URL =
  RUN_MODE === 'development'
    ? 'http://localhost:8080'
    : 'http:43.201.15.151:8080';
export const API_PATH = '/api';
export const DB_USER = process.env.DB_USER as string;
export const DB_PASS = process.env.DB_PASS as string;
export const DB_HOST = process.env.DB_HOST as string;
export const DB_PORT = +(process.env.DB_PORT ?? 3306);
export const DB_NAME = process.env.DB_NAME as string;

export const PER_PAGE = 10;
export const DEFAULT_PAGE = 1;
export const LOG_LEVEL = +(process.env.LOG_LEVEL ?? 5);
export const EXAMPLE_JWT =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcklkIjoidGVzdHVzZXIxIiwiZW1haWwiOiJ0ZXN0dXNlcjFAZXhhbXBsZS5jb20iLCJyb2xlIjoxLCJwaG9uZSI6IjAxMC0yMTM0LTE1MzQiLCJpYXQiOjE3NDE5MjAzNjQsImV4cCI6MTc0MTkyMDY2NCwiaXNzIjoiSGl0UmVzdGF1cmFudCJ9.scLKEQA5nszs3faE69WWIcMoE0v96fg2GZRougoY6AI';
