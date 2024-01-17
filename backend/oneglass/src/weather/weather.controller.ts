import { Controller, Get, Param } from '@nestjs/common';
import { WeatherService } from './weather.service';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get(':city')
  async getWeatherData(@Param('city') city: string): Promise<any> {
    try {
      return this.weatherService.getWeatherData(city);
    } catch (error) {
      // Handle errors here
      throw error;
    }
  }
}
