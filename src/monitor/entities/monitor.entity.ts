import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Wallet } from '../wallet/entities/wallet.entity';

@Entity()
export class Monitor {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    tokenAddress: string;

    @Column({ nullable: true })
    tokenName: string;

    @Column({ nullable: true })
    tokenSymbol: string;

    @Column({ nullable: true })
    tokenIcon: string;

    @CreateDateColumn()
    createdAt: Date;

    @OneToMany(() => Wallet, (wallet: Wallet) => wallet.monitor)
    wallets: Wallet[];

    @Column()
    usdtAddress: string;

    @Column()
    usdcAddress: string;
}