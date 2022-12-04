import { createContext, useState } from "react";

export const itemContext = createContext();

export function itemContextProvider(props) {
  const [itemDB, setItemDB] = useState([
    {
      id: "80bf5cfc-eb1c-4004-b59e-6777bf4fb621",
      name: "iPhone 14 Pro Max",
      imgSmall: {},
      imgLarge: {},
      subcategory_id: 1,
      properties: [
        {
          propertyID: 1,
          propertyName: "Storage",
          hasPhoto: 0,
          options: [
            { value: "64GB" },
            { value: "128GB" },
            { value: "256GB" },
            { value: "512GB" },
          ],
        },
        {
          propertyID: 1,
          propertyName: "Color",
          hasPhoto: 0,
          options: [
            { value: "Red", img: {} },
            { value: "Blue", img: {} },
            { value: "White", img: {} },
            { value: "Gold", img: {} },
            { value: "Black", img: {} },
          ],
        },
      ],
      soldVersions: [
        {
          sellerID: 175,
          properties: [
            { id: 1, value: "128GB" },
            { id: 2, value: "Red" },
          ],
          price: 1690.0,
          salePercentage: 20,
          saleReason: 1001, //Moms Day
        },
        {
          sellerID: 175,
          properties: [
            { id: 1, value: "128GB" },
            { id: 2, value: "Red" },
          ],
          price: 1690.0,
          salePercentage: 0,
          saleReason: 0,
        },
        {
          sellerID: 175,
          properties: [
            { id: 1, value: "128GB" },
            { id: 2, value: "Red" },
          ],
          price: 1690.0,
          salePercentage: 0,
          saleReason: 0,
        },
      ],
    },
  ]);
}
