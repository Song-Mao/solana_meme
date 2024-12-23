export class WalletDetail {
    id: string;
    address: string;
    note: string;
    tokenBalance: string;
    lastTokenBalance: string;
    tokenBalanceChange: string;
    solBalance: string;
    solValueInUsdt: string;
    usdtBalance: string;
    usdcBalance: string;
}

export class MonitorDetailDto {
    id: string;
    tokenAddress: string;
    tokenName: string;
    tokenSymbol: string;
    tokenIcon: string;
    wallets: WalletDetail[];
} 