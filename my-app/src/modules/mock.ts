// mockData.ts
export interface Material {
  MaterialID: string;
  MaterialName: string;
  ImageURL?: string;
  Isotopes?: string;
  SampleSize?: string[];
}

export const mockMaterials: Material[] = [
  {
    MaterialID: "1",
    MaterialName: "Древесина",
    ImageURL: "http://localhost:9000/genreanalysis/img/wood.png",
    Isotopes: "C14",
    SampleSize: ["10-20 мг", "Фрагменты 1x1 см"]
  },
  {
    MaterialID: "2", 
    MaterialName: "Костные останки",
    ImageURL: "http://localhost:9000/genreanalysis/img/bone.png",
    Isotopes: "C14, N15",
    SampleSize: ["100-200 мг", "Целая кость предпочтительна"]
  },
  {
    MaterialID: "3",
    MaterialName: "Уголь",
    ImageURL: "http://localhost:9000/genreanalysis/img/coal.png",
    Isotopes: "C14",
    SampleSize: ["5-10 мг", "Без примесей"]
  },
  {
    MaterialID: "4",
    MaterialName: "Текстиль",
    ImageURL: "http://localhost:9000/genreanalysis/img/textile.png",
    Isotopes: "C14",
    SampleSize: ["20-30 мг", "Чистые волокна"]
  },
  {
    MaterialID: "5",
    MaterialName: "Раковины",
    ImageURL: "http://localhost:9000/genreanalysis/img/shell.png",
    Isotopes: "C14",
    SampleSize: ["50-100 мг", "Без осадочных пород"]
  }
];