import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class InterestService {
    constructor(private readonly prisma: PrismaService) { }

    async addInterest(userId: number, tagName: string) {
        try {
            return await this.prisma.interest.create({
                data: {
                    user_id: userId,
                    tag_name: tagName,
                },
            });
        } catch (error) {
            if (error.code === 'P2002') {
                throw new BadRequestException('Interest already exists for this user');
            }
            throw error;
        }
    }

    async getUserInterests(userId: number) {
        return this.prisma.interest.findMany({
            where: { user_id: userId },
        });
    }

    async removeInterest(userId: number, interestId: number) {
        // Ensure the interest belongs to the user
        const interest = await this.prisma.interest.findFirst({
            where: { id: interestId, user_id: userId },
        });

        if (!interest) {
            throw new BadRequestException('Interest not found or does not belong to user');
        }

        return this.prisma.interest.delete({
            where: { id: interestId },
        });
    }
}
