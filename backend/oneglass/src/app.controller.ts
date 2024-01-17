import { Controller, Get, Param, Res } from '@nestjs/common';
import { AppService } from './app.service';

import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':location/next-two-weeks')
  async getNextTwoWeeksForecast(
    @Param('location') location: string,
    @Res() res: Response,
  ) {
    try {
      const forecastData =
        await this.appService.getForcastedSalesForNextTwoWeeks(location);
      res.json(forecastData);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching forecast data', error });
    }
  }

  @Get('locations')
  async getAllLocations(@Res() res: Response) {
    try {
      const forecastData = await this.appService.getAllLocations();
      res.json(forecastData);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching forecast data', error });
    }
  }
}
