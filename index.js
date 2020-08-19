const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://animalcrossing.fandom.com/wiki/Fish_(New_Horizons)');

  const imgList = await page.evaluate( () => {
    
    const nodeList = document.querySelectorAll('.tabber.tabberlive .tabbertab .table-wrapper.table-is-wide .table-scrollable .roundy .roundy.sortable.jquery-tablesorter a img');

    const imgArray = [ ...nodeList ];

    const imgList = imgArray.map( ({ dataset }) => ({
      src: dataset.src
      }));

    return imgList

  });

  

  fs.writeFile(
    'fishesImg.json',
    JSON.stringify(imgList, null, 2),
    err => {
      if(err) throw new Error('Something went wrong');
    }
  )
  
  await browser.close();

  console.log('Job has ended with ' + imgList.length + ' fishes images received.');
})();

