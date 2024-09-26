import { Domain } from '../core/domain-model.js';
import { JavaGeneratorConfig } from './java-generator-config.js';
import { ContextTestData, createContextTestData } from './models/context-test-data.js';
import { createDomainTestData, DomainTestData } from './models/domain-test-data.js';
import { createEntityTestData, EntityTestData } from './models/entity-test-data.js';

export interface TestSuiteData {
  domainTests: DomainTestData[];
  contextTests: ContextTestData[];
  entityTests: EntityTestData[];
}

export class JavaGenerator {
  public generateTestSuiteData(domain: Domain, config: JavaGeneratorConfig): TestSuiteData {
    const testSuiteData: TestSuiteData = {
      domainTests: [],
      contextTests: [],
      entityTests: [],
    };

    const domainTestData: DomainTestData = createDomainTestData(domain, config);
    testSuiteData.domainTests.push(domainTestData);

    for (const context of domain.contexts) {
      const contextTestData = createContextTestData(context, config);
      testSuiteData.contextTests.push(contextTestData);

      for (const entity of context.entities) {
        const entityTestData = createEntityTestData(entity, config);
        testSuiteData.entityTests.push(entityTestData);
      }
    }

    return testSuiteData;
  }
}
