import { randomUUID } from 'crypto';

export class Contact {

  readonly id: string;
  user_id?: string;
  first_name: string;
  last_name: string | null;
  nickname: string | null;
  birthday: string | null; 
  email: string | null;
  phone_number: string;
  phone_number_category: string;
  address: string | null;
  social_media: string | null;
  social_media_name: string;
  company: string | null;
  job_title: string | null;
  website: string | null;

  constructor() {
    this.id = randomUUID();
  }
}
