async function loadData() {
    const response = await axios.get('https://data.gov.sg/api/action/datastore_search?resource_id=f1765b54-a209-4718-8d38-a39237f502b3&limit=140000');
    // console.log(response.data.result.records)
    return response.data.result.records
  };
  
  let yearNames = ['2017', '2018', '2019', '2020', '2021', '2022']
  let rooms = ['2 ROOM', '3 ROOM', '4 ROOM', '5 ROOM']
  
  function transformData(rawData, town, floorType, rooms) {
    let filterFunc = function(record) {
      // if no country is provided
      if (!town) {
        return true;
      } else if (town == record.town) {
        return true;
      }
      // one-liner
      // return !country || country == record.billing_address.country;
    }
  
    let filterbyfloortype = function(record) {
      if (!floorType) {
        return true;
      } else if (floorType == record.storey_range) {
        return true
      }
    }
  
    let filterbyflattype = function(record) {
      if (!rooms) {
        return true
      } else if (rooms[0] == record.flat_type ||
        rooms[1] == record.flat_type ||
        rooms[2] == record.flat_type ||
        rooms[3] == record.flat_type) {
        return true
      }
    }
  
    let filtered = rawData.filter(filterFunc)
    let filterbyfloorType = filtered.filter(filterbyfloortype)
    let filterbyflatType = filterbyfloorType.filter(filterbyflattype)
    //3. transform to get year and price of the 5-room flat transaction
    let prices = filterbyflatType.map(function(transaction) {
    let dateObj = new Date(transaction.month)
      return {
        year: dateObj.getFullYear(), 
        amount: parseFloat(transaction.resale_price),
        rooms: transaction.flat_type
      }
    })



    // console.log(prices)

    // create one array per possible year (2017, 2018 ... 2022)
    let groups = {};
    for (let i = 0; i < 6; i++) {
      groups[yearNames[i]] = [];
    }
    // console.log(groups)
    // categorize each record we have into the years
    for (let transaction of prices) {
      let year = transaction.year - 2017
  
      groups[yearNames[year]].push(transaction)
      // console.log(groups[yearNames[year]])
    }
  
    let series = [];
    let reducer = function(sum, current) {
      return sum + current.amount
    }
  
    //create data input
    for (let year in groups) {
      let totalNumberOfTransactions = groups[year].length;
      let averagePrice = (groups[year].reduce(reducer, 0) / totalNumberOfTransactions).toFixed(0)
      if (averagePrice == 'NaN') {
        averagePrice = null
      }
      let coordinate = {
        x: year,
        y: averagePrice
      }
      series.push(coordinate)
  
    }
    console.log(series)
    return series;
  };
  



// async function loadData() {
//     const response = await axios.get('https://data.gov.sg/api/action/datastore_search?resource_id=f1765b54-a209-4718-8d38-a39237f502b3&limit=120000');
//     // console.log(response.data.result.records)
//     return response.data.result.records
// };

// //function to get 5-room transaction data over the years
// //5 ROOM
// function transformData_5room(rawData, town, year) {
//     let yearNames = ['2017', '2018', '2019', '2020', '2021', '2022']

//     // 1. Transforms API data into format required
//     let transformed = rawData.map(function (transaction) {
//         return {
//             'amount': transaction.resale_price,
//             'date': new Date(transaction.month),
//             'town': transaction.town,
//             "flat_type": transaction.flat_type,
//             "resale_price": transaction.resale_price,
//             "storey_range": transaction.storey_range,
//         }
//     })
//     // 2. Filter out for transactions that are 5-room
//     let filter_flat_type = transformed.filter(function (transaction) {
//         let result = transaction.flat_type == '5 ROOM'
//         // console.log(result)
//         return result;
//     });

//     //3. transform to get year and price of the 5-room flat transaction
//     let five_room_flat = filter_flat_type.map(function (transaction) {
//         return {
//             year: transaction.date.getFullYear(),
//             amount: parseFloat(transaction.amount),
//             rooms: transaction.flat_type
//         }
//     })
//     // console.log(five_room_flat)
//     // create one array per possible year (2017, 2018 ... 2022)
//     let groups = {};
//     for (let i = 0; i < 6; i++) {
//         groups[yearNames[i]] = [];
//     }

//     // categorize each record we have into the years
//     for (let transaction of five_room_flat) {
//         let year = transaction.year - 2017
        
//         groups[yearNames[year]].push(transaction)
//         // console.log(groups[yearNames[year]])
//     }

//     let series = [];
//     let reducer = function (sum, current) {
//         return sum + current.amount
//     }

//     //create the 5-room data input
//     for (let year in groups) {
//         let totalNumberOfTransactions = groups[year].length;

//         let coordinate = {
//             x: year,
//             y: (groups[year].reduce(reducer, 0) / totalNumberOfTransactions).toFixed(0)
//         }
//         series.push(coordinate)

//     }
//     // console.log(series)
//     return series;
// };

// //4 ROOM
// function transformData_4room(rawData, town, year) {
//     let yearNames = ['2017', '2018', '2019', '2020', '2021', '2022']

//     // 1. Transforms API data into format required
//     let transformed = rawData.map(function (transaction) {
//         return {
//             'amount': transaction.resale_price,
//             'date': new Date(transaction.month),
//             'town': transaction.town,
//             "flat_type": transaction.flat_type,
//             "resale_price": transaction.resale_price,
//             "storey_range": transaction.storey_range,
//         }
//     })


//     // 2. Filter out for transactions that are 5-room
//     let filter_flat_type = transformed.filter(function (transaction) {
//         let result = transaction.flat_type == '4 ROOM'
//         // console.log(result)
//         return result;
//     });

//     //3. transform to get year and price of the 4-room flat transaction
//     let four_room_flat = filter_flat_type.map(function (transaction) {
//         return {
//             year: transaction.date.getFullYear(),
//             amount: parseFloat(transaction.amount),
//             rooms: transaction.flat_type
//         }
//     })

//     // create one array per possible year (2017, 2018 ... 2022)
//     let groups = {};
//     for (let i = 0; i < 6; i++) {
//         groups[yearNames[i]] = [];
//     }

//     // categorize each record we have into the years
//     for (let transaction of four_room_flat) {
//         let year = transaction.year - 2017
//         // console.log(groups[year])
//         groups[yearNames[year]].push(transaction)
//     }

//     let series = [];
//     let reducer = function (sum, current) {
//         return sum + current.amount
//     }

//     //create the 4-room data input
//     for (let year in groups) {
//         let totalNumberOfTransactions = groups[year].length;

//         let coordinate = {
//             x: year,
//             y: (groups[year].reduce(reducer, 0) / totalNumberOfTransactions).toFixed(0)
//         }
//         series.push(coordinate)

//     }
//     // console.log(series)
//     return series;
// };

// //3 ROOM
// function transformData_3room(rawData, town, year) {
//     let yearNames = ['2017', '2018', '2019', '2020', '2021', '2022']

//     // 1. Transforms API data into format required
//     let transformed = rawData.map(function (transaction) {
//         return {
//             'amount': transaction.resale_price,
//             'date': new Date(transaction.month),
//             'town': transaction.town,
//             "flat_type": transaction.flat_type,
//             "resale_price": transaction.resale_price,
//             "storey_range": transaction.storey_range,
//         }
//     })


//     // 2. Filter out for transactions that are 5-room
//     let filter_flat_type = transformed.filter(function (transaction) {
//         let result = transaction.flat_type == '3 ROOM'
//         // console.log(result)
//         return result;
//     });

//     //3. transform to get year and price of the 4-room flat transaction
//     let three_room_flat = filter_flat_type.map(function (transaction) {
//         return {
//             year: transaction.date.getFullYear(),
//             amount: parseFloat(transaction.amount),
//             rooms: transaction.flat_type
//         }
//     })

//     // create one array per possible year (2017, 2018 ... 2022)
//     let groups = {};
//     for (let i = 0; i < 6; i++) {
//         groups[yearNames[i]] = [];
//     }

//     // categorize each record we have into the years
//     for (let transaction of three_room_flat) {
//         let year = transaction.year - 2017
//         // console.log(groups[year])
//         groups[yearNames[year]].push(transaction)
//     }

//     let series = [];
//     let reducer = function (sum, current) {
//         return sum + current.amount
//     }

//     //create the 3-room data input
//     for (let year in groups) {
//         let totalNumberOfTransactions = groups[year].length;

//         let coordinate = {
//             x: year,
//             y: (groups[year].reduce(reducer, 0) / totalNumberOfTransactions).toFixed(0)
//         }
//         series.push(coordinate)

//     }
//     // console.log(series)
//     return series;
// };


// //2 ROOM
// function transformData_2room(rawData, town, year) {
//     let yearNames = ['2017', '2018', '2019', '2020', '2021', '2022']

//     // 1. Transforms API data into format required
//     let transformed = rawData.map(function (transaction) {
//         return {
//             'amount': transaction.resale_price,
//             'date': new Date(transaction.month),
//             'town': transaction.town,
//             "flat_type": transaction.flat_type,
//             "resale_price": transaction.resale_price,
//             "storey_range": transaction.storey_range,
//         }
//     })


//     // 2. Filter out for transactions that are 5-room
//     let filter_flat_type = transformed.filter(function (transaction) {
//         let result = transaction.flat_type == '2 ROOM'
//         // console.log(result)
//         return result;
//     });

//     //3. transform to get year and price of the 4-room flat transaction
//     let two_room_flat = filter_flat_type.map(function (transaction) {
//         return {
//             year: transaction.date.getFullYear(),
//             amount: parseFloat(transaction.amount),
//             rooms: transaction.flat_type
//         }
//     })

//     // create one array per possible year (2017, 2018 ... 2022)
//     let groups = {};
//     for (let i = 0; i < 6; i++) {
//         groups[yearNames[i]] = [];
//     }

//     // categorize each record we have into the years
//     for (let transaction of two_room_flat) {
//         let year = transaction.year - 2017
//         // console.log(groups[year])
//         groups[yearNames[year]].push(transaction)
//     }

//     let series = [];
//     let reducer = function (sum, current) {
//         return sum + current.amount
//     }

//     //create the 2-room data input
//     for (let year in groups) {
//         let totalNumberOfTransactions = groups[year].length;

//         let coordinate = {
//             x: year,
//             y: (groups[year].reduce(reducer, 0) / totalNumberOfTransactions).toFixed(0)
//         }
//         series.push(coordinate)

//     }
//     // console.log(series)
//     return series;
// };



// {
//     year: ...loadData,
//     town: ..
// }

// if filters.year 

// if filters.town