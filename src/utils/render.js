export const createElement = (template) => {
  const div = document.createElement(`div`);
  div.innerHTML = template;
  return div.firstElementChild;
};

export const render = (container, component, place) => {
  container.insertAdjacentElement(place, component.getElem());
};

export const replace = (pointEdit, pointCard) => {
  const pointCartEl = pointCard.getElem();
  const editCartEl = pointEdit.getElem();
  const parentEl = pointCartEl.parentElement;
  const isExisting = !!(pointCartEl && editCartEl && parentEl);
  if (isExisting) {
    parentEl.replaceChild(editCartEl, pointCartEl);
  }
};

export const remove = (component) => {
  const parent = component.getElem().parentElement;
  parent.removeChild(component.getElem());
  component.removeElem();
}


