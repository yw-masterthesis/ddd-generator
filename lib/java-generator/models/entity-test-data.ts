import { Aggregate, Context, Domain, Entity } from '../../core/domain-model.js';
import { JavaGeneratorConfig } from '../java-generator-config.js';
import { AGGREGATE_KEY, CONTEXT_KEY, DOMAIN_KEY, packagePathComposer } from '../util/package-composer.js';
import { getParentName } from '../util/util.js';

export interface EntityTestData {
  package: string;
  basePackage: string;
  domainLayerName: string;
  domainName: string;
  contextName: string;
  aggregateName: string;
  entityName: string;
  domainPackageName: string;
  contextPackageName: string;
  aggregatePackageName: string;
  domainPackage: string;
  contextPackage: string;
  aggregatePackage: string;
  isPartOfAggregate: boolean;
  isAggregateRoot: boolean;
}

export function createEntityTestData(entity: Entity, config: JavaGeneratorConfig): EntityTestData {
  const domainName = getParentName(entity, Domain);
  const contextName = getParentName(entity, Context);
  const aggregateName = getParentName(entity, Aggregate);
  const entityName = entity.name!;
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

  const contextTestData: EntityTestData = {
    package: entity.parent instanceof Aggregate ? aggregatePackage : contextPackage,
    basePackage: config.basePackage,
    domainLayerName: config.domainLayerName,
    domainName,
    contextName,
    aggregateName,
    entityName,
    domainPackageName,
    contextPackageName,
    aggregatePackageName,
    domainPackage,
    contextPackage,
    aggregatePackage,
    isPartOfAggregate: entity.parent instanceof Aggregate,
    isAggregateRoot: entity.isAggregateRoot,
  };

  return contextTestData;
}
