let options = {
  'chart': {
      'type': 'line',
      'height': '100%'
  },
  'series': [],
  'noData': {
      'text': 'Loading'
  }
}

let chart = new ApexCharts(
  document.querySelector('#linechart'),
  options
);

chart.render();

window.addEventListener("DOMContentLoaded", async function() {
    // load the chart data
    let data = await loadData();
    let transformed = transformData(data, null, null)
  
    chart.updateSeries([
      {
        'name': 'Average Price',
        'data': transformed
      }
    ])
  
    let dropdownlist = document.querySelector('#towndropdown')
    dropdownlist.addEventListener('change', function() {
      alert('dropdown-ed')
      let town = document.querySelector('#towndropdown').value
      console.log(town)
      let floorType;
      let transformed = transformData(data, town, floorType, rooms);
      console.log(transformed)
      chart.updateSeries([
        {
          'name': 'Average Price',
          'data': transformed
        }
      ])
  
      
  
      let checkboxesblock = document.querySelector('#checkboxbtn')
      checkboxesblock.addEventListener('change', function() {
        alert('checkbox-ed')
        let checkboxes = document.querySelectorAll('#flatType');
        let selectedboxes = []
        for (let checkbox of checkboxes) {
          if (checkbox.checked) {
            selectedboxes.push(checkbox.value)
          }
        }
        let flatType = selectedboxes;
        let transformed = transformData(data, town, floorType, flatType, flatType, flatType, flatType);
        chart.updateSeries([
          {
            'name': 'Average price',
            'data': transformed
          }
        ])
      
      //   let radiobtn = document.querySelectorAll('input[name="floor"]');
      //   for (let i=0; i< radiobtn.length; i++) {
      //     radiobtn[i].addEventListener('change', function() {
      //       let floorType = document.getElementsByName('floor');
      //       for (i = 0; i < floorType.length; i++) {
      //         if (floorType[i].checked) {
      //           floorType = floorType[i].value
      //      }
      // }
        
        
        let radiobtn = document.querySelectorAll('input[name="floor"]');
        for (let i=0; i < radiobtn.length; i++) {
          radiobtn[i].addEventListener('change', function() {
            let floorType = this.value
            let transformed = transformData(data, town, floorType, rooms)
          chart.updateSeries([
            {
              'name': 'Average Price',
              'data': transformed
            }
          ])


          })
        }

      
      })
    })
})
  
  
  

// window.addEventListener("DOMContentLoaded", async function () {
//     // load the chart data
//     let data = await loadData();
//     let transformed_5 = transformData_5room(data, null, null);
//     let transformed_4 = transformData_4room(data, null, null);
//     let transformed_3 = transformData_3room(data, null, null);
//     let transformed_2 = transformData_2room(data, null, null);

//     // console.log(transformed_4)
//     // updateChart(chart, transformed, 'Average price');

//     const options = {
//         chart: {
//             'type': 'line',
//             'height':'80%',
//             'width': '70%'
//         },
//         series: [
//             {
//                 'name': 'Average 5-room price',
//                 'data': transformed_5
//             },
//             {
//                 'name': 'Average 4-room price',
//                 'data': transformed_4
//             },
//             {
//                 'name': 'Average 3-room price',
//                 'data': transformed_3
//             },
//             {
//                 'name': 'Average 2-room price',
//                 'data': transformed_2
//             },

//         ],
//         noData: {
//             'text': 'Loading'
//         }
//     }
//     const chart = new ApexCharts(document.querySelector('#linechart'), options);
//     chart.render();


//     document.querySelector('#checkbox5room').addEventListener('change', async function () {
//         chart.toggleSeries('Average 5-room price');
//     })
//     document.querySelector('#checkbox4room').addEventListener('change', async function () {
//         chart.toggleSeries('Average 4-room price');
//     })
//     document.querySelector('#checkbox3room').addEventListener('change', async function () {
//         chart.toggleSeries('Average 3-room price');
//     })
//     document.querySelector('#checkbox2room').addEventListener('change', async function () {
//         chart.toggleSeries('Average 2-room price');
//     })


//     })



// function updateChart(chart, newSeries, newSeriesName) {
//     chart.updateSeries([
//         {
//             'name': newSeriesName,
//             'data': newSeries
//         }
//     ])
// }







// function filterBySqm(rawData, minSqm, maxSqm) {
//     let result = rawData.filter((obj) => {
//         if (obj.floor_area_sqm > minSqm && obj.floor_area_sqm < maxSqm) {
//             return true
//         }
//     })
//     return result;
// }



// let checkBox = document.getElementById("checkbox4room");
// // If the checkbox is checked, display the line
// if (checkBox.checked == true){
//     // updateChart(chart, transformed_4, 'Average 4-room Price');

//   chart.appendSeries({
//     name: 'Average 4-room Price',
//     data:transformed_4
//     });
// } else {
// chart.toggleSeries('Average 4-room Price')

// }


// const options = {
//     chart: {
//         'type': 'line',
//         'height': '100%'
//     },
//     series: [
//         {
//             'name': 'Average 4-room price',
//             'data': transformed_4
//         }

//     ],
//     noData: {
//         'text': 'Loading'
//     }
// }

// const chart = new ApexCharts(document.querySelector('#chart'), options);
// chart.render();




// document.querySelector("#hideroom").addEventListener('click', () => {
//     chart.hideSeries('testing line')
// })



    // document.querySelector('#price').addEventListener('change', (evt) => {
    //     console.log(evt.target.value)

    //     // filter the rawData based on user's input
    //     // console.log("heree is rawData", data)
    //     let filterdResult;
    //     let name = ''
    //     if (evt.target.value == 1) {
    //         filteredResult = filterBySqm(data, 40, 50);
    //         name = 'SQM1'
    //     } else if (evt.target.value == 2) {
    //         filteredResult = filterBySqm(data, 50, 60)
    //         name = 'SQM2'
    //     } else if (evt.target.value == 3) {
    //         filteredResult = filterBySqm(data, 60, 10000000000000)
    //         name = 'SQM3'
    //     }
    //     // plot the data on the chart
    //     // end result structure => [{x: year, y: price}, {x: year, y: price}]
    //     console.log(filteredResult)
        
        // let mappedResult = filteredResult.map(function(obj) {
        //     return {
        //         x: new Date(obj.month).getFullYear(),
        //         y: obj.resale_price
        //     };
        // })

        // console.log(mappedResult)

        // updateChart(chart, name, mappedResult);

        // alert(this.value)