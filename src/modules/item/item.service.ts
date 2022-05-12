import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { mapToDto, setCreatedAndModifiedFields } from 'src/shared/dto/mapping';
import { PaginationDTO } from 'src/shared/dto/pagination.dto';
import { getPaginationOptions } from 'src/utils/resolver/getPaginationOptions';
import { currencyCalculation } from 'src/utils/service/currencyCalculation';
import { Repository } from 'typeorm';
import {
  CreateItemInputDTO,
  ExternalItemApiResponse,
  ExternalItemDTO,
  ExternalItemsPagedResultDTO,
  ExternalRateApiResponse,
  ItemDTO,
  ItemsPagedResultDTO,
  TotalItemPriceDTO,
} from './item.dto';
import { Item } from './item.entity';
import { ERROR_MESSAGES } from 'src/constants/errorMessages';

@Injectable()
export class ItemService {
  private readonly externalItems: unknown;
  private rate: unknown;

  constructor(
    @InjectRepository(Item)
    private itemRepository: Repository<Item>,
    private httpService: HttpService,
  ) {
    this.externalItems = this.httpService
      .get('https://zombie-items-api.herokuapp.com/api/items')
      .toPromise()
      .then((response) => {
        return response.data;
      });
    this.rate = this.httpService
      .get('http://api.nbp.pl/api/exchangerates/tables/C/today/')
      .toPromise()
      .then((response) => {
        return response.data[0].rates;
      });
  }

  //Scehduling every midninght, the rate must be updated
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  handleSchedule() {
    this.rate = this.httpService
      .get('http://api.nbp.pl/api/exchangerates/tables/C/today/')
      .toPromise()
      .then((response) => {
        return response.data[0].rates;
      });
  }

  async createItem(ItemDTO: CreateItemInputDTO): Promise<ItemDTO> {
    const { price, name, zombieId } = ItemDTO;

    const zombieItems = await this.getItemsByZombieId(zombieId);

    if (zombieItems.length === 5 || zombieItems.length > 5) {
      throw new Error(ERROR_MESSAGES.limitExeeded);
    }

    const saveData = await this.itemRepository.save({
      ...setCreatedAndModifiedFields(),
      price,
      name,
      zombieId,
    });

    const Item = mapToDto<Item, ItemDTO>(saveData);
    return Item;
  }

  async buyItem(zombieId: string, itemId: number): Promise<ItemDTO> {
    const item = (await this.externalItems) as ExternalItemApiResponse;
    const zombieItems = await this.getItemsByZombieId(zombieId);

    if (zombieItems.length === 5 || zombieItems.length > 5) {
      throw new Error(ERROR_MESSAGES.limitExeeded);
    }

    const findItem = item.items.find((el) => el.id === itemId);
    if (!findItem) {
      throw new Error(ERROR_MESSAGES.notFound);
    }

    const saveData = await this.itemRepository.save({
      ...setCreatedAndModifiedFields(),
      price: findItem.price,
      name: findItem.name,
      zombieId,
    });

    const Item = mapToDto<Item, ItemDTO>(saveData);
    return Item;
  }

  async getExternalItems(): Promise<ExternalItemsPagedResultDTO> {
    const externalItems = (await this.externalItems) as ExternalItemApiResponse;
    return {
      count: externalItems.items.length,
      records: externalItems.items,
    };
  }

  async getAllItems(
    paginationDTO: PaginationDTO,
  ): Promise<ItemsPagedResultDTO> {
    const paginationOptions = getPaginationOptions(paginationDTO);
    const [item, count] = await this.itemRepository.findAndCount({
      skip: paginationOptions.startIndex,
      take: paginationOptions.itemCount,
    });
    const records = item.map((data) => mapToDto<Item, ItemDTO>(data));

    return {
      count,
      records,
    };
  }

  public getItemsByZombieId = async (zombieId: string): Promise<ItemDTO[]> => {
    const items = await this.itemRepository.find({
      zombieId: zombieId.toString(),
    });
    const records = items.map((item) => mapToDto<Item, ItemDTO>(item));
    return records;
  };

  public getTotalItemPrice = async (
    zombieId: string,
  ): Promise<TotalItemPriceDTO> => {
    const items = await this.itemRepository.find({
      zombieId: zombieId.toString(),
    });
    const rates = (await this.rate) as ExternalRateApiResponse[];

    if (items.length < 1) {
      return {
        EU: 0,
        PLN: 0,
        USD: 0,
      };
    }

    return currencyCalculation(items, rates);
  };
}
