import { Injectable } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { ContactsRepository } from './repositories/contact.repository';

@Injectable()
export class ContactsService {
  
  constructor(private contactRepository: ContactsRepository){}

  async create(createContactDto: CreateContactDto) {
    const contact = await this.contactRepository.create(createContactDto);
    return contact;
  }

  async findAll(group: string | undefined) {
    return this.contactRepository.findAll(group);
  }

  async findOne(id: string) {
    const findContact = await this.contactRepository.findOne(id)
    return findContact;
  }

  // async update(id: number, updateContactDto: UpdateContactDto) {
  //   return `This action updates a #${id} contact`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} contact`;
  // }
}
