import { InMemoryUserRepository } from '@/infra/database/in-memory/repositories/user/in-memory.user.repository';
import {
  CreateUserUseCase,
  CreateUserUseCaseRequest,
} from '@/application/use-cases/user/create.use-case';

describe('CreateUserUseCase', () => {
  it('should create a user', async () => {
    const userRepo = new InMemoryUserRepository();
    const createUserUseCase = new CreateUserUseCase(userRepo);

    const request: CreateUserUseCaseRequest = {
      email: 'user@example',
      name: 'John Smith',
    };

    // when
    const response = await createUserUseCase.execute(request);

    // then
    expect(response.email).toEqual(request.email);
    expect(response.name).toEqual(request.name);
    expect(response.createdAt).toBeInstanceOf(Date);
    expect(response.updatedAt).toBeInstanceOf(Date);
  });
});
