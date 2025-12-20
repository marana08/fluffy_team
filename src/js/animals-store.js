let animalsAll = [];

export function saveAnimals(arr) {
  animalsAll = arr;
}

export function getAnimalById(id) {
  return animalsAll.find(a => a._id === id);
}
