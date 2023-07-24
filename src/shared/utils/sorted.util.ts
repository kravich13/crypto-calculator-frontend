interface ISortByProps<T extends number | string> {
  a: T;
  b: T;
  isDescending: boolean;
}

export const sortByNumbers = ({ a, b, isDescending }: ISortByProps<number>) =>
  isDescending ? b - a : a - b;

export const sortByString = (a: string, b: string) => {
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
