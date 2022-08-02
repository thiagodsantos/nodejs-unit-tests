import { container } from 'tsyringe';
import { MakeRepositoryToken } from "@modules/make/repositories/make.repository";
import { MakeRepository } from "@modules/make/infrastructure/typeorm/make.repository";
import { MakeService } from "@modules/make/services/make.services";

// Repositories
container.register(MakeRepositoryToken, { useClass: MakeRepository });

// Services
container.register(MakeService, { useValue: new MakeService(container.resolve(MakeRepositoryToken)) });

export default container;