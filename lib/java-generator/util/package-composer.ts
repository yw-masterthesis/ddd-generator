export const BASE_KEY = '<base>';
export const DOMAIN_KEY = '<domain>';
export const CONTEXT_KEY = '<context>';
export const LAYER_KEY = '<layer>';
export const AGGREGATE_KEY = '<aggregate>';

export function packagePathComposer(
  packageLevel: string,
  packageStructure: string,
  basePackage: string,
  domainPackageName?: string,
  contextPackageName?: string,
  layerPackageName?: string,
  aggregatePackageName?: string,
): string {
  let $package = `${packageStructure.split(packageLevel, 1)[0]}${packageLevel}`;
  if (packageLevel === CONTEXT_KEY) {
    const layerPackage = `${packageStructure.split(LAYER_KEY, 1)[0]}${LAYER_KEY}`;
    if (layerPackage.length > $package.length) {
      $package = layerPackage;
    }
  }

  if (basePackage) {
    $package = $package.replace(BASE_KEY, basePackage);
  }

  if (domainPackageName) {
    $package = $package.replace(DOMAIN_KEY, domainPackageName);
  }

  if (contextPackageName) {
    $package = $package.replace(CONTEXT_KEY, contextPackageName);
  }

  if (layerPackageName) {
    $package = $package.replace(LAYER_KEY, layerPackageName);
  }

  if (aggregatePackageName) {
    $package = $package.replace(AGGREGATE_KEY, aggregatePackageName);
  }

  return $package;
}
