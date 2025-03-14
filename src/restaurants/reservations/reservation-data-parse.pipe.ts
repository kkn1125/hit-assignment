import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { Protocol } from '@util/protocol';
import { isEmptyObject } from '@util/utilFunction';
import dayjs from 'dayjs';
import { CreateReservationDto } from './dto/create-reservation.dto';

@Injectable()
export class ReservationDataParsePipe implements PipeTransform {
  transform(value: CreateReservationDto, metadata: ArgumentMetadata) {
    const isNoData = !value || isEmptyObject(value);
    if (isNoData) {
      const errorProtocol = Protocol.ArgsRequired;
      throw new BadRequestException(errorProtocol);
    }

    /* phone은 입력, 기존 유저의 phone을 사용하기 위해 서비스에서 처리 */
    const { reserveStartAt, reserveEndAt, amount, menu } = value;

    if (amount <= 0) {
      const errorProtocol = Protocol.MustPositive;
      throw new BadRequestException(errorProtocol);
    }

    if (dayjs(reserveStartAt).isBefore(dayjs())) {
      const errorProtocol = Protocol.NotAllowedPastTime;
      throw new BadRequestException(errorProtocol);
    }

    if (dayjs(reserveEndAt).isBefore(reserveStartAt)) {
      const errorProtocol = Protocol.InvalidTimeRange;
      throw new BadRequestException(errorProtocol);
    }

    /* 메뉴 존재 여부 검증은 서비스에서 처리 */
    if (menu.length === 0) {
      const errorProtocol = Protocol.ArgsRequired;
      throw new BadRequestException(errorProtocol, {
        cause: '메뉴를 선택해주세요.',
      });
    }

    return value;
  }
}
