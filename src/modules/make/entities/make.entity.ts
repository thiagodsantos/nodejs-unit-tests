import { Exclude } from "class-transformer";
import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { CreateDTO } from "@modules/make/dto/create.dto";
import { UpdateDTO } from "@modules/make/dto/update.dto";

@Entity({ name: 'make' })
export class MakeEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;
  
  @Exclude()
  @DeleteDateColumn()
  deletedAt: Date | null;
  
  fromCreateDTO(createDTO: CreateDTO) {
    this.name = createDTO.name;
  }
  
  fromUpdateDTO(updateDTO: UpdateDTO) {
    this.name = updateDTO.name;
  }
}
