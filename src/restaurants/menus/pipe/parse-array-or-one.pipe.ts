import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { Protocol } from '@util/protocol';

@Injectable()
export class ParseArrayOrOnePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (Array.isArray(value)) {
      if (value.length === 0) {
        const errorProtocol = Protocol.ArgsRequired;
        throw new BadRequestException(errorProtocol);
      }
    }

    if (Object.keys(value).length === 0) {
      const errorProtocol = Protocol.ArgsRequired;
      throw new BadRequestException(errorProtocol);
    }

    return value;
  }
}
