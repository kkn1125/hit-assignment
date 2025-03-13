import { LOG_LEVEL, RUN_MODE } from '@common/variables/environment';
import { Injectable } from '@nestjs/common';
import dayjs from 'dayjs';

type LogMethod = (...messages: any) => void;

@Injectable()
export class LoggerService {
  // private readonly isOutput = RUN_MODE !== 'production';
  private context: string = 'System';
  private levels = ['log', 'info', 'debug', 'warn', 'error'] as const;
  private icons = ['📄', '✨', '🐛', '⚠️', '❌'] as const;

  log!: LogMethod;
  info!: LogMethod;
  error!: LogMethod;
  warn!: LogMethod;
  debug!: LogMethod;

  constructor() {
    this.update();
  }

  setContext<T extends object | string>(context: T) {
    if (typeof context === 'string') {
      this.context = context;
    } else {
      this.context = context.constructor.name;
    }
    this.update();
  }

  update() {
    for (const level of this.levels) {
      const index = this.levels.indexOf(level);
      const icon = this.icons[index];

      Object.defineProperty(this, level, {
        get() {
          // if (!this.isOutput) return () => {};
          if (index >= LOG_LEVEL) return () => {};
          return console[level].bind(
            this,
            `${icon} [${level.toUpperCase()}] ${this.timestamp} --`,
          ) as LogMethod;
        },
        configurable: true,
      });
    }
  }

  private get timestamp() {
    return dayjs().format('HH:mm.ss.SSS');
  }
}
