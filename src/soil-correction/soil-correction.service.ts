import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Groq } from 'groq-sdk';
import { SoilCorrectionDto } from './dto/soil-correction.dto';

@Injectable()
export class SoilCorrectionService {
  private groq: Groq;

  constructor(private configService: ConfigService) {
    this.groq = new Groq({
      apiKey: this.configService.get<string>('GROQ_API_KEY'),
    });
  }

  async generatePlan(soilCorrectionData: SoilCorrectionDto) {
    const { farmData, npkResult } = soilCorrectionData;

    const prompt = `
    You are an expert in soil management and crop nutrition. Based on the following data:

    Farm Data:
    - Crop: ${farmData.cropName}
    - Target Yield: ${farmData.targetYield} kg/acre
    - Field Size: ${farmData.fieldSize} acres
    - pH: ${farmData.ph}
    - Organic Carbon: ${farmData.soilConductivity}%
    - Nitrogen: ${farmData.nitrogen} kg/acre
    - Phosphorus: ${farmData.phosphorus} kg/acre
    - Potassium: ${farmData.potassium} kg/acre
    - Soil Moisture: ${farmData.soilMoisture}%

    NPK Recommendation:
    - Nitrogen Need: ${npkResult.nitrogen_need} kg/acre
    - Phosphorus Need: ${npkResult.phosphorus_need} kg/acre
    - Potassium Need: ${npkResult.potassium_need} kg/acre

    Provide a soil correction plan with recommendations for three stages:
    1. Before planting
    2. At planting
    3. 6 weeks after planting

    For each stage, include:
    - Timing
    - Instruction
    - Best option
    - First alternative
    - Second alternative

    IMPORTANT: Your entire response must be a valid JSON object. Do not include any text before or after the JSON. Use the following structure:

    {
      "soilCorrectionPlan": [
        {
          "timing": "Before planting",
          "instructions": "Detailed instruction",
          "bestOption": "Best recommended action",
          "firstAlternative": "First alternative action",
          "secondAlternative": "Second alternative action"
        },
        {
          "timing": "At planting",
          "instructions": "Detailed instruction",
          "bestOption": "Best recommended action",
          "firstAlternative": "First alternative action",
          "secondAlternative": "Second alternative action"
        },
        {
          "timing": "6 weeks after planting",
          "instructions": "Detailed instruction",
          "bestOption": "Best recommended action",
          "firstAlternative": "First alternative action",
          "secondAlternative": "Second alternative action"
        }
      ]
    }
    `;

    try {
      const completion = await this.groq.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "mixtral-8x7b-32768",
        temperature: 0.1,
        max_tokens: 1500,
      });

      const responseContent = completion.choices[0]?.message?.content || "{}";

      // Try to parse the entire response as JSON
      let result;
      try {
        result = JSON.parse(responseContent);
      } catch (parseError) {
        // If parsing fails, try to extract JSON from the response
        const jsonMatch = responseContent.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          result = JSON.parse(jsonMatch[0]);
        } else {
          throw new Error("Failed to extract valid JSON from the response");
        }
      }

      return result;
    } catch (error) {
      console.error("Error in soil correction plan analysis:", error);
      throw new Error("Failed to generate soil correction plan");
    }
  }
}