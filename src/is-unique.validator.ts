import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
  } from 'class-validator';
  import { Injectable } from '@nestjs/common';
  import { PrismaService } from 'src/prisma/prisma.service';
  
  @ValidatorConstraint({ async: true })
  @Injectable()
  export class IsUniqueConstraint implements ValidatorConstraintInterface {
    constructor(private readonly prisma: PrismaService) {}
  
    async validate(value: any, args: ValidationArguments): Promise<boolean> {
      const [modelName, field] = args.constraints;
      const model = (this.prisma as any)[modelName];
  
      if (!model || typeof model.findFirst !== 'function') {
        throw new Error(`Invalid model or method: ${modelName}.findFirst`);
      }
  
      const existing = await model.findFirst({
        where: { [field]: value },
      });
  
      return !existing;
    }
  
    defaultMessage(args: ValidationArguments): string {
      const [, field] = args.constraints;
      return `${field} must be unique`;
    }
  }
  
  export function IsUnique(
    model: string,
    field: string,
    validationOptions?: ValidationOptions,
  ) {
    return function (object: Object, propertyName: string) {
      registerDecorator({
        name: 'isUnique',
        target: object.constructor,
        propertyName,
        options: validationOptions,
        constraints: [model, field],
        validator: IsUniqueConstraint,
      });
    };
  }
  