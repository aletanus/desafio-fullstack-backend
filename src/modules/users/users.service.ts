import { ConflictException, Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './repositories/user.repository';
import { v2 as cloudinary } from 'cloudinary';
import { unlink } from 'node:fs';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto) {
    const findUser = await this.usersRepository.findByEmail(createUserDto.email);
    if (findUser) {
      throw new ConflictException('User already exists');
    }
    const user = await this.usersRepository.create(createUserDto);
    return user;
  }

  async findAll() {
    const users = await this.usersRepository.findAll();
    return users;
  }

  async findOne(id: string) {
    const user = await this.usersRepository.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findByEmail(email: string) {
    const user = await this.usersRepository.findByEmail(email);
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const findUser = await this.usersRepository.findOne(id);
    if (!findUser) {
      throw new NotFoundException('User not found');
    }
    const user = await this.usersRepository.update(id, updateUserDto);
    return user;
  }

  async remove(id: string) {
    const findUser = await this.usersRepository.findOne(id);
    if (!findUser) {
      throw new NotFoundException('User not found');
    }
    await this.usersRepository.delete(id);
    return;
  }

  async uploadFile(profile_photo: Express.Multer.File, id: string) {
    if (!profile_photo) {
      throw new BadRequestException('No file uploaded');
    }

    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
    });

    const findUser = await this.usersRepository.findOne(id);

    if (!findUser) {
      throw new NotFoundException('User not found');
    }

    const uploadImage = await cloudinary.uploader.upload(profile_photo.path, { resource_type: 'image' });

    console.log({ uploadImage });

    const updateUser = await this.usersRepository.update(id, {
      profile_photo: uploadImage.secure_url,
    });

    unlink(profile_photo.path, (error) => {
      if (error) console.log(error);
    });

    return updateUser;
  }
}
