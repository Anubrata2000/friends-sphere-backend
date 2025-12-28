import { Controller, Post, Get, Delete, Body, Param, UseGuards, Request, ParseIntPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiProperty, ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { InterestService } from './interest.service';
import { IsNotEmpty, IsString } from 'class-validator';

class CreateInterestDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    tagName: string;
}

@ApiTags('interests')
@ApiBearerAuth()
@Controller('interests')
export class InterestController {
    constructor(private readonly interestService: InterestService) { }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    @ApiOperation({ summary: 'Add a new interest tag' })
    addInterest(@Request() req, @Body() body: CreateInterestDto) {
        return this.interestService.addInterest(req.user.id, body.tagName);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get()
    @ApiOperation({ summary: 'Get all interests for current user' })
    getInterests(@Request() req) {
        return this.interestService.getUserInterests(req.user.id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    @ApiOperation({ summary: 'Remove an interest' })
    removeInterest(@Request() req, @Param('id', ParseIntPipe) id: number) {
        return this.interestService.removeInterest(req.user.id, id);
    }
}
