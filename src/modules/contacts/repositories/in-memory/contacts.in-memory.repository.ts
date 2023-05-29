import { Injectable } from "@nestjs/common";
import { ContactsRepository } from "../contact.repository";
import { CreateContactDto } from "../../dto/create-contact.dto";
import { Contact } from "../../entities/contact.entitie";

@Injectable()
export class ContactsInMemoryRepository implements ContactsRepository {
    
    private database: Contact[] = [];
    
    async create(data: CreateContactDto): Promise<Contact> {
        const newContact = new Contact();
        Object.assign(newContact, {
            ...data
        });
        this.database.push(newContact);
        return newContact;
    }

    async findOne(id: string): Promise<Contact> {
        const contact = this.database.find(contact => contact.id === id);
        return contact;
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
} 