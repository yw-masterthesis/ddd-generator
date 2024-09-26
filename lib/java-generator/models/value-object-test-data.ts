import { Aggregate, Context, Domain, ValueObject } from '../../core/domain-model.js';
import { JavaGeneratorConfig } from '../java-generator-config.js';
import { AGGREGATE_KEY, CONTEXT_KEY, DOMAIN_KEY, packagePathComposer } from '../util/package-composer.js';
import { getParentName } from '../util/util.js';

export interface ValueObjectTestData {
  package: string;
  basePackage: string;
  domainLayerName: string;
  domainName: string;
  contextName: string;
  aggregateName: string;
  valueObjectName: string;
  domainPackageName: string;
  contextPackageName: string;
  aggregatePackageName: string;
  domainPackage: string;
  contextPackage: string;
  aggregatePackage: string;
  isPartOfAggregate: boolean;
  isAggregateIdentity: boolean;
}

export function createValueObjectTestData(valueObject: ValueObject, config: JavaGeneratorConfig): ValueObjectTestData {
  const domainName = getParentName(valueObject, Domain);
  const contextName = getParentName(valueObject, Context);
  const aggregateName = getParentName(valueObject, Aggregate);
  const valueObjectName = valueObject.name!;
  const domainPackageName = domainName?.toLowerCase();
  const contextPackageName = contextName?.toLowerCase();
  const aggregatePackageName = aggregateName?.toLowerCase();

  const domainPackage = packagePathComposer(DOMAIN_KEY, config.packageStructure, config.basePackage, domainPackageName);
  const contextPackage = packagePathComposer(
    CONTEXT_KEY,
    config.packageStructure,
    config.basePackage,
    domainPackageName,
    contextPackageName,
    config.domainLayerName,
  );
  const aggregatePackage = packagePathComposer(
    AGGREGATE_KEY,
    config.packageStructure,
    config.basePackage,
    domainPackageName,
    contextPackageName,
    config.domainLayerName,
    aggregatePackageName,
  );

  const contextTestData: ValueObjectTestData = {
    package: valueObject.parent instanceof Aggregate ? aggregatePackage : contextPackage,
    basePackage: config.basePackage,
    domainLayerName: config.domainLayerName,
    domainName,
    contextName,
    aggregateName,
    valueObjectName,
    domainPackageName,
    contextPackageName,
    aggregatePackageName,
    domainPackage,
    contextPackage,
    aggregatePackage,
    isPartOfAggregate: valueObject.parent instanceof Aggregate,
    isAggregateIdentity: valueObject.isAggregateIdentity,
  };

  return contextTestData;
}
