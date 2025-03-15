import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { Protocol } from '@util/protocol';

@Injectable()
export class ReservationAmountParsePipe implements PipeTransform {
  transform(value: number | number[], metadata: ArgumentMetadata) {
    if (!metadata.metatype) {
      return value;
    }

    if (!Array.isArray(value)) {
      const errorProtocol = Protocol.TypeCheck;
      throw new BadRequestException(errorProtocol, {
        cause: '예약 인원 검색에 두개의 amount 파라미터가 필요합니다.',
      });
    }

    if (value.some((item) => Number.isNaN(+item))) {
      const errorProtocol = Protocol.TypeCheck;
      throw new BadRequestException(errorProtocol, {
        cause: '예약 인원 수는 정수로 구성되어야 합니다.',
      });
    }

    if (typeof value === 'undefined') {
      return value;
    }

    return value.map(Number);
  }
}
