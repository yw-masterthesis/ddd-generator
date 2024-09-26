export function getParentName(obj, type) {
  if (!obj.parent) {
    return '';
  }

  if (obj.parent instanceof type) {
    return obj.parent.name;
  }

  return getParentName(obj.parent, type);
}
