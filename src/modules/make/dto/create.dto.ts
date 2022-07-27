import { IsNotEmpty, MinLength } from "class-validator";

export class CreateDTO {
  @IsNotEmpty()
  @MinLength(2, { message: 'Name is too short. Minimal $constraint1, received $value' })
  name: string;
}