import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';
import { UpdateUserDto } from '../dto/update-user.dto';

//Se todos os métodos de Classe abstrata forem sem corpo, ela se torna uma inteface.
//Substituindo "abstract", na declaração da classe por "interface", e excuindo "abstract" em frente dos métodos. Nada muda.
export abstract class UsersRepository {
  abstract create(data: CreateUserDto): Promise<User> | User;
  abstract findAll(): Promise<User[]> | User[];
  abstract findOne(id: string): Promise<User> | User;
  abstract update(id: string, data: UpdateUserDto): Promise<User> | User;
  abstract delete(id: string): Promise<void> | void;
}
