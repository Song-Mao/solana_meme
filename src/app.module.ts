   // src/app.module.ts
   import { Module } from '@nestjs/common';
   import { TypeOrmModule } from '@nestjs/typeorm';
   import { ConfigModule } from '@nestjs/config';
   import { MonitorModule } from './monitor/monitor.module';
   import { Monitor } from './monitor/entities/monitor.entity';
   import { Wallet } from './monitor/wallet/entities/wallet.entity';

   @Module({
     imports: [
       ConfigModule.forRoot(),
       TypeOrmModule.forRoot({
         type: 'mysql',
         host: 'localhost',
         port: 3306,
         username: 'root',
         password: 'Songmao468',
         database: 'solana_meme',
         synchronize: true,
         autoLoadEntities: true,
       }),
       MonitorModule,
     ],
   })
   
   export class AppModule {}