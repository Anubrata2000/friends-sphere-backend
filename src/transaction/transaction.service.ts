import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TransactionService {
    constructor(private readonly prisma: PrismaService) { }

    async getUserTransactions(userId: number) {
        return this.prisma.transaction.findMany({
            where: { user_id: userId },
            orderBy: { timestamp: 'desc' },
        });
    }

    async getTransaction(userId: number, transactionId: number) {
        const transaction = await this.prisma.transaction.findFirst({
            where: { id: transactionId, user_id: userId },
        });

        if (!transaction) {
            throw new NotFoundException('Transaction not found');
        }
        return transaction;
    }
}
