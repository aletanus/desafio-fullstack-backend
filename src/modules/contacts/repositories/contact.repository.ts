import { CreateContactDto } from '../dto/create-contact.dto';
import { Contact } from '../entities/contact.entitie';

export abstract class ContactsRepository {
  
    abstract create(data: CreateContactDto): Promise<Contact>;
    abstract findOne(id: string): Promise<Contact | undefined>;
    abstract findAll(group: string | undefined): Promise<Contact[] | object>
}