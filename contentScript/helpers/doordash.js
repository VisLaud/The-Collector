globalThis.AllItemsGrabber = (titles) => {
  const allItems = [];
  for (let i = 0; i < titles.length; i++) {
    allItems.push(CatogeryItemsGrabber(titles[i]));
  }
  return allItems;
};

const CatogeryItemsGrabber = (titles) => {
  const catogeryItems = [];
  for (let i = 0; i < titles.children.length; i++) {
    if (titles.children[i].textContent !== '') {
      const itemElement = titles.children[i].children[1];
      catogeryItems.push(itemGrabber(finalNthChildren(itemElement)));
    }
  }
  return catogeryItems;
};

const itemGrabber = (element) => {
  const itemTextElement = element.children[0];
  const itemImageElement =
    element.children.length > 1 ? element.children[1] : 'No Image';

  return {
    ...textGrabber(itemTextElement),
    image:
      itemImageElement === 'No Image'
        ? 'No Image'
        : imageGrabber(itemImageElement),
  };
};

const textGrabber = (list) => {
  const containsDesc = list.children.length >= 4;
  return {
    foodName: list.children[0].textContent,
    foodDescription: containsDesc
      ? list.children[1].textContent
      : 'No Description',
    foodPrice: containsDesc
      ? list.children[2].textContent
      : list.children[1].textContent,
  };
};

const imageGrabber = (list) => {
  if (
    list.children.length >= 3 ||
    list.firstElementChild.nodeName === 'PICTURE'
  ) {
    if (list.children.length === 0) {
      return 'No Images';
    }
    for (var i = 0; i < list.firstElementChild.children.length; i++) {
      if (list.firstElementChild.children[i].nodeName === 'IMG') {
        return list.firstElementChild.children[i].src;
      }
    }
  } else {
    return imageGrabber(list.firstChild);
  }
};

const finalNthChildren = (list) => {
  if (list.children[0].dataset.testid === 'GenericItemCard') {
    return list;
  } else {
    return finalNthChildren(list.children[0]);
  }
};
