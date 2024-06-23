import { CropData } from "../types/types";
import React from "react";
import { Table } from "@mantine/core";
import cropData from "../data/cropData.json";
import { processCropData } from "../utils/utils";

const CropProductionTable: React.FC = () => {
  const processedData = processCropData(cropData as CropData[]); // Processing crop data to get max and min crop names for each year

  return (
    <Table highlightOnHover withTableBorder withColumnBorders>
      <Table.Caption>Crop Production by Year</Table.Caption>
      <Table.Thead>
        <Table.Tr>
          <Table.Th style={{ textAlign: "center" }}>Year</Table.Th>
          <Table.Th style={{ textAlign: "center" }}>
            Crop with Maximum Production
          </Table.Th>
          <Table.Th style={{ textAlign: "center" }}>
            Crop with Minimum Production
          </Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {processedData.map((item) => (
          <Table.Tr key={item.year}>
            <Table.Td style={{ textAlign: "center" }}>{item.year}</Table.Td>
            <Table.Td style={{ textAlign: "center" }}>
              {item.maxCropName}
            </Table.Td>
            <Table.Td style={{ textAlign: "center" }}>
              {item.minCropName}
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
};

export default CropProductionTable;
