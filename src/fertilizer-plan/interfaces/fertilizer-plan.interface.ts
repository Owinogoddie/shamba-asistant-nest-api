export interface ModelOutput {
    [key: string]: string | number;
  }
  
  export interface FertilizerPlan {
    bestOption: ApplicationOption;
    secondOption: ApplicationOption;
    thirdOption: ApplicationOption;
    soilCorrection?: {
      limeApplication?: {
        timing: string;
        amount: number;
        type: string;
      };
      organicMatterApplication?: {
        timing: string;
        amount: number;
        type: string;
      };
    };
  }
  
  export interface ApplicationOption {
    firstApplication: {
      timing: string;
      fertilizers: Array<{
        type: string;
        amount: number;
      }>;
    };
    secondApplication?: {
      timing: string;
      fertilizers: Array<{
        type: string;
        amount: number;
      }>;
    };
  }