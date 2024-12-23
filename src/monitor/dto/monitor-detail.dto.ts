interface WalletDetail {
    id: string;
    address: string;
    note: string;
    balance: string;
}

export class MonitorDetailDto {
    id: string;
    tokenAddress: string;
    wallets: WalletDetail[];
} 