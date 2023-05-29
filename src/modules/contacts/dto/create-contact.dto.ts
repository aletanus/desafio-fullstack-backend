import { IsString, IsNotEmpty, IsEmail, MinLength, IsOptional, Matches } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateContactDto {

    @IsString()
    @IsNotEmpty()
    user_id?: string;

    @IsString()
    @IsNotEmpty()
    first_name: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    last_name: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    nickname: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    birthday: string;

    @IsOptional()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    // phone_number (Casa, Comercial, Principal, Outros)
    // address (Rua, Bairro, Número, Cidade, País, Cep)
    // social Media (Instagram, Facebook, LinkedIn, Outras)
    
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    company: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    job_title: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    website: string;
}
