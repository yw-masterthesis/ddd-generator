import { Context, Domain } from '../../core/domain-model.js';
import { JavaGeneratorConfig } from '../java-generator-config.js';
import { CONTEXT_KEY, DOMAIN_KEY, packagePathComposer } from '../util/package-composer.js';
import { getParentName } from '../util/util.js';

export interface ContextTestData {
  package: string;
  basePackage: string;
  domainLayerName: string;
  domainName: string;
  contextName: string;
  domainPackageName: string;
  contextPackageName: string;
  domainPackage: string;
  contextPackage: string;
}

export function createContextTestData(context: Context, config: JavaGeneratorConfig): ContextTestData {
  const domainName = getParentName(context, Domain);
  const contextName = context.name!;
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

  const contextTestData: ContextTestData = {
    package: contextPackage,
    basePackage: config.basePackage,
    domainLayerName: config.domainLayerName,
    domainName,
    contextName,
    domainPackageName,
    contextPackageName,
    domainPackage,
    contextPackage,
  };

  return contextTestData;
}
