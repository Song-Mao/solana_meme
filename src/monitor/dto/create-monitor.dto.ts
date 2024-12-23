import { IsString, IsArray, ValidateNested, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

class WalletInput {
  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  note: string;
}

export class CreateMonitorDto {
  @IsString()
  @IsNotEmpty()
  tokenAddress: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => WalletInput)
  wallets: WalletInput[];
}