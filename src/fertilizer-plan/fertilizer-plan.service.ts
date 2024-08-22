import { Injectable } from '@nestjs/common';
import { ModelOutput,FertilizerPlan, ApplicationOption } from './interfaces/fertilizer-plan.interface';
import { HttpService } from '@nestjs/axios';
import { FertilizerPlanDto } from './dto/fertilizer-plan.dto';

@Injectable()
export class FertilizerPlanService {
  constructor(private httpService: HttpService) {}

  async generatePlan(fertilizerPlanData: FertilizerPlanDto) {
    try {
      const apiResponse = await this.httpService.post(
        'https://godfreyowino-npk-predictor-v2.hf.space/predict',
        fertilizerPlanData
      ).toPromise();

      const data: ModelOutput = apiResponse.data;

      const plan = this.createFertilizerPlan(data);
      const processedPlan = {
        bestOption: this.processPlanOption(plan.bestOption),
        secondOption: this.processPlanOption(plan.secondOption),
        thirdOption: this.processPlanOption(plan.thirdOption),
        soilCorrection: plan.soilCorrection
          ? {
              limeApplication: plan.soilCorrection.limeApplication
                ? `Apply ${plan.soilCorrection.limeApplication.amount.toFixed(2)} kg of ${plan.soilCorrection.limeApplication.type} ${plan.soilCorrection.limeApplication.timing}`
                : null,
              organicMatterApplication: plan.soilCorrection.organicMatterApplication
                ? `Apply ${plan.soilCorrection.organicMatterApplication.amount.toFixed(2)} kg of ${plan.soilCorrection.organicMatterApplication.type} ${plan.soilCorrection.organicMatterApplication.timing}`
                : null,
            }
          : null,
      };

      return processedPlan;
    } catch (error) {
      console.error('Error:', error);
      throw new Error('An error occurred while processing the request');
    }
  }

  private createFertilizerPlan(modelOutput: ModelOutput): FertilizerPlan {
    const createOption = (prefixes: string[]): ApplicationOption => {
      const option: ApplicationOption = {
        firstApplication: {
          timing: modelOutput[`1st Application${prefixes[0]}`] as string,
          fertilizers: [
            {
              type: modelOutput[`1st Application - Type fertilizer (1)${prefixes[1]}`] as string,
              amount: modelOutput[`1st Application - Requirement (1)${prefixes[2]}`] as number,
            },
            {
              type: modelOutput[`1st Application - Type fertilizer (2)${prefixes[3]}`] as string,
              amount: modelOutput[`1st Application - Requirement (2)${prefixes[4]}`] as number,
            },
          ],
        },
      };

      const secondAppTiming = modelOutput[`2nd Application${prefixes[5]}`];
      if (secondAppTiming) {
        option.secondApplication = {
          timing: secondAppTiming as string,
          fertilizers: [
            {
              type: modelOutput[`2nd Application - Type fertilizer (1)${prefixes[6]}`] as string,
              amount: modelOutput[`2nd Application - Requirement (1)${prefixes[7]}`] as number,
            },
          ],
        };
      }

      return option;
    };

    const plan: FertilizerPlan = {
      bestOption: createOption(['', '', '', '', '', '', '', '']),
      secondOption: createOption(['_1', '_3', '_2', '_5', '_4', '_6', '', '_7']),
      thirdOption: createOption(['_21', '_23', '_22', '_25', '_24', '_26', '_28', '_27']),
    };

    if (modelOutput['Lime Application - Instruction']) {
      plan.soilCorrection = {
        limeApplication: {
          timing: modelOutput['Lime Application - Instruction'] as string,
          amount: modelOutput['Lime Application - Requirement'] as number,
          type: modelOutput['Lime Application'] as string,
        },
      };
    }

    if (modelOutput['Organic Matter Application - Instruction']) {
      if (!plan.soilCorrection) plan.soilCorrection = {};
      plan.soilCorrection.organicMatterApplication = {
        timing: modelOutput['Organic Matter Application - Instruction'] as string,
        amount: modelOutput['Organic Matter Application - Requirement'] as number,
        type: modelOutput['Organic Matter Application'] as string,
      };
    }

    return plan;
  }

  private processPlanOption(option: FertilizerPlan['bestOption']) {
    return {
      firstApplication: {
        timing: option.firstApplication.timing,
        fertilizer: `Apply ${option.firstApplication.fertilizers[0].amount.toFixed(2)} kg of ${option.firstApplication.fertilizers[0].type} combined with ${option.firstApplication.fertilizers[1].amount.toFixed(2)} kg of ${option.firstApplication.fertilizers[1].type}`,
      },
      secondApplication: option.secondApplication
        ? {
            timing: option.secondApplication.timing,
            fertilizer: `Apply ${option.secondApplication.fertilizers[0].amount.toFixed(2)} kg of ${option.secondApplication.fertilizers[0].type}`,
          }
        : null,
    };
  }
}