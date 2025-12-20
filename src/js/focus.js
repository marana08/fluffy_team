export let lastFocusedElement = null;

export function setLastFocusedElement(el) {
  lastFocusedElement = el;
}

export function getLastFocusedElement() {
  return lastFocusedElement;
}
