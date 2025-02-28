import { Expose, Transform, Type } from 'class-transformer'
import { Types } from 'mongoose'

class LocationDTO {
  @Expose()
  lat: number

  @Expose()
  lng: number
}

class WorkingHoursDTO {
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

class PricingDTO {
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
  @Type(() => LocationDTO)
  location: LocationDTO

  @Expose()
  contact_phone: string

  @Expose()
  email?: string

  @Expose()
  website?: string

  @Expose()
  @Type(() => WorkingHoursDTO)
  working_hours: WorkingHoursDTO

  @Expose()
  amenities: string[]

  @Expose()
  photos: string[]

  @Expose()
  @Type(() => PricingDTO)
  pricing: PricingDTO

  @Expose()
  average_rating: number

  @Expose()
  verified: boolean

  @Expose()
  @Transform(({ obj }) => new Types.ObjectId(obj.owner_id))
  owner_id: string
}
