/* eslint-disable */

export class Domain {
  name?: string;

  contexts: Context[] = [];
}

export class Context {
  name?: string;

  parent?: Domain;
  entities: Entity[] = [];
  valueObjects: ValueObject[] = [];
  enums: Enum[] = [];
}

export class Entity {
  name?: string;

  parent?: Context;
}

export class ValueObject {
  name?: string;

  parent?: Context;
}

export class Enum {
  name?: string;

  parent?: Context;
}
