import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

import { InjectRepository } from '@nestjs/typeorm';
import { mapToDto, setCreatedAndModifiedFields } from 'src/shared/dto/mapping';
import { PaginationDTO } from 'src/shared/dto/pagination.dto';
import { getPaginationOptions } from 'src/utils/resolver/getPaginationOptions';
import { currencyCalculation } from 'src/utils/service/currencyCalculation';
import { Repository } from 'typeorm';
import {
  CreateItemInputDTO,
  ExternalItemDTO,
  ItemDTO,
  ItemsPagedResultDTO,
  TotalItemPriceDTO,
} from './item.dto';
import { Item } from './item.entity';

@Injectable()
export class ItemService {
  private readonly externalItems: unknown;
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
  }

  async createItem(ItemDTO: CreateItemInputDTO): Promise<ItemDTO> {
    const { price, name, zombieId } = ItemDTO;

    const saveData = await this.itemRepository.save({
      ...setCreatedAndModifiedFields(),
      price,
      name,
      zombieId,
    });

    const Item = mapToDto<Item, ItemDTO>(saveData);
    return Item;
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

    if (items.length < 1) {
      return {
        EU: 0,
        PLN: 0,
        USD: 0,
      };
    }

    return currencyCalculation(items);
  };
}
