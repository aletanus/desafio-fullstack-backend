import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail, IsOptional, Matches, IsEnum } from 'class-validator';

export enum PhoneNumberCategory {
    HOME = 'home',
    COMMERCIAL = 'commercial',
    PRINCIPAL = 'principal',
    OTHERS = 'others',
    PERSONAL = "personal"
}

export enum SocialMediaName {
    FACEBOOK = 'facebook',
    TWITTER = 'twitter',
    INSTAGRAM = 'instagram',
    YOUTUBE = 'youtube',
    LINKEDIN = 'linkedin',
}

export class CreateContactDto {
    // @IsString()
    // @IsNotEmpty()
    // user_id?: string;

    @ApiProperty({ required: true })
    @IsString()
    @IsNotEmpty()
    first_name: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    last_name: string | null;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    nickname: string | null;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    birthday: string | null;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsEmail()
    email: string | null;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    @Matches(/^(\+\d{1,3} \d{6,9})|(^\d{2} \d{9})|(\(\d{3}\) \d{3}-\d{4})$/, {
        message: 'The "phone_number" field should be in one of the following formats: Brazilian (DD DDDDDDDDD), European (+CC NNNNNNNNN), or American (NNN NNN-NNNN)',
    })
    phone_number: string;

    @ApiProperty({ required: true, enum: PhoneNumberCategory })
    @IsNotEmpty()
    @IsEnum(PhoneNumberCategory)
    phone_number_category: PhoneNumberCategory;

    @ApiProperty({ required: false })
    @IsOptional()
    address: string | null;
    
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    social_media: string | null;

    @ApiProperty({ required: false, enum: SocialMediaName })
    @IsOptional()
    @IsEnum(SocialMediaName)
    social_media_name: SocialMediaName;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    company: string | null;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    job_title: string | null;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    website: string | null;
}
