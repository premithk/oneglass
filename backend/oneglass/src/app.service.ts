import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { getNextTwoWeeksDates } from './utils';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  getForcastedSalesForNextTwoWeeks(location: string) {
    const { endDate, startDate } = getNextTwoWeeksDates();
    return this.prisma.forecasts.findMany({
      where: {
        location: {
          equals: location,
          mode: 'insensitive',
        },
        date: {
          gte: startDate,
          lt: endDate,
        },
      },
    });
  }

  getAllLocations() {
    return this.prisma.forecasts.findMany({
      distinct: ['location'],
      select: {
        location: true,
      },
    });
  }

  getIncomingInventoryForNextTwoWeeks(location: string) {
    const { endDate, startDate } = getNextTwoWeeksDates();
    return this.prisma.incoming_inventory.findMany({
      where: {
        location: {
          equals: location,
          mode: 'insensitive',
        },
        date: {
          gte: startDate,
          lt: endDate,
        },
      },
    });
  }
}
