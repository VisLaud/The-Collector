let MenuItems = [];
let MenuTitle = [];

document.addEventListener('dblclick', function (e) {
  let FinalArray = [];
  const titles = [];
  const target = e.target.className;

  const tiles = document.getElementsByClassName(target);

  for (var i = 0; i < tiles.length; i++) {
    titles.push(tiles[i]);
  }

  if (titles[0].innerText.length < 50) {
    MenuTitle.length = 0;
    titles.map((title) => MenuTitle.push(title.innerHTML.toString()));
    console.log('Catogery Titles Added ');
  } else {
    MenuItems.length = 0;
    MenuItems = globalThis.AllItemsGrabber(titles);
    console.log('Catogery Items Added');
  }

  if (MenuTitle.length > 1 && MenuItems.length > 1) {
    FinalArray.length = 0;
    MenuTitle.map((title, index) => {
      FinalArray.push({
        categoryTitle: title,
        categoryItems: MenuItems[index],
      });
    });
  }

  if (FinalArray.length > 1) {
    chrome.storage.local.set({
      downloadItem: FinalArray,
    });
    console.log('JSON file ready for download');
  }
});
