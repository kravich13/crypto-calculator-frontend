interface ISortByProps<T extends number | string> {
  a: T;
  b: T;
  isAscending: boolean;
}

export const SortByNumbers = ({ a, b, isAscending }: ISortByProps<number>) =>
  isAscending ? a - b : b - a;

export const SortByString = (a: string, b: string) => {
  const nameA = a.toLowerCase();
  const nameB = b.toLowerCase();

  if (nameA < nameB) {
    return -1;
  }

  if (nameA > nameB) {
    return 1;
  }

  return 0;
};
