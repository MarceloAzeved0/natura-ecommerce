import { InMemoryUserRepository } from '@/infra/database/in-memory/repositories/user/in-memory.user.repository';
import {
  FindByIdUserUseCase,
  FindByIdUserUseCaseRequest,
} from '@/application/use-cases/user/findById.use-case';
import { User } from '@/application/entities/user';

describe('FindByIdUserUseCase', () => {
  it('should findById a user', async () => {
    const userRepo = new InMemoryUserRepository();

    const dataUser = { email: 'user@example.com', name: 'user' };

    const createdUser = await userRepo.create(new User(dataUser));
    const findByIdUserUseCase = new FindByIdUserUseCase(userRepo);

    const request: FindByIdUserUseCaseRequest = {
      id: createdUser.id,
    };

    const response = await findByIdUserUseCase.execute(request);

    expect(response.id).toEqual(request.id);
    expect(response.name).toEqual(dataUser.name);
    expect(response.email).toEqual(dataUser.email);
    expect(response.createdAt).toBeInstanceOf(Date);
    expect(response.updatedAt).toBeInstanceOf(Date);
  });

  it('return undefined when not found user', async () => {
    const userRepo = new InMemoryUserRepository();

    const findByIdUserUseCase = new FindByIdUserUseCase(userRepo);

    const request: FindByIdUserUseCaseRequest = {
      id: 0,
    };

    const response = await findByIdUserUseCase.execute(request);

    expect(response).toBe(undefined);
  });
});
