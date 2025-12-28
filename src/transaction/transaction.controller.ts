import { Controller, Get, Param, UseGuards, Request, ParseIntPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TransactionService } from './transaction.service';

@ApiTags('transactions')
@ApiBearerAuth()
@Controller('transactions')
export class TransactionController {
    constructor(private readonly transactionService: TransactionService) { }

    @UseGuards(AuthGuard('jwt'))
    @Get()
    @ApiOperation({ summary: 'List user transactions' })
    getTransactions(@Request() req) {
        return this.transactionService.getUserTransactions(req.user.id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get(':id')
    @ApiOperation({ summary: 'Get transaction details' })
    getTransaction(@Request() req, @Param('id', ParseIntPipe) id: number) {
        return this.transactionService.getTransaction(req.user.id, id);
    }
}
