{

  const grapthBar = ( x,y ) => {

    let labels2 = ['American Airlines Group', 'Ryanair', 'China Southern Airlines', 'Lufthansa Group'];
    let data2 = [199.6, 130.3, 126.3, 130];
    let colors2 = ['#49A9EA', '#36CAAB', '#34495E', '#B370CF'];
  
    let myChart2 = document.getElementById("myChart2").getContext('2d');
  
    let chart2 = new Chart( myChart2, {
      type: 'bar',
      data: {
        labels: x,
        datasets: [{
          data: y,
          backgroundColor: colors2
        }]
      },
      options: {
        title: {
          text: "Number of passengers carried in 2017 (in mio.)",
          display: true
        },
        legend: {
          display: false
        }
      }
    });
  
  }
  
}



