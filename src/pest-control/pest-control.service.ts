import { Injectable } from '@nestjs/common';
import { Groq } from 'groq-sdk';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PestControlService {
  private groq: Groq;

  constructor(private configService: ConfigService) {
    this.groq = new Groq({
      apiKey: this.configService.get<string>('GROQ_API_KEY'),
    });
  }

  async analyzePests(cropPlanned: string) {
    const maizeRelatedTerms = ['maize', 'corn', 'maize(corn)'];
    const isMaizeRelated = maizeRelatedTerms.some((term) =>
      cropPlanned.toLowerCase().includes(term),
    );

    if (isMaizeRelated) {
      return this.getMaizePests();
    } else {
      return this.getOtherCropPests(cropPlanned);
    }
  }

  private getMaizePests() {
    const maizeData = {
      plant_name: "MAIZE",
      pests: [
        {
          name: "Fall Army worm",
          signs: "Attacks at seedling, vegetative, flowering and fruiting stage",
          prevention: "No prevention",
          chemicals: [
            {
              name: "Occasion star 200sc",
              active_ingredient: "Emamectin benzoate 40g/l",
              application: "Foliar spray",
              dosage: "3ml/20l",
            },
            {
              name: "Escort 50 EC",
              active_ingredient: "Indoxacarb 160g/l",
              application: "Foliar spray",
              dosage: "20-25ml/20l",
            },
            {
              name: "Indoking 300SC",
              active_ingredient: "Emamectin benzoate 19g/l",
              application: "Foliar spray",
              dosage: "3ml/20l",
            },
            {
              name: "Legacy Extreme 500WDG",
              active_ingredient: "Indoxacarb 300 g/L",
              application: "Foliar spray",
              dosage: "2g/20l",
            },
            {
              name: "Ranger 480EC",
              active_ingredient: "Emamectin benzoate 100 g/kg, Lufenuron 400 g/kg",
              application: "Foliar spray",
              dosage: "20ml/20l",
            },
            {
              name: "Amiguard",
              active_ingredient: "Chlorpyrifos 480 g/L",
              application: "Foliar spray",
              dosage: "4g/20l",
            },
            {
              name: "Voliam targo",
              active_ingredient: "Emamectin benzoate57g/kg",
              application: "Foliar spray",
              dosage: "20ml/20l",
            },
            {
              name: "Voliam targo",
              active_ingredient: "Chlorantraniliprole 45g/l, Abamectin 18g/L",
              application: "Foliar spray",
              dosage: "20ml/20l",
            },
          ],
        },
        {
          name: "Stalk borer",
          signs: "Feed on leaves and find their way to stalk making it weak",
          prevention: "No prevention",
          chemicals: [
            {
              name: "Profile 440 EC",
              active_ingredient: "Profenofos",
              application: "Foliar spray",
              dosage: "20 ml/l",
            },
            {
              name: "Occasion Star 200SC",
              active_ingredient: "Cypermethrin",
              application: "Foliar spray",
              dosage: "3mls/20l",
            },
          ],
        },
        {
          name: "Maize aphids",
          signs: "Soft bodied insects that feed by piercing and sucking",
          prevention: "No prevention",
          chemicals: [
            {
              name: "Kingcode Elite 50EC",
              active_ingredient: "Acetamiprid35g/l, Lambda-Cyhalothrin 15g/l",
              application: "Foliar Spray",
              dosage: "10ml/20l",
            },
          ],
        },
        {
          name: "Cut Worms",
          signs: "Cut the stems of young seedlings",
          prevention: "No prevention",
          chemicals: [
            {
              name: "Profile 440 EC",
              active_ingredient: "Profenofos, Cypermethrin",
              application: "Drench the soil",
              dosage: "20ml/20l",
            },
          ],
        },
        {
          name: "African bollworm",
          signs: "Attack mainly developing cobs",
          prevention: "No prevention",
          chemicals: [
            {
              name: "Kinetic",
              active_ingredient: "Lambda cyhalothrin",
              application: "Foliar spray",
              dosage: "3ml/20l",
            },
            {
              name: "Plant extracts",
              active_ingredient: "neem, garlic or chilli",
              application: "Foliar spray",
              dosage: "3ml/20l",
            },
          ],
        },
      ],
    };

    const formattedPests = maizeData.pests.map((pest) => ({
      name: pest.name,
      prevention: pest.prevention,
      chemicalControl: pest.chemicals.map((chem) => chem.name).join(', ') || 'Not recommended',
      modeOfApplication: pest.chemicals[0]?.application || 'N/A',
      rateOfApplication: pest.chemicals[0]?.dosage || 'N/A',
    }));

    return { pests: formattedPests };
  }

  private async getOtherCropPests(cropPlanned: string) {
    const prompt = `
      You are an expert in agricultural pest management. For the crop ${cropPlanned}, please provide:
      A list of common pests that affect this crop.
      DO NOT PROVIDE ANYTHING AFTER OR BEFORE THE JSONOBJECT ONLY PROVIDE THE JSON OBJECT
      For each pest, include:
      - Name
      - Prevention methods
      - Chemical control (if applicable)
      - Mode of application
      - Rate of application

      IMPORTANT: Your entire response must be a valid JSON object. Do not include any text before or after the JSON. Use the following structure:
      {
        "pests": [
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