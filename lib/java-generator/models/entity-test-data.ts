import { Entity } from '../../core/domain-model.js';
import { JavaGeneratorConfig } from '../java-generator-config.js';
import { CONTEXT_KEY, DOMAIN_KEY, packagePathComposer } from '../util/package-composer.js';

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
}

export function createEntityTestData(entity: Entity, config: JavaGeneratorConfig): EntityTestData {
  const domainName = entity.parent!.parent!.name!;
  const contextName = entity.parent!.name!;
  const aggregateName = '';
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
    CONTEXT_KEY,
    config.packageStructure,
    config.basePackage,
    domainPackageName,
    contextPackageName,
    config.domainLayerName,
    aggregatePackageName,
  );

  const contextTestData: EntityTestData = {
    package: contextPackage,
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
  };

  return contextTestData;
}
