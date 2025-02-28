import { Expose, Transform, Type } from 'class-transformer'
import { Types } from 'mongoose'

class LocationDto {
  @Expose()
  lat: number

  @Expose()
  lng: number
}

class WorkingHoursDto {
  @Expose()
  monday?: string

  @Expose()
  tuesday?: string

  @Expose()
  wednesday?: string

  @Expose()
  thursday?: string

  @Expose()
  friday?: string

  @Expose()
  saturday?: string

  @Expose()
  sunday?: string
}

class PricingDto {
  @Expose()
  daily_pass?: number

  @Expose()
  quarterly_subscription?: number

  @Expose()
  monthly_subscription?: number

  @Expose()
  annual_subscription?: number
}

export class GymResponseDTO {
  @Expose()
  @Transform(({ obj }) => obj._id)
  _id: string

  @Expose()
  name: string

  @Expose()
  description: string

  @Expose()
  address: string

  @Expose()
  @Type(() => LocationDto)
  location: LocationDto

  @Expose()
  contact_phone: string

  @Expose()
  email?: string

  @Expose()
  website?: string

  @Expose()
  @Type(() => WorkingHoursDto)
  working_hours: WorkingHoursDto

  @Expose()
  amenities: string[]

  @Expose()
  photos: string[]

  @Expose()
  @Type(() => PricingDto)
  pricing: PricingDto

  @Expose()
  average_rating: number

  @Expose()
  verified: boolean

  @Expose()
  @Transform(({ obj }) => new Types.ObjectId(obj.owner_id))
  owner_id: string
}
