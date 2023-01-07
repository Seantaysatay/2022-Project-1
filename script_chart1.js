window.addEventListener("DOMContentLoaded", async function () {
    // load the chart data
    let data = await loadData();
    let transformed = transformData_5room(data, null, null);
    // updateChart(chart, transformed, 'Average price');

    document.querySelector('#checkbox5room').addEventListener('change', async function () {
        
        let checkBox = document.getElementById("checkbox5room");
        // If the checkbox is checked, display the line
        if (checkBox.checked ==git add true){
            alert('checked')
          updateChart(chart, transformed, 'Average 5-room Price');
        } else {
            chart.hideSeries('Average 5-room Price')
        }
    })

})



// document.querySelector("#hideroom").addEventListener('click', () => {
//     chart.hideSeries('testing line')
// })




function updateChart(chart, newSeries, newSeriesName) {
    chart.updateSeries([
        {
            'name': newSeriesName,
            'data': newSeries
        }
    ])
}

const options = {
    chart: {
        'type': 'line',
        'height': '100%'
    },
    series: [],
    noData: {
        'text': 'Loading'
    }
}

const chart = new ApexCharts(document.querySelector('#chart'), options);
chart.render();
