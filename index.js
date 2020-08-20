const puppeteer = require('puppeteer');
const fs = require('fs');
let imgList = {};
let namesList = {};
/*
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://animalcrossing.fandom.com/wiki/Fish_(New_Horizons)');

  imgList = await page.evaluate( () => {
    
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
  //await secondWiki.close();

  console.log('Job has ended with ' + imgList.length + ' fishes images received.');
})();
*/
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://nookipedia.com/wiki/Fish/New_Horizons');
  
  namesList = await page.evaluate( () => {    
    const tableNamesList = document.querySelectorAll('.sortable.jquery-tablesorter tbody tr');     
    
    const namesListLimit = tableNamesList.length;
    
    let namesArray = [];    

    let nameList = [];

    for (let index = 0; index < tableNamesList.length; index++) {
      
      const semEspaco = tableNamesList[index].children[3].innerText.trim().split(' ');

      namesArray = {
        name: tableNamesList[index].children[1].innerText,
        price: Number(semEspaco[0]),
      }

      nameList = [...nameList, namesArray];
    }

    return nameList;
  });

  fs.writeFile(
    'fishesDetails.json',
    JSON.stringify(namesList, null, 2),
    err => {
      if(err) throw new Error('Something went wrong');
    }
  )

  await browser.close();
})();


