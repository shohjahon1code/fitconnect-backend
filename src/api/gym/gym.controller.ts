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
import { ParseObjectIdPipe } from 'nestjs-object-id'

import { ResponseDTO } from 'src/common/decarators/response.decarator'

import { CreateGymDTO } from './dto/create-gym.dto'
import { GymResponseDTO } from './dto/gym-respose.dto'
import { UpdateGymDTO } from './dto/update-gym.dto'
import { GymService } from './gym.service'

@ApiBearerAuth()
@ApiTags('Books')
@Controller('/api/gyms')
export class GymController {
  constructor(private readonly gymService: GymService) {}

  @Get('/')
  @ResponseDTO(GymResponseDTO, { isArray: true })
  async getAll(@Query() query: Record<string, any>) {
    const result = await this.gymService.getAll(query)
    return { data: result.gyms, pagination_info: result.pagination_info }
  }

  @Get('/:id')
  @ResponseDTO(GymResponseDTO)
  async getOne(@Param('id', ParseObjectIdPipe) id: string) {
    const gym = await this.gymService.getOne(id)

    if (!gym) {
      throw new NotFoundException('Gym not found')
    }
    return { data: gym }
  }

  @Post('/')
  @ResponseDTO(GymResponseDTO)
  async create(@Body() gym: CreateGymDTO) {
    const result = await this.gymService.create(gym)
    return { data: result }
  }

  @Put('/:id')
  @ResponseDTO(GymResponseDTO)
  async update(
    @Body() gym: UpdateGymDTO,
    @Param('id', ParseObjectIdPipe) id: string,
  ) {
    const result = await this.gymService.update(id, gym)
    if (!result) {
      throw new NotFoundException('Gym not found')
    }

    return { data: result }
  }

  @Delete('/:id')
  async delete(@Param('id', ParseObjectIdPipe) id: string) {
    await this.gymService.delete(id)

    return { data: null }
  }
}
