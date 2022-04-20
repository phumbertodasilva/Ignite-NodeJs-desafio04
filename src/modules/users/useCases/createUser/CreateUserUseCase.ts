import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  name: string;
  email: string;
}

class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ email, name }: IRequest): User {
    const userExists = this.usersRepository.findByEmail(email);

    if (userExists) {
      // email já cadastrado
      throw new Error("E-mail already registered");
    }

    return this.usersRepository.create({ name, email });
  }
}

export { CreateUserUseCase };
