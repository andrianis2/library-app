export type Category = {
  id: number | string;
  name: string;
  icon: string;
};

export const categories: Category[] = [
  {
    id: 4,
    name: 'Fiction',
    icon: 'category1.png',
  },
  {
    id: 10,
    name: 'Non-Fiction',
    icon: 'category2.png',
  },
  {
    id: 7,
    name: 'Self-Improvement',
    icon: 'category3.png',
  },
  {
    id: 9,
    name: 'Finance',
    icon: 'category4.png',
  },
  {
    id: 11,
    name: 'Science',
    icon: 'category5.png',
  },
  {
    id: 8,
    name: 'Education',
    icon: 'category6.png',
  },
];
