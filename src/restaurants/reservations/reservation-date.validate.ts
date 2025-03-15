import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import dayjs from 'dayjs';
import { CreateReservationDto } from './dto/create-reservation.dto';

@ValidatorConstraint({ name: 'IsAfterStartTime', async: false })
export class IsAfterStartTimeConstraint
  implements ValidatorConstraintInterface
{
  errorMessage!: string;

  validate(endTime: Date, args: ValidationArguments) {
    const object = args.object as CreateReservationDto;

    const diffMinute = dayjs(endTime).diff(object.reserveStartAt, 'minute');
    const isMinuteSmall = diffMinute < 30;
    const isAfterStart =
      dayjs(endTime).isSame(object.reserveStartAt, 'minute') ||
      dayjs(endTime).isAfter(object.reserveStartAt);
    const isAnotherDay = !dayjs(endTime).isSame(object.reserveStartAt, 'd');

    if (isAnotherDay) {
      this.errorMessage = '예약일은 같은 날 0시 ~ 23시 내로 설정 가능합니다.';
    }

    if (isMinuteSmall) {
      this.errorMessage = '시작과 종료 시간은 최소 30분의 간격이 필요합니다.';
    }

    if (!isAfterStart) {
      this.errorMessage = '예약 종료 시간은 시작 시간보다 과거일 수 없습니다.';
    }

    return !isAnotherDay && !isMinuteSmall && isAfterStart;
  }

  defaultMessage(args: ValidationArguments) {
    return this.errorMessage;
  }
}

export function IsAfterStartTime(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsAfterStartTimeConstraint,
    });
  };
}
