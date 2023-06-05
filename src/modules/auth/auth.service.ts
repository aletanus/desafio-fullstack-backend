import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsersService } from '../users/users.service';
import { compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
 
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ){}

  async validateUser(userEmail: string, userPassword: string){
    const user = await this.userService.findByEmail(userEmail)    
    if(user){
      const passwordMatch = await compare(userPassword, user.password);
      if(passwordMatch) {
        return { email: user.email };
      }
    }
    return null;
  }

  async login(email: string) {
    const user = await this.userService.findByEmail(email);
    return {
      token: this.jwtService.sign({ email }, { subject: user.id }),
      id: user.id
    };
  }

  // create(createAuthDto: CreateAuthDto) {
  //   return 'This action adds a new auth';
  // }

  // findAll() {
  //   return `This action returns all auth`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} auth`;
  // }

  // update(id: number, updateAuthDto: UpdateAuthDto) {
  //   return `This action updates a #${id} auth`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} auth`;
  // }
}
