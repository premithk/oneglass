import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { getNextTwoWeeksDates } from './utils';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  getForcastedSalesForNextTwoWeeks(location: string) {
    const { endDate } = getNextTwoWeeksDates();
    return this.prisma.forecasts.findMany({
      where: {
        location: {
          equals: location,
          mode: 'insensitive',
        },
        date: {
          // looks like there is no data for the next two weeks, so I've hard coded the start date
          gte: new Date('2023-01-23T18:37:12.047Z'),
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
}
