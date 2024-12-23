import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Connection } from '@solana/web3.js';
import { Monitor } from './entities/monitor.entity';
import { Wallet } from './wallet/entities/wallet.entity';
import { CreateMonitorDto } from './dto/create-monitor.dto';
import { MonitorListItemDto } from './dto/monitor-list-item.dto';
import { MonitorDetailDto } from './dto/monitor-detail.dto';

@Injectable()
export class MonitorService {
  private solanaConnection: Connection;

  constructor(
    @InjectRepository(Monitor)
    private monitorRepo: Repository<Monitor>,
    @InjectRepository(Wallet)
    private walletRepo: Repository<Wallet>,
  ) {
    const rpcUrl = process.env.SOLANA_RPC_URL || 'https://api.mainnet-beta.solana.com';
    this.solanaConnection = new Connection(rpcUrl);
  }

  async create(createMonitorDto: CreateMonitorDto) {
    try {
      // 创建监控任务
      const monitor = this.monitorRepo.create({
        tokenAddress: createMonitorDto.tokenAddress,
      });

      // 创建钱包记录
      const wallets = createMonitorDto.wallets.map(walletInput => 
        this.walletRepo.create({
          address: walletInput.address,
          note: walletInput.note,
          monitor: monitor
        })
      );

      monitor.wallets = wallets;

      // 保存监控任务（会级联保存钱包记录）
      const savedMonitor = await this.monitorRepo.save(monitor);
      return savedMonitor;
    } catch (error) {
      throw new Error(`Failed to create monitor task: ${error.message}`);
    }
  }

  async findAll(): Promise<MonitorListItemDto[]> {
    const monitors = await this.monitorRepo.find({
      relations: ['wallets']
    });
    
    return monitors.map(monitor => ({
      id: monitor.id,
      tokenAddress: monitor.tokenAddress,
      walletsCount: monitor.wallets.length,
      createdAt: monitor.createdAt
    }));
  }

  async findOne(id: string): Promise<MonitorDetailDto> {
    const monitor = await this.monitorRepo.findOne({
      where: { id },
      relations: ['wallets']
    });
    
    if (!monitor) {
      throw new NotFoundException('Monitor task not found');
    }

    return {
      id: monitor.id,
      tokenAddress: monitor.tokenAddress,
      wallets: monitor.wallets.map(wallet => ({
        id: wallet.id,
        address: wallet.address,
        note: wallet.note,
        balance: wallet.balance
      }))
    };
  }
}