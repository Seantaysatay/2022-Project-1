async function loadData() {
    const response = await axios.get('https://data.gov.sg/api/action/datastore_search?resource_id=f1765b54-a209-4718-8d38-a39237f502b3&limit=140000');
    // console.log(response.data.result.records)
    return response.data.result.records
}

// get the average price of all HDB flats over the years
function transformData(rawData) {
    //transform data to get price and date array
    let yearNames = ['2017', '2018', '2019', '2020', '2021', '2022']

    let transformed = rawData.map(function (transaction) {
        return {
            'amount': transaction.resale_price,
            'date': new Date(transaction.month),
            'town': transaction.town,
            "flat_type": transaction.flat_type,
            "resale_price": transaction.resale_price,
            "storey_range": transaction.storey_range,
        }
    })

    let prices = transformed.map(function (transaction) {
        return {
            year: transaction.date.getFullYear(),
            amount: parseFloat(transaction.amount),

        }

    })
    // console.log(transformed)

    //transform the data to get average price vs time(years) data

    //Grouping (create one array for each year)
    let groups = {};
    for (let i = 0; i < 6; i++) {
        groups[yearNames[i]] = [];
    }

    // categorize each record we have into the years
    for (let transaction of prices) {
        let year = transaction.year - 2017
        // console.log(groups[year])
        groups[yearNames[year]].push(transaction)
    }
    // console.log(groups)

    //create the series array for the final data
    let series = [];
    //calculate the total amount, to be divided into an average per year
    let reducer = function (sum, current) {
        return sum + current.amount
    }
    //create the data input
    for (let year in groups) {
        let totalNumberOfTransactions = groups[year].length;

        let coordinate = {
            x: year,
            y: (groups[year].reduce(reducer, 0) / totalNumberOfTransactions).toFixed(0)
        }
        series.push(coordinate)

    }
    console.log(series)
    return series;
};


//get the number of transacations of all HDB flats over the years
function transactionsData(rawData) {
    //transform data to get price and date array
    let yearNames = ['2017', '2018', '2019', '2020', '2021', '2022']

    let transformed = rawData.map(function (transaction) {
        return {
            'amount': transaction.resale_price,
            'date': new Date(transaction.month),
            'town': transaction.town,
            "flat_type": transaction.flat_type,
            "resale_price": transaction.resale_price,
            "storey_range": transaction.storey_range,
        }
    })

    let prices = transformed.map(function (transaction) {
        return {
            year: transaction.date.getFullYear(),
            amount: parseFloat(transaction.amount),

        }

    })
    // console.log(transformed)

    //transform the data to get average price vs time(years) data

    //Grouping (create one array for each year)
    let groups = {};
    for (let i = 0; i < 6; i++) {
        groups[yearNames[i]] = [];
    }

    // categorize each record we have into the years
    for (let transaction of prices) {
        let year = transaction.year - 2017
        // console.log(groups[year])
        groups[yearNames[year]].push(transaction)
    }
    // console.log(groups)

    //create the series array for the final data
    let series = [];

    //create the data input
    for (let year in groups) {
        let totalNumberOfTransactions = groups[year].length;

        let coordinate = {
            x: year,
            y: totalNumberOfTransactions
        }
        series.push(coordinate)

    }
    console.log(series)
    return series;
};