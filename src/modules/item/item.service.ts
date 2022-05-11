import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { mapToDto, setCreatedAndModifiedFields } from 'src/shared/dto/mapping';
import { PaginationDTO } from 'src/shared/dto/pagination.dto';
import { getPaginationOptions } from 'src/utils/resolver/getPaginationOptions';
import { Repository } from 'typeorm';
import { CreateItemInputDTO, ItemDTO, ItemsPagedResultDTO } from './item.dto';
import { Item } from './item.entity';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item)
    private itemRepository: Repository<Item>,
  ) {}

  async createItem(ItemDTO: CreateItemInputDTO): Promise<ItemDTO> {
    const { price, name } = ItemDTO;

    const saveData = await this.itemRepository.save({
      ...setCreatedAndModifiedFields(),
      price,
      name,
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
}
