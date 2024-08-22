import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { FarmDataDto } from './dto/farm-data.dto';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class NpkPredictorService {
  constructor(private httpService: HttpService) {}

  async predict(farmData: FarmDataDto) {
    const { data } = await firstValueFrom(
      this.httpService
        .post('https://godfreyowino-npk-predictor-cc214d6.hf.space/predict', {
          crop_name: farmData.cropName,
          target_yield: farmData.targetYield,
          field_size: farmData.fieldSize,
          ph: farmData.ph,
          organic_carbon: farmData.soilConductivity,
          nitrogen: farmData.nitrogen,
          phosphorus: farmData.phosphorus,
          potassium: farmData.potassium,
          soil_moisture: farmData.soilMoisture,
        })
        .pipe(
          catchError((error) => {
            console.error('Error in NPK prediction:', error);
            throw 'Failed to predict NPK needs';
          }),
        ),
    );

    return data;
  }
}