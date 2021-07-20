export const COLUMN_NAMES = {
  BREAKFAST: 'Breakfast',
  MORNING_SNACK: 'Morning Snack',
  LUNCH: 'Lunch',
  AFTERNOON_SNACK: 'Afternoon Snack',
  DINNER: 'Dinner',
} as const;

export type ColumnKeys = keyof typeof COLUMN_NAMES;
export type ColumnValues = typeof COLUMN_NAMES[ColumnKeys];

export type Menu = {
  id: number,
  name: string,
  column: string,
}

export const menus: Menu[] = [
  {id: 1, name: 'Item 1', column: COLUMN_NAMES.BREAKFAST},
  {id: 2, name: 'Item 2', column: COLUMN_NAMES.BREAKFAST},
  {id: 3, name: 'Item 3', column: COLUMN_NAMES.BREAKFAST},
  {id: 4, name: 'Item 4', column: COLUMN_NAMES.BREAKFAST},
  {id: 5, name: 'Item 5', column: COLUMN_NAMES.BREAKFAST},
];
