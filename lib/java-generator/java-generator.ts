import { Domain } from '../core/domain-model.js';
import { JavaGeneratorConfig } from './java-generator-config.js';
import { ContextTestData, createContextTestData } from './models/context-test-data.js';
import { createDomainTestData, DomainTestData } from './models/domain-test-data.js';
import { createEntityTestData, EntityTestData } from './models/entity-test-data.js';
import { createEnumTestData, EnumTestData } from './models/enum-test-data.js';
import { createValueObjectTestData, ValueObjectTestData } from './models/value-object-test-data.js';

export interface TestSuiteData {
  domainTests: DomainTestData[];
  contextTests: ContextTestData[];
  entityTests: EntityTestData[];
  enumTests: EnumTestData[];
  valueObjectTests: ValueObjectTestData[];
}

export class JavaGenerator {
  public generateTestSuiteData(domain: Domain, config: JavaGeneratorConfig): TestSuiteData {
    const testSuiteData: TestSuiteData = {
      domainTests: [],
      contextTests: [],
      entityTests: [],
      enumTests: [],
      valueObjectTests: [],
    };

    const domainTestData: DomainTestData = createDomainTestData(domain, config);
    testSuiteData.domainTests.push(domainTestData);

    for (const context of domain.contexts) {
      const contextTestData = createContextTestData(context, config);
      testSuiteData.contextTests.push(contextTestData);

      for (const aggregate of context.aggregates) {
        // const aggregateTestData = createAggregateTestData(aggregate, config);
        // testSuiteData.aggregateTests.push(aggregateTestData);

        if (aggregate.root) {
          const entityTestData = createEntityTestData(aggregate.root, config);
          testSuiteData.entityTests.push(entityTestData);
        }

        if (aggregate.identity) {
          const valueObjectTestData = createValueObjectTestData(aggregate.identity, config);
          testSuiteData.valueObjectTests.push(valueObjectTestData);
        }

        for (const entity of aggregate.entities) {
          const entityTestData = createEntityTestData(entity, config);
          testSuiteData.entityTests.push(entityTestData);
        }

        for (const $enum of aggregate.enums) {
          const enumTestData = createEnumTestData($enum, config);
          testSuiteData.enumTests.push(enumTestData);
        }

        for (const valueObject of aggregate.valueObjects) {
          const valueObjectTestData = createValueObjectTestData(valueObject, config);
          testSuiteData.valueObjectTests.push(valueObjectTestData);
        }
      }

      for (const entity of context.entities) {
        const entityTestData = createEntityTestData(entity, config);
        testSuiteData.entityTests.push(entityTestData);
      }

      for (const $enum of context.enums) {
        const enumTestData = createEnumTestData($enum, config);
        testSuiteData.enumTests.push(enumTestData);
      }

      for (const valueObject of context.valueObjects) {
        const valueObjectTestData = createValueObjectTestData(valueObject, config);
        testSuiteData.valueObjectTests.push(valueObjectTestData);
      }
    }

    return testSuiteData;
  }
}
