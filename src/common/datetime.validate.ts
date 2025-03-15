import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import dayjs from 'dayjs';

@ValidatorConstraint({ name: 'IsDateTimeAfterNow', async: false })
export class IsDateTimeAfterNowConstraint
  implements ValidatorConstraintInterface
{
  errorMessage!: string;

  validate(datetime: Date, args: ValidationArguments & { message: string }) {
    const isDivTenMinute = dayjs(datetime).minute() % 10 === 0;
    const isPast = dayjs().isSame(datetime) || dayjs(datetime).isBefore();

    if (!isDivTenMinute) {
      this.errorMessage = '시간은 10분 단위로 지정 가능합니다.';
    }
    if (isPast) {
      this.errorMessage = '현재 시간보다 과거의 시간을 지정할 수 없습니다.';
    }

    return isDivTenMinute && !isPast;
  }

  defaultMessage(args: ValidationArguments) {
    return this.errorMessage;
  }
}

export function IsDateTimeAfterNow(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsDateTimeAfterNowConstraint,
    });
  };
}
