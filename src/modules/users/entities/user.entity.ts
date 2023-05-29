import { Exclude } from 'class-transformer';
import { randomUUID } from 'crypto';

export class User {
  readonly id: string;
  readonly created_at: Date;
  name: string;
  email: string;
  birthday?: string;
  mobile_phone?: string;
  profile_photo?: string;

  @Exclude()
  password: string;

  constructor() {
    this.id = randomUUID();
    this.created_at = new Date();
  }
}
