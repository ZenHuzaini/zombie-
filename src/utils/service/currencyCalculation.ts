import { ItemDTO, TotalItemPriceDTO } from 'src/modules/item/item.dto';

export const currencyCalculation = (items: ItemDTO[]): TotalItemPriceDTO => {
  let totalValue = 0;
  const a = items.reduce((accumulator, curValue) => {
    return accumulator + curValue.price;
  }, totalValue);
  return {
    EU: calculateEU(totalValue),
    PLN: calculatePLN(totalValue),
    USD: calculateUSD(totalValue),
  };
};

export const calculatePLN = (totalValue: number): number => {
  return totalValue;
};

export const calculateEU = (totalValue: number): number => {
  return totalValue;
};

export const calculateUSD = (totalValue: number): number => {
  return totalValue;
};
