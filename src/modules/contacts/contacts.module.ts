import { Module } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { ContactsController } from './contacts.controller';
import { ContactsRepository } from './repositories/contact.repository';
import { ContactsInMemoryRepository } from './repositories/in-memory/contacts.in-memory.repository';

@Module({
  controllers: [ContactsController],
  providers: [
    ContactsService,
    {
      provide: ContactsRepository,
      useClass: ContactsInMemoryRepository,
    },
  ],
})
export class ContactsModule {}
