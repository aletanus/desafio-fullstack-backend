import { randomUUID } from 'crypto';

export class Contact {
    readonly id: string;
    user_id?: string;
    first_name: string;
    last_name: string;
    nickname: string;
    birthday: string; 
    email: string;
    // phone_number (Casa, Comercial, Principal, Outros)
    // address (Rua, Bairro, Número, Cidade, País, Cep)
    // social Media (Instagram, Facebook, LinkedIn, Outras)
    company: string;
    job_title: string;
    website: string;

    constructor() {
        this.id = randomUUID();
      }
}
