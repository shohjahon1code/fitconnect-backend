import { PartialType } from '@nestjs/swagger'

import { CreateGymDTO } from './create-gym.dto'

export class UpdateGymDTO extends PartialType(CreateGymDTO) {}
