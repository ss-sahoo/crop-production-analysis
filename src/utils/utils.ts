import { CropData } from "../types/types";
/**
 * Processes crop data to find the crop with maximum and minimum production for each year.
 * @param data Array of CropData objects
 * @returns Array of objects containing year, crop with maximum production, and crop with minimum production
 */
export const processCropData = (data: CropData[]) => {
  // Map to store crops grouped by year
  const yearMap: { [year: string]: CropData[] } = {};

  // Group crops by year
  data.forEach((entry) => {
    const year = extractYear(entry.Year);
    if (!yearMap[year]) {
      yearMap[year] = [];
    }
    yearMap[year].push(entry);
  });

  // Processed data containing year, crop with maximum production, and crop with minimum production
  const processedData = Object.entries(yearMap).map(([year, crops]) => {
    // Find crop with maximum production
    const maxCrop = crops.reduce((max, crop) => {
      const maxProduction = Number(max["Crop Production (UOM:t(Tonnes))"]) || 0;
      const cropProduction =
        Number(crop["Crop Production (UOM:t(Tonnes))"]) || 0;
      return cropProduction > maxProduction ? crop : max;
    }, crops[0]);

    // Find crop with minimum production (excluding crops with production of 0)
    const minCrop = crops.reduce((min, crop) => {
      const minProduction = Number(min["Crop Production (UOM:t(Tonnes))"]) || 0;
      const cropProduction =
        Number(crop["Crop Production (UOM:t(Tonnes))"]) || 0;
      return cropProduction < minProduction && cropProduction !== 0
        ? crop
        : min;
    }, crops[0]);

    return {
      year,
      maxCropName: maxCrop["Crop Name"],
      minCropName: minCrop["Crop Name"],
    };
  });

  return processedData;
};

/**
 * Calculates the average yield and average area for each crop.
 * @param data Array of CropData objects
 * @returns Array of objects containing crop name, average yield, and average area
 */
export const calculateCropAverages = (data: CropData[]) => {
  const cropStats: {
    [cropName: string]: {
      totalYield: number;
      totalCount: number;
      totalArea: number;
    };
  } = {};

  // Calculate total yield, total count, and total area for each crop
  data.forEach((entry) => {
    const cropName = entry["Crop Name"];
    const yieldValue =
      parseFloat(
        String(entry["Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"])
      ) || 0;
    const areaValue =
      parseFloat(String(entry["Area Under Cultivation (UOM:Ha(Hectares))"])) ||
      0;
    if (!cropStats[cropName]) {
      cropStats[cropName] = { totalYield: 0, totalCount: 0, totalArea: 0 };
    }

    cropStats[cropName].totalYield += yieldValue;
    cropStats[cropName].totalArea += areaValue;
    cropStats[cropName].totalCount++;
  });

  // Calculate average yield and average area for each crop
  const cropAverages = Object.entries(cropStats).map(
    ([cropName, { totalYield, totalCount, totalArea }]) => {
      const averageYield = totalYield / totalCount || 0;
      const averageArea = totalArea / totalCount || 0;

      return {
        cropName,
        averageYield: averageYield.toFixed(3),
        averageArea: averageArea.toFixed(3),
      };
    }
  );

  return cropAverages;
};

/**
 * Extracts the year from a string in the format "Financial Year (Apr - Mar), 1950".
 * @param yearString String containing the year
 * @returns Extracted year as a string
 */
const extractYear = (yearString: string): string => {
  const matches = yearString.match(/\d{4}/);
  return matches ? matches[0] : "";
};
