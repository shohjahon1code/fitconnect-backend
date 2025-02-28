import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { Gym } from 'src/models/gym.schema'

import { APIFeatures } from 'src/common/utils/api-features'

@Injectable()
export class GymService {
  constructor(@InjectModel(Gym.name) private readonly gymModel: Model<Gym>) {}

  async getAll(query: Record<string, any>) {
    const features = new APIFeatures(this.gymModel.find(), query)
      .filter()
      .sorting()
      .pagination()

    const gyms = await features.mongoose_query
    const pagination_info = await features.getPaginationInfo()

    return { gyms, pagination_info }
  }

  async getOne(id: string) {
    return await this.gymModel.findById(id)
  }

  async create(gym: Gym) {
    return await this.gymModel.create(gym)
  }

  async update(id: string, gym: Gym) {
    return await this.gymModel.findByIdAndUpdate(id, gym, { new: true })
  }

  async delete(id: string) {
    return await this.gymModel.findByIdAndDelete(id)
  }
}
