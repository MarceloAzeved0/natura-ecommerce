import { InMemoryUserRepository } from '@/infra/database/in-memory/repositories/user/in-memory.user.repository';
import {
  GetOrCreateUserUseCase,
  GetOrCreateUserUseCaseRequest,
} from '@/application/use-cases/user/get-or-create.use-case';

describe('CreateUserUseCase', () => {
  it('should create a user', async () => {
    const userRepo = new InMemoryUserRepository();
    const createUserUseCase = new GetOrCreateUserUseCase(userRepo);

    const request: GetOrCreateUserUseCaseRequest = {
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
