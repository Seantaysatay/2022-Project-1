const options_heat =  {
    chart: {
        type: 'treemap',
        height:"70%",
        width: '70%'
    },
    series:[
        
    ],
    noData: {
        "text": "Loading..."
    },
    plotOptions: {
        treemap: {
          enableShades: true,
          shadeIntensity: 0.8,
          reverseNegativeShade: true,
          colorScale: {
            ranges: [
              {
                from: 6000,
                to: 12000,
                color:'#52B12C'   //red
              },
              {
                from: 0,
                to: 6000,
                color: '#CD363A' //green
              }
            ]
          }
        }
      }
   
    
}
 
// create the chart
const chart_heat = new ApexCharts(document.querySelector('#heatmap'), options_heat);
 
// render the chart
chart_heat.render()

//Load in the data
window.addEventListener('DOMContentLoaded', async ()=>{    
    // alert('DOMContentLoaded')

    let rawData = await loadData();
    let series = transformData_heatmap(rawData);
    //console.log(typeof(series))
      
    chart_heat.updateSeries([{
        'name': 'Transactions',
        'data': series
    }])
})