import { Aggregate, Context, Domain, DomainEvent } from '../../core/domain-model.js';
import { JavaGeneratorConfig } from '../java-generator-config.js';
import { CONTEXT_KEY, DOMAIN_KEY, packagePathComposer } from '../util/package-composer.js';
import { getParentName } from '../util/util.js';

export interface DomainEventTestData {
  package: string;
  basePackage: string;
  domainLayerName: string;
  domainName: string;
  contextName: string;
  aggregateName: string;
  domainEventName: string;
  domainPackageName: string;
  contextPackageName: string;
  domainPackage: string;
  contextPackage: string;
}

export function createDomainEventTestData(domainEvent: DomainEvent, config: JavaGeneratorConfig): DomainEventTestData {
  const domainName = getParentName(domainEvent, Domain);
  const contextName = getParentName(domainEvent, Context);
  const aggregateName = getParentName(domainEvent, Aggregate);
  const domainEventName = domainEvent.name!;
  const domainPackageName = domainName?.toLowerCase();
  const contextPackageName = contextName?.toLowerCase();

  const domainPackage = packagePathComposer(DOMAIN_KEY, config.packageStructure, config.basePackage, domainPackageName);
  const contextPackage = packagePathComposer(
    CONTEXT_KEY,
    config.packageStructure,
    config.basePackage,
    domainPackageName,
    contextPackageName,
    config.domainLayerName,
  );

  const contextTestData: DomainEventTestData = {
    package: contextPackage,
    basePackage: config.basePackage,
    domainLayerName: config.domainLayerName,
    domainName,
    contextName,
    aggregateName,
    domainEventName,
    domainPackageName,
    contextPackageName,
    domainPackage,
    contextPackage,
  };

  return contextTestData;
}
