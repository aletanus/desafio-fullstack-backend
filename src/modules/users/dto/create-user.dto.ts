import { IsString, IsNotEmpty, IsEmail, MinLength, IsOptional, Matches } from 'class-validator';
import { Transform } from 'class-transformer';
import { hashSync } from 'bcryptjs';

//DTO = Data Transfer Object
export class CreateUserDto {

  created_at: Date;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @Transform(({value}: {value: string}) => hashSync(value, 10), {
    groups: ['transform'],
  })
  password: string;

  @IsOptional()
  @IsString()
  @Matches(/^\d{2}\/\d{2}\/\d{4}$/, {
    message: 'The "birthday" field should be in the format "dd/mm/yyyy"',
  })
  birthday: string;

  @IsOptional()
  @IsString()
  @Matches(/^(http(s)?:\/\/[^\s]+\.(jpg|jpeg|png|gif))$/, {
    message: 'The "profile_photo" field should be a valid image URL (jpg, jpeg, png, gif)',
  })
  profile_photo: string;

  @IsOptional()
  @IsString()
  @Matches(/^(\+\d{1,3} \d{6,9})|(^\d{2} \d{9})|(\(\d{3}\) \d{3}-\d{4})$/, {
    message: 'The "mobile_phone" field should be in one of the following formats: Brazilian (DD DDDDDDDDD), European (+CC NNNNNNNNN), or American (NNN NNN-NNNN)',
  })
  mobile_phone: string;
}
