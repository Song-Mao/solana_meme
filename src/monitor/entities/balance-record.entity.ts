// 新建这个文件用于记录余额历史
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BalanceRecord {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  taskId: string;

  @Column()
  walletAddress: string;

  @Column()
  balance: number;

  @Column()
  previousBalance: number;

  @Column()
  change: number;

  @Column()
  solBalance: number;

  @Column()
  usdtBalance: number;

  @Column()
  usdcBalance: number;

  @Column()
  updatedAt: Date;
}