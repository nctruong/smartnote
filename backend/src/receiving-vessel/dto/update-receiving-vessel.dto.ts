import { PartialType } from '@nestjs/mapped-types';
import { CreateReceivingVesselDto } from './create-receiving-vessel.dto';

export class UpdateReceivingVesselDto extends PartialType(CreateReceivingVesselDto) {}
