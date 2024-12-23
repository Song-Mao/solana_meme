import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Monitor } from '../../entities/monitor.entity';

@Entity()
export class Wallet {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    address: string;

    @Column()
    note: string;

    @Column({ type: 'decimal', precision: 65, scale: 0, default: '0' })
    balance: string;

    @ManyToOne(() => Monitor, monitor => monitor.wallets)
    monitor: Monitor;
} 