import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { ContactsRepository } from './repositories/contact.repository';

@Injectable()
export class ContactsService {

  constructor(private contactRepository: ContactsRepository){}

  async create(createContactDto: CreateContactDto, userId: string) {
    const findContact = await this.contactRepository.findByPhoneNumber(createContactDto.phone_number);
    if (findContact) {
      throw new ConflictException('Contact already exists');
    } 
    const contact = await this.contactRepository.create(createContactDto, userId);
    return contact;
  }

  async findAll(group: string | undefined) {
    return this.contactRepository.findAll(group);
  }

  async findOne(id: string) {
    const contact = await this.contactRepository.findOne(id)
    if (!contact){
      throw new NotFoundException('Contact not found');
    } 
    return contact;
  }

  async update(id: string, updateContactDto: UpdateContactDto) {
    const findContact = await this.contactRepository.findOne(id);
    if (!findContact){
      throw new NotFoundException('Contact not found');
    }
    const contact = await this.contactRepository.update(id, updateContactDto);
    return contact
  }

  async remove(id: string) {
        const findContact = await this.contactRepository.findOne(id);
    if (!findContact){
      throw new NotFoundException('Contact not found');
    } 
    await this.contactRepository.delete(id);
    return;
  }
}
