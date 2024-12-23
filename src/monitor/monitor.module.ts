import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MonitorController } from './monitor.controller';
import { MonitorService } from './monitor.service';
import { Monitor } from './entities/monitor.entity';
import { Wallet } from './wallet/entities/wallet.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Monitor, Wallet])
  ],
  controllers: [MonitorController],
  providers: [MonitorService],
})
export class MonitorModule {}