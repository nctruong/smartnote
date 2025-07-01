import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateReceivingVesselDto {
    @IsString()
    @IsNotEmpty()
    imo: string;

    @IsString()
    name: string;

    @IsString()
    s3Key: string;

    @IsString()
    sbNo: string;

    @IsString()
    serialNo: string;

    @IsString()
    type: string;

    @IsNumber()
    companyId: number;

    @IsNumber()
    userId: number;
}
