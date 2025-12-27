
type Submission={
id :number;
link:string;
note?:string;
status: 'PENDING' | 'APPROVED' | 'REJECTED';
campaignId:number;
createdAt:Date;
updatedAt:Date;
}
 type WalletLedger = {
    id :number;
    amount:number;
    status:'ONHOLD' | 'RELEASED';
    campaignId:number;
    submissionId:number;
 }
type Campaign = {
    title: string;
    budget: number;
    id: number;
    createdAt: Date;
    updatedAt: Date;
    submissions: Submission[];
    walletLedgers: WalletLedger[];
}

export type { Campaign, Submission, WalletLedger }