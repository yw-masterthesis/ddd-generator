import { parseStringPromise } from 'xml2js';
import { Aggregate, Context, Domain, Entity, Enum, ValueObject } from './domain-model.js';

export class AppService {
  // Function to parse XML string
  public async createDomainModelFromXML(xml: string): Promise<Domain> {
    const xmiElem = (await parseStringPromise(xml))['xmi:XMI'];
    const domainElem = xmiElem['DDD:Domain'][0];

    const domain: Domain = new Domain();
    domain.name = domainElem.$.name;

    for (const contextElem of domainElem['DDD:Context']) {
      const context = new Context();
      context.name = contextElem.$.name;
      context.parent = domain;
      domain.contexts.push(context);

      if (contextElem['DDD:Aggregate']) {
        for (const aggregateElem of contextElem['DDD:Aggregate']) {
          const aggregate = new Aggregate();
          aggregate.name = aggregateElem.$.name;
          aggregate.parent = context;
          context.aggregates.push(aggregate);

          parseNestedRoot(aggregateElem, aggregate);

          parseNestedIdentity(aggregateElem, aggregate);

          parseNestedEntities(aggregateElem, aggregate);

          parseNestedEnums(aggregateElem, aggregate);

          parseNestedValueObjects(aggregateElem, aggregate);
        }
      }

      parseNestedEntities(contextElem, context);

      parseNestedEnums(contextElem, context);

      parseNestedValueObjects(contextElem, context);

      parseNestedDomainServices(contextElem, context);

      parseNestedDomainEvents(contextElem, context);
    }

    // Parse the XML data
    return domain;
  }
}

function parseNestedEntities(parentElem: any, parent: Context | Aggregate) {
  if (parentElem['DDD:Entity']) {
    for (const entityElem of parentElem['DDD:Entity']) {
      const entity = new Entity();
      entity.name = entityElem.$.name;
      entity.parent = parent;
      parent.entities.push(entity);
    }
  }
}

function parseNestedEnums(parentElem: any, parent: Context | Aggregate) {
  if (parentElem['DDD:Enum']) {
    for (const enumElem of parentElem['DDD:Enum']) {
      const $enum = new Enum();
      $enum.name = enumElem.$.name;
      $enum.parent = parent;
      parent.enums.push($enum);
    }
  }
}

function parseNestedValueObjects(parentElem: any, parent: Context | Aggregate) {
  if (parentElem['DDD:ValueObject']) {
    for (const valueObjectElem of parentElem['DDD:ValueObject']) {
      const valueObject = new ValueObject();
      valueObject.name = valueObjectElem.$.name;
      valueObject.parent = parent;
      parent.valueObjects.push(valueObject);
    }
  }
}

function parseNestedRoot(parentElem: any, parent: Aggregate) {
  if (parentElem['DDD:AggregateRoot']) {
    for (const rootElem of parentElem['DDD:AggregateRoot']) {
      const entity = new Entity();
      entity.name = rootElem.$.name;
      entity.parent = parent;
      entity.isAggregateRoot = true;
      parent.entities.push(entity);
    }
  }
}

function parseNestedIdentity(parentElem: any, parent: Aggregate) {
  if (parentElem['DDD:Identity']) {
    for (const identityElem of parentElem['DDD:Identity']) {
      const valueObject = new ValueObject();
      valueObject.name = identityElem.$.name;
      valueObject.parent = parent;
      valueObject.isAggregateIdentity = true;
      parent.valueObjects.push(valueObject);
    }
  }
}

function parseNestedDomainServices(parentElem: any, parent: Context) {
  if (parentElem['DDD:Service']) {
    for (const identityElem of parentElem['DDD:Service']) {
      const valueObject = new ValueObject();
      valueObject.name = identityElem.$.name;
      valueObject.parent = parent;
      valueObject.isAggregateIdentity = true;
      parent.valueObjects.push(valueObject);
    }
  }
}

function parseNestedDomainEvents(parentElem: any, parent: Context) {
  if (parentElem['DDD:Event']) {
    for (const identityElem of parentElem['DDD:Event']) {
      const valueObject = new ValueObject();
      valueObject.name = identityElem.$.name;
      valueObject.parent = parent;
      valueObject.isAggregateIdentity = true;
      parent.valueObjects.push(valueObject);
    }
  }
}
