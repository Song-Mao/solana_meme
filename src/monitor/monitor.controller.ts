import { Controller, Get, Post, Body, Param, Query, BadRequestException } from '@nestjs/common';
import { MonitorService } from './monitor.service';
import { CreateMonitorDto } from './dto/create-monitor.dto';
import { MonitorListItemDto } from './dto/monitor-list-item.dto';
import { MonitorDetailDto } from './dto/monitor-detail.dto';

@Controller('monitor')
export class MonitorController {
  constructor(private readonly monitorService: MonitorService) {}

  @Post()
  async create(@Body() createMonitorDto: CreateMonitorDto) {
    return await this.monitorService.create(createMonitorDto);
  }

  @Get()
  async findAll(): Promise<MonitorListItemDto[]> {
    return await this.monitorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.monitorService.findOne(id);
  }
}