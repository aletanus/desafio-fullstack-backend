import { CreateContactDto } from '../dto/create-contact.dto';
import { UpdateContactDto } from '../dto/update-contact.dto';
import { Contact } from '../entities/contact.entitie';

export abstract class ContactsRepository {

    abstract create(data: CreateContactDto, userId: string): Promise<Contact>;
    abstract findAll(group: string | undefined): Promise<Contact[] | object>
    abstract findOne(id: string): Promise<Contact | undefined>;
    abstract findByPhoneNumber(phoneNumber: string): Promise<Contact> | Contact;
    abstract update(id: string, data: UpdateContactDto): Promise<Contact> | Contact;
    abstract delete(id: string): Promise<void> | void;
}