import { Exclude } from 'class-transformer';
import { Column, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { MakeCreateDTO } from '@modules/make/dto/make-create.dto';
import { MakeUpdateDTO } from '@modules/make/dto/make-update.dto';
import { ModelEntity } from "@modules/model/entities/model.entity";

@Entity({ name: 'make' })
export class MakeEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;
  
  @OneToMany(() => ModelEntity, model => model.make)
  models: ModelEntity;
  
  @Exclude()
  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date | null;
  
  fromCreateDTO(createDTO: MakeCreateDTO) {
    this.name = createDTO.name;
  }
  
  fromUpdateDTO(updateDTO: MakeUpdateDTO) {
    this.name = updateDTO.name;
  }
}
