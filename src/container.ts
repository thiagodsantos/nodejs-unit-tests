import { container } from 'tsyringe';
import { MakeRepositoryName } from "@modules/make/repositories/make.repository";
import { MakeRepository } from "@modules/make/infrastructure/typeorm/make.repository";
import { MakeService } from "@modules/make/services/make.services";

// Repositories
container.register(MakeRepositoryName, { useClass: MakeRepository });

// Services
container.register(MakeService, { useValue: new MakeService(container.resolve(MakeRepositoryName)) });

export default container;