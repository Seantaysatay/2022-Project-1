async function loadData() {
    const response = await axios.get('https://data.gov.sg/api/action/datastore_search?resource_id=f1765b54-a209-4718-8d38-a39237f502b3&limit=140000');
    // console.log(response.data.result.records)
    return response.data.result.records
}

function transformData_heatmap(rawData) {
  //transform data to get date and town array
  let transformed =rawData.map(function(transaction){
        return {
            'date': new Date(transaction.month),
            'town': transaction.town,
        }
    })
  // console.log(transformed)
    
  // collect the list of towns 
  towns=[]
  for (i=0; i<transformed.length; i++ ){
    let town = transformed[i]['town']

    if (!towns.includes(town))
      towns.push(town);
  }
  console.log(towns)

  //Grouping
  let groups = {};
    for (let t=0; t<towns.length; t++) {
      groups[towns[t]] = [];  // create one array for each town
    }

  //categorise each transaction by its town
  for (let transaction of transformed) {
    let townName = transaction.town
    groups[townName].push(transaction)
  }
  // console.log(groups)
  
  //create the array for number of transactions per town
  let series = []

    //calculate the total amount, to be divided into an average per year
  let reducer = function (sum, current) {
    return sum + current.amount
  }

  for (let eachTown in groups) {
    let totalTransactions = groups[eachTown].length
    let coordinate = {
      x: eachTown,
      y: totalTransactions
    
    }
    series.push(coordinate) 
  }
  console.log(series)
  return series
  
   
};