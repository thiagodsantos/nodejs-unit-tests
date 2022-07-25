import { Container } from 'inversify';
import { MakeRepositoryInterface, MakeRepositoryIdentifier } from '@modules/make/repositories/make.repository'
import { MakeRepository } from "@modules/make/external/database/make.repository";
import { MakeService } from "@modules/make/services/make.services";

const container = new Container();
container.bind<MakeService>(MakeService.name).to(MakeService);
container.bind<MakeRepositoryInterface>(MakeRepositoryIdentifier).to(MakeRepository);

export { container }