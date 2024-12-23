import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Wallet } from './wallet.entity';

@Entity()
export class Monitor {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    tokenAddress: string;

    @OneToMany(() => Wallet, wallet => wallet.monitor, { cascade: true })
    wallets: Wallet[];

    @CreateDateColumn()
    createdAt: Date;
}