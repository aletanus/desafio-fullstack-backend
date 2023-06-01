import { Injectable } from "@nestjs/common";
import { ContactsRepository } from "../contact.repository";
import { CreateContactDto } from "../../dto/create-contact.dto";
import { Contact } from "../../entities/contact.entitie";
import { UpdateContactDto } from "../../dto/update-contact.dto";
import { plainToInstance } from "class-transformer";

@Injectable()
export class ContactsInMemoryRepository implements ContactsRepository {
    
    private database: Contact[] = [];
    
    async create(data: CreateContactDto): Promise<Contact> {
        const newContact = new Contact();
        Object.assign(newContact, {
            ...data,
            last_name: data.last_name || null,
            nickname: data.nickname || null,
            birthday: data.birthday || null, 
            email: data.email || null,
            address: data.address || null,
            social_media: data.social_media || null,
            company: data.company || null,
            job_title: data.job_title || null,
            website: data.website || null
        });
        this.database.push(newContact);
        return newContact;
    }

    private groupBy(contact: Contact[], key: string){
        return contact.reduce((acc, cur) => {
            (acc[cur[key]] = acc[cur[key]] || []).push(cur)
            return acc;
        }, {})
    }
    
    async findAll(group: string): Promise<object | Contact[]> {
        if (group) {
            return this.groupBy(this.database, group);
        }
        return this.database;
    }

    async findOne(id: string): Promise<Contact> {
        const contact = this.database.find(contact => contact.id === id);
        return contact;
    }

    findByPhoneNumber(phone_number: string): Contact | Promise<Contact> {
        const contact = this.database.find((contact) => contact.phone_number === phone_number);
        return plainToInstance(Contact, contact);
    }

    update(id: string, data: UpdateContactDto): Contact | Promise<Contact> {
        const contactIndex = this.database.findIndex((contact) => contact.id === id)
        this.database[contactIndex] = {
          ...this.database[contactIndex],
          ...data
        }
        return plainToInstance(Contact, this.database[contactIndex])
    }

    delete(id: string): void | Promise<void> {
        const contactIndex = this.database.findIndex((contact) => contact.id === id)
        this.database.splice(contactIndex, 1)
    }
} 