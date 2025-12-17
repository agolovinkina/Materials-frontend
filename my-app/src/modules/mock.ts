// mockData.ts
import logo from '../assets/default.jpg';
export interface Material {
  MaterialID: number;
  MaterialName: string;
  MaterialImageURL?: string;
  Isotopes?: string;
  SampleSize?: string[];
}

export const mockMaterials: Material[] = [
  {
    MaterialID: 1,
    MaterialName: "Древесина",
    MaterialImageURL: "/public/default.jpg",
    Isotopes: "C14",
    SampleSize: ["10-20 мг", "Фрагменты 1x1 см"]
  },
  {
    MaterialID: 2, 
    MaterialName: "Костные останки",
    MaterialImageURL: logo,
    Isotopes: "C14, N15",
    SampleSize: ["100-200 мг", "Целая кость предпочтительна"]
  },
  {
    MaterialID: 3,
    MaterialName: "Уголь",
    MaterialImageURL: logo,
    Isotopes: "C14",
    SampleSize: ["5-10 мг", "Без примесей"]
  },
  
];