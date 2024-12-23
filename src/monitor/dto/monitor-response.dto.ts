// 新建这个文件用于定义返回数据的格式
export class MonitorListItemDto {
    id: string;
    tokenAddress: string;
    tokenSymbol: string;
    tokenName: string;
    walletsCount: number;
    createdAt: Date;
}

export class WalletDetailDto {
    address: string;
    memo: string;
    currentBalance: string;
    previousBalance: string;
    change: string;
    solBalance: number;
    usdtBalance: number;
    usdcBalance: number;
    lastUpdatedAt: Date;
}

export class MonitorDetailDto {
    id: string;
    tokenAddress: string;
    tokenSymbol: string;
    tokenName: string;
    walletDetails: WalletDetailDto[];
}