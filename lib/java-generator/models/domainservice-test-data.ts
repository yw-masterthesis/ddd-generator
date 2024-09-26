import { Aggregate, Context, Domain, DomainService } from '../../core/domain-model.js';
import { JavaGeneratorConfig } from '../java-generator-config.js';
import { CONTEXT_KEY, DOMAIN_KEY, packagePathComposer } from '../util/package-composer.js';
import { getParentName } from '../util/util.js';

export interface DomainServiceTestData {
  package: string;
  basePackage: string;
  domainLayerName: string;
  domainName: string;
  contextName: string;
  aggregateName: string;
  domainServiceName: string;
  domainPackageName: string;
  contextPackageName: string;
  domainPackage: string;
  contextPackage: string;
}

export function createDomainServiceTestData(domainService: DomainService, config: JavaGeneratorConfig): DomainServiceTestData {
  const domainName = getParentName(domainService, Domain);
  const contextName = getParentName(domainService, Context);
  const aggregateName = getParentName(domainService, Aggregate);
  const domainServiceName = domainService.name!;
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

  const contextTestData: DomainServiceTestData = {
    package: contextPackage,
    basePackage: config.basePackage,
    domainLayerName: config.domainLayerName,
    domainName,
    contextName,
    aggregateName,
    domainServiceName,
    domainPackageName,
    contextPackageName,
    domainPackage,
    contextPackage,
  };

  return contextTestData;
}
