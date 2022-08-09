import { Column, Entity, OneToOne, PrimaryGeneratedColumn, JoinColumn, DeleteDateColumn, ManyToOne } from "typeorm";
import { MakeEntity } from "@modules/make/entities/make.entity";
import { Exclude } from "class-transformer";
import { ModelCreateDTO } from "@modules/model/dto/model-create.dto";
import { ModelUpdateDTO } from "@modules/model/dto/model-update.dto";

@Entity({ name: 'model' })
export class ModelEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @Column()
  name: string;
  
  @Exclude()
  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
  
  @Column({ name: 'id_make' })
  idMake: string;
  
  @ManyToOne(() => MakeEntity, make => make.models)
  @JoinColumn({ name: 'id_make', referencedColumnName: 'id' })
  make: MakeEntity;
  
  fromCreateDTO(createDTO: ModelCreateDTO) {
    this.idMake = createDTO.idMake;
    this.name = createDTO.name;
  }
  
  fromUpdateDTO(updateDTO: ModelUpdateDTO) {
    this.idMake = updateDTO.idMake;
    this.name = updateDTO.name;
  }
}