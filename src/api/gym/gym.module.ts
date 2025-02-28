import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { Gym, GymSchema } from 'src/models/gym.schema'

import { GymController } from './gym.controller'
import { GymService } from './gym.service'

@Module({
  imports: [MongooseModule.forFeature([{ name: Gym.name, schema: GymSchema }])],
  providers: [GymService],
  controllers: [GymController],
})
export class GymModule {}
