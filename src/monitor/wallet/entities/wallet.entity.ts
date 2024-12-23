import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Monitor } from '../../entities/monitor.entity';

@Entity()
export class Wallet {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    address!: string;

    @Column()
    note!: string;

    @Column('text', { nullable: true })
    tokenBalance!: string;

    @Column('text', { nullable: true })
    lastTokenBalance!: string;

    @Column('text', { nullable: true })
    tokenBalanceChange!: string;

    @Column('text', { nullable: true })
    solBalance!: string;

    @Column('text', { nullable: true })
    solValueInUsdt!: string;

    @Column('text', { nullable: true })
    usdtBalance!: string;

    @Column('text', { nullable: true })
    usdcBalance!: string;

    @ManyToOne(() => Monitor, monitor => monitor.wallets)
    monitor!: Monitor;
} 