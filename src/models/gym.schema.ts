import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, Types } from 'mongoose'

export type GymDocument = HydratedDocument<Gym>

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class Gym {
  @Prop({ required: true })
  name: string

  @Prop()
  description?: string

  @Prop()
  address: string

  @Prop({
    type: { lat: Number, lng: Number },
    required: true,
  })
  location: { lat: number; lng: number }

  @Prop({ required: true })
  contact_phone: string

  @Prop()
  email?: string

  @Prop()
  website?: string

  @Prop({ type: Object, required: true })
  working_hours: {
    monday?: string
    tuesday?: string
    wednesday?: string
    thursday?: string
    friday?: string
    saturday?: string
    sunday?: string
  }

  @Prop({ type: [String], default: [] })
  amenities: string[]

  @Prop({ type: [String], default: [] })
  photos: string[]

  @Prop({
    type: Object,
    required: true,
  })
  pricing: {
    daily_pass?: number
    quarterly_subscription?: number
    monthly_subscription?: number
    annual_subscription?: number
  }

  @Prop({ default: 0 })
  average_rating: number

  @Prop({ default: false })
  verified: boolean

  @Prop({ type: Types.ObjectId, ref: 'User' })
  owner_id: Types.ObjectId
}

export const GymSchema = SchemaFactory.createForClass(Gym)
GymSchema.index({ location: '2dsphere' })
