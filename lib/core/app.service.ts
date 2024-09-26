import { parseStringPromise } from 'xml2js';
import { Context, Domain, Entity, Enum, ValueObject } from './domain-model.js';

export class AppService {
  // Function to parse XML string
  public async createDomainModelFromXML(xml: string): Promise<Domain> {
    const domainObj = (await parseStringPromise(xml)).domain;

    const domain: Domain = new Domain();
    domain.name = domainObj.$.name;

    for (const contextObj of domainObj.context) {
      const context = new Context();
      context.name = contextObj.$.name;
      context.parent = domain;
      domain.contexts.push(context);

      if (contextObj.entity) {
        for (const entityObj of contextObj.entity) {
          const entity = new Entity();
          entity.name = entityObj.$.name;
          entity.parent = context;
          context.entities.push(entity);
        }
      }

      if (contextObj['value-object']) {
        for (const valueObjectObj of contextObj['value-object']) {
          const valueObject = new ValueObject();
          valueObject.name = valueObjectObj.$.name;
          valueObject.parent = context;
          context.valueObjects.push(valueObject);
        }
      }

      if (contextObj.enum) {
        for (const enumObj of contextObj.enum) {
          const $enum = new Enum();
          $enum.name = enumObj.$.name;
          $enum.parent = context;
          context.enums.push($enum);
        }
      }
    }

    // Parse the XML data
    return domain;
  }
}
