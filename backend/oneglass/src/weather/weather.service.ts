import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { getNextTwoWeeksDates } from '../utils';

@Injectable()
export class WeatherService {
  constructor(private readonly httpService: HttpService) {}

  private readonly visualCrossingBaseUrl =
    'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/';
  private readonly apiKey = 'FXCTPT3UX2G5L4Q5L3KVRC25B'; // Should be inside a secrets manager

  async getWeatherData(location: string): Promise<any> {
    const { endDate, startDate } = getNextTwoWeeksDates();

    const startDate_ = startDate.toISOString().split('T')[0];
    const endDate_ = endDate.toISOString().split('T')[0];

    const apiUrl = `${this.visualCrossingBaseUrl}${location}/${startDate_}/${endDate_}?key=${this.apiKey}&unitGroup=metric&include=days&contentType=json`;

    try {
      const response = await this.httpService.get(apiUrl).toPromise();
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
