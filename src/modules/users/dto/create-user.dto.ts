import { IsString, IsNotEmpty, IsEmail, MinLength, IsOptional, Matches } from 'class-validator';
import { Transform } from 'class-transformer';
import { hashSync } from 'bcryptjs';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

//DTO = Data Transfer Object
export class CreateUserDto {

  @ApiHideProperty()
  created_at: Date;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ required: true })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ writeOnly: true })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @Transform(({value}: {value: string}) => hashSync(value, 10), {
    groups: ['transform'],
  })
  password: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Matches(/^\d{2}\/\d{2}\/\d{4}$/, {
    message: 'The "birthday" field should be in the format "dd/mm/yyyy"',
  })

  @ApiProperty({ required: false })
  birthday: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Matches(/^(http(s)?:\/\/[^\s]+\.(jpg|jpeg|png|gif))$/, {
    message: 'The "profile_photo" field should be a valid image URL (jpg, jpeg, png, gif)',
  })
  profile_photo: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Matches(/^(\+\d{1,3} \d{6,9})|(^\d{2} \d{9})|(\(\d{3}\) \d{3}-\d{4})$/, {
    message: 'The "mobile_phone" field should be in one of the following formats: Brazilian (DD DDDDDDDDD), European (+CC NNNNNNNNN), or American (NNN NNN-NNNN)',
  })
  mobile_phone: string;
}
