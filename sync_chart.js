// const campaigns = [3, 5, 1, 8, 4, 10];
// const reach = [5000, 17000, 2400, 25000, 14000, 55000];
const categories = ['2017', '2018', '2019', '2020', '2021', '2022']

window.addEventListener('DOMContentLoaded', async ()=>{    
    // alert('DOMContentLoaded')

    let rawData = await loadData();
    let series = transformData(rawData)
    let transactions = transactionsData(rawData)
      
    // chart1.updateSeries([{
    //     'name': 'Transactions',
    //     'data': series
    // }])
    // Create the line chart
const campaignChartOptions =  {
    chart: {
        type: 'line',
        height:"100%",
        width:"80%"
    },
    // each series represents one set of data
    series:[
        {
            name: 'Average price',
            data: series
        },
    ],
    // what is are the labels along the x-axis (horizontal line)
    xaxis: {
        categories: categories
    },
}
 
// create the chart
const campaignChart = new ApexCharts(document.querySelector('#campaignChart'), campaignChartOptions);
 
// render the chart
campaignChart.render()
 
const reachChartOptions =  {
    chart: {
        type: 'line',
        height:"100%",
        width:'80%'
    },
    // each series represents one set of data
    series:[
        {
            name: 'Transactions',
            data: transactions
        }
    ],
    // what is are the labels along the x-axis (horizontal line)
    xaxis: {
        categories:categories
    },
    
}
 
// create the chart
const reachChart = new ApexCharts(document.querySelector('#reachChart'), reachChartOptions);
 
// render the bar chart
reachChart.render()
})


