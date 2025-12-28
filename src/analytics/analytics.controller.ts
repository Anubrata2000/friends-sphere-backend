import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AnalyticsService } from './analytics.service';

@ApiTags('analytics')
@ApiBearerAuth()
@Controller('analytics')
export class AnalyticsController {
    constructor(private readonly analyticsService: AnalyticsService) { }

    @UseGuards(AuthGuard('jwt'))
    @Get('snapshots')
    @ApiOperation({ summary: 'Get recent analytics snapshots' })
    getSnapshots() {
        return this.analyticsService.getSnapshots();
    }
}
