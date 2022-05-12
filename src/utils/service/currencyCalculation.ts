import {
  ExternalRateApiResponse,
  ItemDTO,
  TotalItemPriceDTO,
} from 'src/modules/item/item.dto';
import { AcceptedCurrencyType } from 'src/modules/item/item.types';

export const currencyCalculation = (
  items: ItemDTO[],
  rates: ExternalRateApiResponse[],
): TotalItemPriceDTO => {
  let totalValue = 0;
  const sum = items.reduce((accumulator, curValue) => {
    return accumulator + curValue.price;
  }, totalValue);

  return {
    EU: calculateRate(sum, rates, 'EUR'),
    PLN: calculateRate(sum, rates, 'PLN'),
    USD: calculateRate(sum, rates, 'USD'),
  };
};

export const calculateRate = (
  totalValue: number,
  rates: ExternalRateApiResponse[],
  currency: AcceptedCurrencyType,
): number => {
  const rate = rates.find((rate) => rate.code === currency);
  if (!rate) {
    return totalValue; //PLN is not in the API
  }
  return parseInt(((totalValue * rate.bid) / rate.ask).toString()); //TODO: not sure how to calculate the rate
};
