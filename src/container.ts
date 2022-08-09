import { container } from 'tsyringe';
import { MakeRepositoryToken } from '@modules/make/repositories/make.repository';
import { ModelRepositoryToken } from "@modules/model/repositories/model.repository";
import { MakeRepository } from '@modules/make/infrastructure/typeorm/make.repository';
import { ModelRepository } from "@modules/model/infrastructure/typeorm/model.repository";
import { MakeService } from '@modules/make/services/make.service';
import { ModelService } from "@modules/model/services/model.service";

// Repositories
container.register(MakeRepositoryToken, { useClass: MakeRepository });
container.register(ModelRepositoryToken, { useClass: ModelRepository });

// Services
container.register(MakeService, {
  useValue: new MakeService(container.resolve(MakeRepositoryToken))
});
container.register(ModelService, {
  useValue: new ModelService(container.resolve(ModelRepositoryToken), container.resolve(MakeRepositoryToken))
});

export default container;