import { Domain } from '../../core/domain-model.js';
import { JavaGeneratorConfig } from '../java-generator-config.js';
import { DOMAIN_KEY, packagePathComposer } from '../util/package-composer.js';

export interface DomainTestData {
  package: string;
  domainName: string;
  basePackage: string;
  domainPackageName: string;
  domainPackage: string;
}

export function createDomainTestData(domain: Domain, config: JavaGeneratorConfig): DomainTestData {
  const domainPackage = packagePathComposer(DOMAIN_KEY, config.packageStructure, config.basePackage, domain.name?.toLowerCase());

  const domainTestData: DomainTestData = {
    package: domainPackage,
    basePackage: config.basePackage,
    domainName: domain.name!,
    domainPackageName: domain.name!.toLowerCase(),
    domainPackage,
  };

  return domainTestData;
}
