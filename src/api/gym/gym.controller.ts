import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { Types } from 'mongoose'
import { ParseObjectIdPipe } from 'nestjs-object-id'

import { Gym } from 'src/models/gym.schema'

import { ResponseDTO } from 'src/common/decarators/response.decarator'

import { GymResponseDTO } from './dto/gym-respose.dto'
import { GymService } from './gym.service'

@ApiBearerAuth()
@ApiTags('Books')
@Controller('/api/gyms')
export class GymController {
  constructor(private readonly gymService: GymService) {}

  @Get('/')
  @ResponseDTO(GymResponseDTO, { isArray: true })
  async getAll(@Query() query: Record<string, any>) {
    return await this.gymService.getAll(query)
  }

  @Get('/:id')
  @ResponseDTO(GymResponseDTO)
  async getOne(@Param('id', ParseObjectIdPipe) id: Types.ObjectId) {
    const gym = await this.gymService.getOne(id)

    if (!gym) {
      throw new NotFoundException('Gym not found')
    }
    return { data: gym }
  }

  @Post('/')
  @ResponseDTO(GymResponseDTO)
  async create(@Body() gym: Gym) {
    const result = await this.gymService.create(gym)
    return { data: result }
  }

  @Put('/:id')
  @ResponseDTO(GymResponseDTO)
  async update(
    @Body() gym: Gym,
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
  ) {
    const result = await this.gymService.update(id, gym)
    if (!result) {
      throw new NotFoundException('Gym not found')
    }

    return { data: result }
  }

  @Delete('/:id')
  async delete(@Param('id', ParseObjectIdPipe) id: Types.ObjectId) {
    await this.gymService.delete(id)

    return { data: null }
  }
}
