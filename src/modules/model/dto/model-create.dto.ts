import { IsNotEmpty } from "class-validator";
import { Expose } from "class-transformer";

export class ModelCreateDTO {
  @IsNotEmpty()
  @Expose({ name: 'id_make' })
  idMake: string;
  
  @IsNotEmpty()
  name: string;
}