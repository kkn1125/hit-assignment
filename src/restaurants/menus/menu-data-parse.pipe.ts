import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { Protocol } from '@util/protocol';
import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { CreateMenuDto } from './dto/create-menu.dto';

@Injectable()
export class MenuDataParsePipe implements PipeTransform {
  async transform(value: CreateMenuDto, metadata: ArgumentMetadata) {
    if (!metadata.metatype) {
      return value;
    }

    const menuValidate = async (menu) => {
      const object = plainToInstance(CreateMenuDto, menu);
      const errors = await validate(object, { stopAtFirstError: true });
      if (errors.length > 0) {
        const messages = this.getFlatErrorConstraints(errors);
        const errorProtocol = Protocol.ArgsRequired;
        throw new BadRequestException(errorProtocol, { cause: messages });
      }
    };

    if (Array.isArray(value)) {
      for (const item of value) {
        await menuValidate(item);
      }
    } else {
      await menuValidate(value);
    }

    return value;
  }

  private getFlatErrorConstraints(errors: ValidationError[]) {
    return errors.map((err) => Object.values(err.constraints || {})).flat();
  }
}
