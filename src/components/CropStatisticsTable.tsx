import { CropData } from "../types/types";
import React from "react";
import { Table } from "@mantine/core";
import { calculateCropAverages } from "../utils/utils";
import cropData from "../data/cropData.json";

const CropStatisticsTable: React.FC = () => {
  const cropAverages = calculateCropAverages(cropData as CropData[]); // Calculating crop averages for yield and area

  return (
    <Table highlightOnHover withTableBorder withColumnBorders>
      <Table.Caption>Crop Statistics</Table.Caption>
      <Table.Thead>
        <Table.Tr>
          <Table.Th style={{ textAlign: "center" }}>Crop</Table.Th>
          <Table.Th style={{ textAlign: "center" }}>
            Average Yield (1950-2020)
          </Table.Th>
          <Table.Th style={{ textAlign: "center" }}>
            Average Cultivation Area (1950-2020)
          </Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {cropAverages.map((crop) => (
          <Table.Tr key={crop.cropName}>
            <Table.Td style={{ textAlign: "center" }}>{crop.cropName}</Table.Td>
            <Table.Td style={{ textAlign: "center" }}>
              {crop.averageYield}
            </Table.Td>
            <Table.Td style={{ textAlign: "center" }}>
              {crop.averageArea}
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
};

export default CropStatisticsTable;
