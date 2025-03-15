import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { Protocol } from '@util/protocol';

@Injectable()
export class NumberArrayParsePipe implements PipeTransform {
  transform(value: number | number[], metadata: ArgumentMetadata) {
    if (!metadata.metatype) {
      return value;
    }

    if (typeof value === 'undefined') {
      return value;
    }

    if (!Array.isArray(value)) {
      const errorProtocol = Protocol.TypeCheck;
      throw new BadRequestException(errorProtocol, {
        cause: `두개의 ${metadata.data} 파라미터가 필요합니다.`,
      });
    }

    if (value.some((item) => Number.isNaN(+item))) {
      const errorProtocol = Protocol.TypeCheck;
      throw new BadRequestException(errorProtocol, {
        cause: '정수로 입력되어야 합니다.',
      });
    }

    return value.map(Number);
  }
}
