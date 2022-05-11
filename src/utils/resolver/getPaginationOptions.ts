import {
  PaginationDTO,
  DEFAULT_PAGE_SIZE,
} from '../../shared/dto/pagination.dto';
import { QUERY_LIMIT } from '../../constants/database';
import { BadRequestException } from '@nestjs/common';
import { ERROR_MESSAGES } from '../../constants/errorMessages';

export function getPaginationOptions(pagination: PaginationDTO): PaginationDTO {
  if (!pagination) {
    return {
      startIndex: 0,
      itemCount: DEFAULT_PAGE_SIZE,
    };
  }
  if (
    typeof pagination.itemCount === 'number' &&
    pagination.itemCount > QUERY_LIMIT
  ) {
    throw new BadRequestException(
      ERROR_MESSAGES.paginationMaxSize(QUERY_LIMIT),
    );
  }
  return pagination;
}
