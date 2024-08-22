import { Injectable } from '@nestjs/common';
import { Groq } from 'groq-sdk';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DiseaseControlService {
  private groq: Groq;

  constructor(private configService: ConfigService) {
    this.groq = new Groq({
      apiKey: this.configService.get<string>('GROQ_API_KEY'),
    });
  }

  async analyzeDiseases(cropPlanned: string) {
    const maizeRelatedTerms = ['maize', 'corn', 'maize(corn)'];
    const isMaizeRelated = maizeRelatedTerms.some((term) =>
      cropPlanned.toLowerCase().includes(term),
    );

    if (isMaizeRelated) {
      return this.getMaizeDiseases();
    } else {
      return this.getOtherCropDiseases(cropPlanned);
    }
  }

  private getMaizeDiseases() {
    const maizeData = {
      plant_name: "MAIZE",
      diseases: [
        {
          name: "Maize lethal necrosis disease",
          signs:
            "Appearance of chlorotic mottling on leaves starting from older to younger leaves",
          prevention:
            "Control vectors such as aphids, thrips, leaf beetles and ensure proper nutrition",
          chemicals: [
            {
              name: "No chemical available for the control of the virus",
              active_ingredient: "N/A",
              application: "N/A",
              dosage: "N/A",
            },
          ],
        },
        {
          name: "Maize Smut",
          signs:
            "Soil borne formation of whitish galls/swellings which rapture realising dark spores",
          prevention: "No prevention",
          chemicals: [
            {
              name: "Gearlock Turbo",
              active_ingredient:
                "Metalaxyl 150 g/kg + Propamocarb hydrochloride 100 g/kg",
              application: "Drench the soil",
              dosage: "40g/20l",
            },
          ],
        },
        {
          name: "Northern leaf blight",
          signs: "Grey-green lesions on leaves which turn pale grey",
          prevention: "Plant resistant variety",
          chemicals: [
            {
              name: "Gearlock Turbo 250wp",
              active_ingredient:
                "Metalaxyl 150 g/kg + Propamocarb hydrochloride 100 g/kg",
              application: "Foliar Spray",
              dosage: "40g/20l",
            },
          ],
        },
      ],
    };

    const formattedDiseases = maizeData.diseases.map((disease) => ({
      name: disease.name,
      prevention: disease.prevention,
      chemicalControl: disease.chemicals.map((chem) => chem.name).join(', ') || 'Not recommended',
      modeOfApplication: disease.chemicals[0]?.application || 'N/A',
      rateOfApplication: disease.chemicals[0]?.dosage || 'N/A',
    }));

    return { diseases: formattedDiseases };
  }

  private async getOtherCropDiseases(cropPlanned: string) {
    const prompt = `
      You are an expert in agricultural pest management. For the crop ${cropPlanned}, please provide:
      A list of common Diseases that affect this crop.
      DO NOT PROVIDE ANYTHING AFTER OR BEFORE THE JSONOBJECT ONLY PROVIDE THE JSON OBJECT
      For each pest, include:
      - Name
      - Prevention methods
      - Chemical control (if applicable)
      - Mode of application
      - Rate of application

      IMPORTANT: Your entire response must be a valid JSON object. Do not include any text before or after the JSON. Use the following structure:
      {
        "Diseases": [
          {
            "name": "Pest name",
            "prevention": "Prevention methods",
            "chemicalControl": "Chemical name or 'Not recommended'",
            "modeOfApplication": "How to apply the chemical",
            "rateOfApplication": "Application rate"
          }
        ]
      }
    `;

    const completion = await this.groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'mixtral-8x7b-32768',
      temperature: 0.1,
      max_tokens: 1000,
    });

    const responseContent = completion.choices[0]?.message?.content || '{}';

    try {
      return JSON.parse(responseContent);
    } catch (parseError) {
      const jsonMatch = responseContent.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('Failed to extract valid JSON from the response');
      }
    }
  }
}