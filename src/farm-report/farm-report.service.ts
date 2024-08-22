import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FarmData } from './dto/farm-report.dto';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class FarmReportService {
  private baseUrl: string;

  constructor(
    private configService: ConfigService,
    private httpService: HttpService
  ) {
    this.baseUrl = this.configService.get<string>('NEXT_PUBLIC_BASE_URL') || 'http://localhost:3000';
  }

  async generateReport(farmData: FarmData) {
    try {
      // First, calling the predictNPK and generateFertilizerPlan in parallel
      const [npkResult, fertilizerPlanData] = await Promise.all([
        this.predictNPK(farmData),
        this.generateFertilizerPlan(farmData),
      ]);

      // 2nd, calling the rest of the functions in parallel
      const [pestsData, diseasesData, finalReportData] = await Promise.all([
        this.fetchPests(farmData.cropName),
        this.fetchDiseases(farmData.cropName),
        this.generateFinalReport(farmData, npkResult, fertilizerPlanData),
      ]);

      const report = {
        farmInfo: {
          name: farmData.farmName,
          owner: farmData.farmerName,
          location: farmData.location.label,
        },
        Nutrientrecommendation: npkResult,
        soilData: {
          nitrogen: farmData.nitrogen,
          phosphorus: farmData.phosphorus,
          potassium: farmData.potassium,
          moisture: farmData.soilMoisture,
          temperature: farmData.temperature || 0,
          ph: farmData.ph,
          conductivity: farmData.soilConductivity,
        },
        diseaseControl: diseasesData.diseases,
        pestControl: pestsData.pests,
        recommendations: finalReportData.reportContent,
        fertilizerApplicationPlan: fertilizerPlanData,
      };

      return report;
    } catch (error) {
      console.error("Error generating farm report:", error);
      throw new Error("Failed to generate farm report");
    }
  }

  private async predictNPK(farmData: FarmData) {
    try {
      const response = await this.httpService.post(`${this.baseUrl}/api/npk-predictor`, farmData).toPromise();
      return response.data;
    } catch (error) {
      console.error("Error predicting NPK:", error);
      throw new Error("Failed to predict NPK");
    }
  }

  private async fetchPests(cropName: string) {
    try {
      const response = await this.httpService.post(`${this.baseUrl}/api/pest-control`, { cropPlanned: cropName }).toPromise();
      return response.data;
    } catch (error) {
      console.error("Error fetching pests:", error);
      throw new Error("Failed to fetch pests");
    }
  }

  private async fetchDiseases(cropName: string) {
    try {
      const response = await this.httpService.post(`${this.baseUrl}/api/disease-control`, { cropPlanned: cropName }).toPromise();
      return response.data;
    } catch (error) {
      console.error("Error fetching diseases:", error);
      throw new Error("Failed to fetch diseases");
    }
  }

  private async generateFinalReport(farmData: FarmData, npkResult: any, fertilizerPlanData: any) {
    try {
      const response = await this.httpService.post(`${this.baseUrl}/api/recommendations`, {
        farmData,
        npkResult,
        fertilizerPlanData,
      }).toPromise();
      return response.data;
    } catch (error) {
      console.error("Error generating final report:", error);
      throw new Error("Failed to generate final report");
    }
  }

  private async generateFertilizerPlan(farmData: FarmData) {
    try {
      const payload = {
        crop_name: farmData.cropName,
        target_yield: farmData.targetYield,
        field_size: farmData.fieldSize,
        ph_water: farmData.ph,
        organic_carbon: farmData.soilConductivity,
        total_nitrogen: farmData.nitrogen,
        phosphorus_m3: farmData.phosphorus,
        potassium_exch: farmData.potassium,
      };

      const response = await this.httpService.post(`${this.baseUrl}/api/fertilizer-plan`, payload).toPromise();
      return response.data;
    } catch (error) {
      console.error("Error generating fertilizer plan:", error);
      throw new Error("Failed to generate fertilizer plan");
    }
  }
}