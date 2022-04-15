import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class NullFieldsInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(map(this.removeNullFields));
  }

  private removeNullFields(object: any) {
    const removeNull = (object) => {
      if (!object) {
        return object;
      }

      if (Array.isArray(object)) {
        return object.map((i) => removeNull(i));
      }

      return Object.entries(object)
        .filter((entry) => entry[1])
        .reduce((acc, entry) => ({ ...acc, [entry[0]]: entry[1] }), {});
    };

    return removeNull(object);
  }
}
