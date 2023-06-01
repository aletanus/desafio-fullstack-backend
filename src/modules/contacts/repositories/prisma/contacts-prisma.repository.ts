import { Injectable } from "@nestjs/common";
import { ContactsRepository } from "../contact.repository";
import { CreateContactDto } from "../../dto/create-contact.dto";
import { UpdateContactDto } from "../../dto/update-contact.dto";
import { Contact } from "../../entities/contact.entitie";
import { PrismaService } from "src/database/prisma.service";

@Injectable()

export class ContactsPrismaRepository implements ContactsRepository {
    
    constructor(private prisma: PrismaService) {}
    
    async create(data: CreateContactDto, userId: string): Promise<Contact> {

        const contact = new Contact();
        Object.assign(contact, {
            ...data,
        });

        const newContact = await this.prisma.contact.create({
            data: {
                id: contact.id,
                first_name: contact.first_name,   
                last_name: contact.last_name,
                nickname: contact.nickname,
                birthday: contact.birthday, 
                email: contact.email,
                phone_number: contact.phone_number,
                phone_number_category: data.phone_number_category,
                address: contact.address,
                social_media: contact.social_media,
                social_media_name: data.social_media_name,
                company: contact.company,
                job_title: contact.job_title,
                website: contact.website,
                user: { connect: { id: userId } },
            },
        });
        return newContact;
    }

    private groupby(contacts: Contact[], key: string) {
        return contacts.reduce((acc, cur) => {
          (acc[cur[key]] = acc[cur[key]] || []).push(cur);
          return acc;
        }, {});
      }

    async findAll(group: string): Promise<object | Contact[]> {
        const contacts = await this.prisma.contact.findMany();
        if (group) {
            return this.groupby(contacts, group);
        }
        return contacts;
    }

    async findOne(id: string): Promise<Contact> {
        const contact = await this.prisma.contact.findUnique({
            where: { id },
        });
        return contact;
    }

    async findByPhoneNumber(phoneNumber: string): Promise<Contact> {
        const contact = await this.prisma.contact.findUnique({
            where: { phone_number: phoneNumber},
        });
        return contact;
    }

    async update(id: string, data: UpdateContactDto): Promise<Contact> {
        const contact = await this.prisma.contact.update({
            where: { id },
            data,
        });
        return contact;
    }

    async delete(id: string): Promise<void> {
        const contact = await this.prisma.contact.delete({
            where: { id },
        });
        return;
    }
}