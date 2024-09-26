import { Aggregate, Context, Domain, Enum } from '../../core/domain-model.js';
import { JavaGeneratorConfig } from '../java-generator-config.js';
import { AGGREGATE_KEY, CONTEXT_KEY, DOMAIN_KEY, packagePathComposer } from '../util/package-composer.js';
import { getParentName } from '../util/util.js';

export interface EnumTestData {
  package: string;
  basePackage: string;
  domainLayerName: string;
  domainName: string;
  contextName: string;
  aggregateName: string;
  enumName: string;
  domainPackageName: string;
  contextPackageName: string;
  aggregatePackageName: string;
  domainPackage: string;
  contextPackage: string;
  aggregatePackage: string;
  isPartOfAggregate: boolean;
}

export function createEnumTestData($enum: Enum, config: JavaGeneratorConfig): EnumTestData {
  const domainName = getParentName($enum, Domain);
  const contextName = getParentName($enum, Context);
  const aggregateName = getParentName($enum, Aggregate);
  const enumName = $enum.name!;
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

  const contextTestData: EnumTestData = {
    package: $enum.parent instanceof Aggregate ? aggregatePackage : contextPackage,
    basePackage: config.basePackage,
    domainLayerName: config.domainLayerName,
    domainName,
    contextName,
    aggregateName,
    enumName,
    domainPackageName,
    contextPackageName,
    aggregatePackageName,
    domainPackage,
    contextPackage,
    aggregatePackage,
    isPartOfAggregate: $enum.parent instanceof Aggregate,
  };

  return contextTestData;
}
