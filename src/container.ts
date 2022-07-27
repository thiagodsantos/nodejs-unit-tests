import { container } from 'tsyringe';
import { MakeRepositoryName } from "@modules/make/repositories/make.repository";
import { MakeRepository } from "@modules/make/infrastructure/typeorm/make.repository";

container
  .register(MakeRepositoryName, { useClass: MakeRepository })

export default container;