import { Transform, Type } from 'class-transformer'
import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator'
import { Types } from 'mongoose'
import { IsObjectId } from 'nestjs-object-id'

class LocationDto {
  @IsNumber()
  lat: number

  @IsNumber()
  lng: number
}

class WorkingHoursDto {
  @IsString()
  @IsOptional()
  monday?: string

  @IsString()
  @IsOptional()
  tuesday?: string

  @IsString()
  @IsOptional()
  wednesday?: string

  @IsString()
  @IsOptional()
  thursday?: string

  @IsString()
  @IsOptional()
  friday?: string

  @IsString()
  @IsOptional()
  saturday?: string

  @IsString()
  @IsOptional()
  sunday?: string
}

class PricingDto {
  @IsNumber()
  @IsOptional()
  daily_pass?: number

  @IsNumber()
  @IsOptional()
  quarterly_subscription?: number

  @IsNumber()
  @IsOptional()
  monthly_subscription?: number

  @IsNumber()
  @IsOptional()
  annual_subscription?: number
}

export class CreateGymDto {
  @IsString()
  name: string

  @IsString()
  @IsOptional()
  description: string

  @IsString()
  address: string

  @ValidateNested()
  @Type(() => LocationDto)
  location: LocationDto

  @IsString()
  contact_phone: string

  @IsString()
  @IsOptional()
  email?: string

  @IsString()
  @IsOptional()
  website?: string

  @ValidateNested()
  @Type(() => WorkingHoursDto)
  working_hours: WorkingHoursDto

  @IsString()
  @IsArray()
  @ValidateNested({ each: true })
  amenities: string[]

  @IsString()
  @IsArray()
  @ValidateNested({ each: true })
  photos: string[]

  @ValidateNested()
  @Type(() => PricingDto)
  pricing: PricingDto

  @IsNumber()
  average_rating: number

  @IsBoolean()
  verified: boolean

  @IsObjectId()
  @Transform(({ obj }) => new Types.ObjectId(obj.owner_id))
  owner_id: string
}
