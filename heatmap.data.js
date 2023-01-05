const axios = require('axios')

async function loadData() {
    const response = await axios.get('https://data.gov.sg/api/action/datastore_search?resource_id=f1765b54-a209-4718-8d38-a39237f502b3&limit=100000');
  // console.log(response.data.result.records)
    let arr = response.data.result.records
    let towns = ['ANG MO KIO']
    
    // console.log(array[0]['town'])
    for (i=0; i<arr.length; i++ ){
      let townElement = arr[i]['town']

      if (!towns.includes(townElement))
        towns.push(townElement);
       
    }
  console.log(towns)

  
}