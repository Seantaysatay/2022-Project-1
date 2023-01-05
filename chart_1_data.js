async function loadData() {
    const response = await axios.get('https://data.gov.sg/api/action/datastore_search?resource_id=f1765b54-a209-4718-8d38-a39237f502b3&limit=120000');
    // console.log(response.data.result.records)
    return response.data.result.records
    
};

function transformData(rawData, town, year) {
    let filterFunc = function(transaction) {
        // if no town is provided
        if (!town) {
            return true;
        } else if (town == transaction.town) {
            return true;
        }
       
    }

    let filterByYear=function(transaction) {
        let dateObj = new Date(transaction.month);
        if (!year) {
            return true;
        } else if (year == dateObj.getFullYear()) {
            return true;
        }

    }

    let filtered = rawData.filter(filterFunc);
    let filteredByYear = filtered.filter(filterByYear);
    let transactions = filteredByYear.map(function(transaction){
        let dateObj = new Date(transaction.month);
        return {
            amount: parseFloat(transaction.resale_price),
            year: dateObj.getFullYear()
        }
    
    }) 
    //console.log(transactions)

    // create new object to represent the groups
    // think of groups as a Python dictionary not as an object might be better
    let groups = {};
    for (let i=0; i < 4; i++) {
        // groups is not an array, it's an object
        groups[i] = [];  // create one array per possible year (2017, 2018 ... 2022)
    }
    //console.log(groups)

    // categorize each record we have into the months
    for (let transaction of transactions) {
        let year=transaction.year-2017
        //console.log(groups[year])
        groups[year].push(transaction)
    }

    let series = [];
    let reducer = function(sum, current) {
        return sum + current.amount
    }

    // groups is an object
    // `let year in groups` will go through the keys of the groups object
    for (let year in groups) {
        let totalNumberOfTransactions = groups[year].length;
        //console.log((groups[year].reduce(reducer, 0)/totalNumberOfTransactions).toFixed(0))
        // console.log(groups[year].length)
        let coordinate ={
            x: year,
            y: (groups[year].reduce(reducer, 0)/totalNumberOfTransactions).toFixed(0)
        }
        series.push(coordinate)
        
    }
    return series;
}

// function transformDataEx(rawData, country, year) {
//     let filterFunc = function(record) {
//         // if no country is provided
//         if (!country) {
//             return true;
//         } else if (country == record.billing_address.country) {
//             return true;
//         }
//         // one-liner
//         // return !country || country == record.billing_address.country;
//     }

//     let filterByYear=function(record) {
//         let dateObj = new Date(record.completed_at);
//         if (!year) {
//             return true;
//         } else if (year == dateObj.getFullYear()) {
//             return true;
//         }
//     }


//     let earnings = rawData.filter(filterFunc)
//                           .filter(filterByYear)
//                           .map(function(record){
//                             let dateObj = new Date(record.completed_at);
//                             return {
//                                 amount: record.payment.amount,
//                                 month: dateObj.getMonth()
//                             }
//                         })

//     // create new object to represent the groups
//     // think of groups as a Python dictionary not as an object might be better
//     let groups = {};
//     for (let i =0; i < 12; i++) {
//         // groups is not an array, it's an object
//         groups[i] = [];  // create one array per possible month
//     }

//     // categorize each record we have into the months
//     for (let record of earnings) {
//         groups[record.month].push(record);
//     }

//     let series = [];
//     let reducer = function(total, record) {
//         return total + record.amount;
//     }
//     // groups is an object
//     // `let month in groups` will go through the keys of the groups object
//     for (let month in groups) {
//         let group = groups[month];
//         series.push({
//             x: month,
//             y: group.reduce(reducer, 0)
//         })
//     }
//     return series;
// }

