// const campaigns = [3, 5, 1, 8, 4, 10];
// const reach = [5000, 17000, 2400, 25000, 14000, 55000];
// const categories = ['2017', '2018', '2019', '2020', '2021', '2022']

window.addEventListener('DOMContentLoaded', async ()=>{    
    // alert('DOMContentLoaded')

    let rawData = await loadData();
    let series = transformData_price(rawData)
    let transactions = transactionsData(rawData)


const chart1_Options =  {
    chart: {
        id: "chart1",
        type: 'line',
        height:"100%",
        width:"80%",
        group: "price-transaction-charts"
    },
    // each series represents one set of data
    series:[
        {
            name: 'Average price',
            data: series
        },
    ],
    // what is are the labels along the x-axis (horizontal line)
    // xaxis: {
    //     categories: categories
    // },
}
 
// create the chart
const Chart1 = new ApexCharts(document.querySelector('#chart1'), chart1_Options);
 
// render the chart
Chart1.render()
 
const chart2_Options =  {
    chart: {
        id: "chart2",
        type: 'line',
        height:"100%",
        width:'80%',
        group: "price-transaction-charts"
    },
    // each series represents one set of data
    series:[
        {
            name: 'Transactions',
            data: transactions
        }
    ],
    // // what is are the labels along the x-axis (horizontal line)
    // xaxis: {
    //     categories:categories
    // },
    
}
 
// create the chart
const Chart2 = new ApexCharts(document.querySelector('#chart2'), chart2_Options);
 
// render the bar chart
Chart2.render()
})


