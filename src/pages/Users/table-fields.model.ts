export enum FieldTypesEnum {
  dictionary = "dictionary",
  email = "email",
  text = "text",
  range = "range",
}

export enum TableUsersColumnsEnum {
  ind = 'ind',
  name = 'name',
  department = 'department',
  position = 'position',
  email = 'email',
  age = 'age',
}

class TableUsersSortedColumns {
    [TableUsersColumnsEnum.department] = true;
    [TableUsersColumnsEnum.position] = true;
    [TableUsersColumnsEnum.age] = true;
   
}
export const tableUsersSortedColumns = new TableUsersSortedColumns()


class TableUsersColumnsEditRules {
  [TableUsersColumnsEnum.department] = [FieldTypesEnum.dictionary];
  [TableUsersColumnsEnum.position] = [FieldTypesEnum.dictionary];
  [TableUsersColumnsEnum.email] = [FieldTypesEnum.email];
  [TableUsersColumnsEnum.age] = [FieldTypesEnum.range, [14, 90]];
}
export const tableUsersColumnsEditRules = new TableUsersColumnsEditRules()
