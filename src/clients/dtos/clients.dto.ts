/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty, IsNumber, IsEmail, IsOptional } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateClientDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly code: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly desciption: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly address: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly client_id: string;

  @IsEmail()
  @IsOptional()
  @ApiProperty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly phone: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly client_type: string;


}

export class UpdateClientDto extends PartialType(CreateClientDto) {}