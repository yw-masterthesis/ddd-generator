/* eslint-disable */

export class Domain {
  name?: string;

  contexts: Context[] = [];
}

export class Context {
  name?: string;

  parent?: Domain;

  aggregates: Aggregate[] = [];
  entities: Entity[] = [];
  valueObjects: ValueObject[] = [];
  enums: Enum[] = [];
  domainServices: DomainService[] = [];
  domainEvents: DomainEvent[] = [];
}

export class Aggregate {
  name?: string;

  parent?: Context;

  root?: Entity;
  identity?: ValueObject;

  entities: Entity[] = [];
  valueObjects: ValueObject[] = [];
  enums: Enum[] = [];
}

export class Entity {
  name?: string;

  parent?: Context | Aggregate;

  isAggregateRoot: boolean = false;
}

export class ValueObject {
  name?: string;

  parent?: Context | Aggregate;

  isAggregateIdentity: boolean = false;
}

export class Enum {
  name?: string;

  parent?: Context | Aggregate;
}

export class DomainService {
  name?: string;

  parent?: Context;
}

export class DomainEvent {
  name?: string;

  parent?: Context;
}
