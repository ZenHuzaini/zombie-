export const ERROR_MESSAGES = {
  paginationMaxSize: (limit: number): string =>
    `The page size cannot be bigger than ${limit}`,
  notFound: 'Item does not exists',
  limitExeeded: 'Only 5 items can be occupied',
};
