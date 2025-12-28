import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AnalyticsService {
    constructor(private readonly prisma: PrismaService) { }

    async getSnapshots() {
        return this.prisma.analyticsSnapshot.findMany({
            orderBy: { timestamp: 'desc' },
            take: 50,
        });
    }
}
