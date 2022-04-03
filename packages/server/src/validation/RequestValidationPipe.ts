import { ArgumentMetadata, BadRequestException, Logger, PipeTransform, ValidationError } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";

export class RequestValidationPipe implements PipeTransform {

    async transform(value: any, metadata: ArgumentMetadata) {
        if(!value){
            throw new BadRequestException()
        }

        const { metatype} = metadata;

        const object = plainToInstance(metatype, value)

        const errors: ValidationError[] = await validate(object);

        if(errors.length > 0){
            throw new BadRequestException(parseToValidationMessageResponse(errors));
        }

        return value;
    }
    
}

function parseToValidationMessageResponse(errors: ValidationError[]): any {
    return errors.flatMap((error: ValidationError) => {
        
        const property = error.property;
        const constraints = error.constraints;

        return Object.values(constraints)
            .map((errorMessage) => {
                return {
                    property: property,
                    message: errorMessage
                }
            })
    });
}
