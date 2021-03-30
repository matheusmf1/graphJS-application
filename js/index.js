( async () => {

  const queryStr = decodeURIComponent(window.location.search);

  if (!queryStr || queryStr.split('=')[1] === '') {
    alert('Missing ID as argument')
    window.location.href = "../index.html";
  }

  userID = queryStr.split('=')[1]


  let jsonData = []

  let userData = {}
  
  await fetch( '../assets/data.json' )
    .then( response => response.json() )
    .then( obj => jsonData = obj )
    .catch( err => console.error( err ) )


  const getData = ( jsondata, tipo_usuario  ) => {
    
    let id_1 = "1", id_2 = "2", id_3 = "3", id_4 = "4", id_5 = "5", id_6 = "6", id_7 = "7";
  
    let disciplina = {
      ID_NOTAS: [],
      NOTAS: [],
      ID_PROFESSOR: "",
      ID_TRIMESTRE: "",
      NOME_DISCIPLINA: "",
      NOME_PROFESSOR: "",
  }
      
    let studentData = {

      ID_CURSO: '',
      ID_TURMA: '',
      NOME_ALUNO: '',

      ID_DISCIPLINA: {
        [id_1]: [],
        [id_2]: [],
        [id_3]: [],
        [id_4]: [],
        [id_5]: [],
        [id_6]: [],
        [id_7]: [],
      }
    }

    let professorData = {}
    
    if ( tipo_usuario === 'aluno' ) {
      
      jsondata.forEach( ( data ) => {
    
        if ( data['ID_ALUNO'] === userID ) {
    
          studentData[ "ID_CURSO" ] = data[ "ID_CURSO" ]
          studentData[ "ID_TURMA" ] = data[ "ID_TURMA" ]
          studentData[ "NOME_ALUNO" ] = data[ "NOME_ALUNO" ]
  
          studentData[ "ID_DISCIPLINA" ][ data[ "ID_DISCIPLINA" ] ].push(
            {
              "ID_NOTA": data[ "ID_NOTA" ],
              "ID_PROFESSOR": data[ "ID_PROFESSOR" ],
              "ID_TRIMESTRE": data[ "ID_TRIMESTRE" ],
              "NOME_DISCIPLINA": data[ "NOME_DISCIPLINA" ],
              "NOME_PROFESSOR": data[ "NOME_PROFESSOR" ],
              "NOTA": data[ "NOTA" ]
            }
          )
        }
          
      })

      Object.keys( studentData[ 'ID_DISCIPLINA' ] ).forEach( key => {
  
        studentData[ 'ID_DISCIPLINA' ][ key ].forEach( value => {
  
          disciplina[ 'ID_NOTAS' ].push( value[ 'ID_NOTA' ] )
          disciplina[ 'NOTAS' ].push( value[ 'NOTA' ] )
          disciplina[ 'ID_PROFESSOR' ] = value[ 'ID_PROFESSOR' ]
          disciplina[ 'ID_TRIMESTRE' ] = value[ 'ID_TRIMESTRE' ]
          disciplina[ 'NOME_DISCIPLINA' ] = value[ 'NOME_DISCIPLINA' ]
          disciplina[ 'NOME_PROFESSOR' ] = value[ 'NOME_PROFESSOR' ]
      
        })
  
        studentData[ 'ID_DISCIPLINA' ][ key ] = disciplina
        disciplina = {
          ID_NOTAS: [],
          NOTAS: [],
          ID_PROFESSOR: "",
          ID_TRIMESTRE: "",
          NOME_DISCIPLINA: "",
          NOME_PROFESSOR: "",
        }
  
      })
  
      console.log( studentData )
      return studentData

    }

    if ( tipo_usuario === 'professor' ) {
      
      jsondata.forEach( ( data ) => {
    
        if ( data['ID_PROFESSOR'] === userID ) {
          professorData[ 'NOME_PROFESSOR' ] = data['NOME_PROFESSOR']
          professorData[ 'NOME_DISCIPLINA' ] = data['NOME_DISCIPLINA']
          professorData[ 'ID_DISCIPLINA' ] = data['ID_DISCIPLINA']
          professorData[ 'ID_CURSO' ] = data['ID_CURSO']
        }
          
      })
      
      console.log( professorData )
      return professorData

    }
  }


// Funcoes dos graficos

  const barGrapth = ( labels, data, title ) => {

    let labels2 = ['American Airlines Group', 'Ryanair', 'China Southern Airlines', 'Lufthansa Group'];
    let data2 = [199.6, 130.3, 126.3, 130];
    let colors2 = ['#49A9EA', '#36CAAB', '#34495E', '#B370CF', '#AC5353', '#ffc107', '#6f42c1' ];

    
    let myChart2 = document.getElementById("myChart2").getContext('2d');

    let chart2 = new Chart( myChart2, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: colors2
        }]
      },
      options: {
        title: {
          text: title,
          display: true
        },
        legend: {
          display: false
        }
      }
    });

  }

  const pizzaGrapth = ( labels, data, title ) => {

    let labels4 = ['Germany', 'France', 'UK', 'Italy', 'Spain', 'Others(23)'];
    let data4 = [83, 67, 66, 61, 47, 187];
    let colors4 = ['#49A9EA', '#36CAAB', '#34495E', '#B370CF', '#AC5353', '#CFD4D8'];
  
    let myChart4 = document.getElementById("myChart4").getContext('2d');
  
    let chart4 = new Chart(myChart4, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: colors4
        }]
      },
      options: {
        title: {
          text: title,
          display: true
        }
      }
    });
  }


  const radarGrapth = ( labels, data, title ) => {

    let labels3 = ['Attack', 'Defense', 'Passing', 'Tackle', 'Speed'];
    let myChart3 = document.getElementById("myChart3").getContext('2d');

    let chart3 = new Chart( myChart3, {
      type: 'radar',
      data: {
        labels: labels,
        datasets: [{
            label: '1º Trismestre',
            fill: true,
            backgroundColor: "rgba(179, 181, 198, 0.2)",
            borderColor: "rgba(179, 181, 198, 1)",
            pointBorderColor: "#fff",
            pointBackgroundColor: "rgba(179, 181, 198, 1)",
            data: data['1']
          },
          {
            label: '2º Trismestre',
            fill: true,
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
            pointBorderColor: "#fff",
            pointBackgroundColor: "rgba(255, 99, 132, 1)",
            data: data['2']
          },  
          {
            label: '3º Trismestre',
            fill: true,
            backgroundColor: "rgba(13 110 253, 0.2)",
            borderColor: "rgb(13 110 253)",
            pointBorderColor: "#fff",
            pointBackgroundColor: "rgba(255, 99, 132, 1)",
            data: data['3']
          }
        ]
      },
      options: {
        title: {
          text: title,
          display: true
        }
      }
    });

  }


  const lineGrapth = ( labels, data, title ) => {

    const myLineChart = document.querySelector("#myChart1").getContext('2d');

    let colors1 = ['#49A9EA', '#36CAAB'];
  
  
    let chart1 = new Chart(myLineChart, {
      type: 'line',
      data: {
        datasets: [ 
          {
            data: data['Banco de Dados'],
            label: "Banco de Dados",
            borderColor: "#49A9EA",
            fill: false
          },
          {
            data: data['Calculo III'],
            label: "Calculo III",
            borderColor: "#36CAAB",
            fill: false
          },
          {
            data: data['Cloud Computing'],
            label: "Cloud Computing",
            borderColor: "#34495E",
            fill: false
          },
          {
            data: data['Fisica'],
            label: "Fisica",
            borderColor: "#B370CF",
            fill: false
          },
          {
            data: data['Inteligencia Artificial'],
            label: "Inteligencia Artificial",
            borderColor: "#AC5353",
            fill: false
          },
          {
            data: data['Programacao'],
            label: "Programacao",
            borderColor: "#ffc107",
            fill: false
          },
          {
            data: data['Sistemas Digitais'],
            label: "Sistemas Digitais",
            borderColor: "#6f42c1",
            fill: false
          },
        ]
      },
      options: {
        title: {
          display: true,
          text: title
        }
      }

    });
  }





  if ( userID.search( 'p' ) !== -1 ) {

    console.log( 'Gráficos do professor: ' + userID )
    userData = getData( jsonData, 'professor' )

  } 

  else {

    console.log( 'Gráficos do aluno: ' + userID )
    userData = getData( jsonData, 'aluno' )  

    subjectNames = []
    average_subjectScore = []
    max_subjectScore = []
    grades_trimestre = {
      '1': [],
      '2': [],
      '3': []
    }

    subject_scores = {}

    Object.keys( userData['ID_DISCIPLINA'] ).forEach( key => {


      subject_scores[ userData['ID_DISCIPLINA'][key]['NOME_DISCIPLINA'] ] = userData['ID_DISCIPLINA'][key]['NOTAS']

      subjectNames.push( userData['ID_DISCIPLINA'][key]['NOME_DISCIPLINA'] )

      grades = userData['ID_DISCIPLINA'][key]['NOTAS'].map( ( item ) => parseInt( item, 10 ) )

      average = arr => arr.reduce( ( p, c ) => p + c, 0 ) / arr.length;
      max = arr => arr.reduce( ( a,b ) => Math.max( a, b) )
      
      average_subjectScore.push( average( grades ).toFixed(2) )

      max_subjectScore.push( max( grades ) )

    })

    Object.keys( subject_scores ).forEach( e => {

      subject_scores[e].forEach( ( grade, index)  =>  {
        grades_trimestre[index+1].push( grade )
      })

    })


    barGrapth( subjectNames, average_subjectScore, 'Notas médias por matéria' )

    pizzaGrapth( subjectNames, max_subjectScore, 'Melhor rendimento por matéria' )

    radarGrapth( subjectNames, grades_trimestre, 'Rendimento por trimestre' )

    lineGrapth( subjectNames, subject_scores, 'Evolução das notas' ) 

  }


})();
