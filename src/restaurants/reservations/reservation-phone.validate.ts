import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'IsPhoneNumberFormat', async: false })
export class IsPhoneNumberFormatConstraint
  implements ValidatorConstraintInterface
{
  validate(phone: any, args: ValidationArguments) {
    if (!phone) return false; // 값이 없으면 검증 실패
    const phoneNumberFormat =
      /\b(\d{3}-\d{4}-\d{4}|\d{2}-\d{4}-\d{4}|\d{2}-\d{3,4}-\d{4})/;
    if (!phone.match(phoneNumberFormat)) {
      return false;
    }
    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.value}는 전화번호 형식이 아닙니다. 하이픈이 연결된 ###-####-#### 형식만 가능합니다.`;
  }
}

export function IsPhoneNumberFormat(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsPhoneNumberFormatConstraint,
    });
  };
}
