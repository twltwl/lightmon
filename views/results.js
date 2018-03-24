const head = `
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing:border-box;
    }

    .root{
      display:flex;
    }

    ul{
      flex:1;
    }

    li {
      display:flex;
      list-style:none;
      paddinh:10px;
    }

    .column {
      flex:1;
      border-radius:5px;
      margin:5px 5px 0 5px;
      padding:5px;
    }

    .good {
      color:rgb(43, 136, 47);
      border: 1px solid rgb(43, 136, 47);
      background:rgb(229, 255, 216);
    }
    .medium {
      color:rgb(239, 108, 0);
      border: 1px solid rgb(239, 108, 0);
      background:rgb(255, 240, 216);
    }
    .bad {
      color:rgb(223, 51, 47);
      border:1px solid rgb(223, 51, 47);
      background:rgb(255, 204, 210);
    }

    #chart{
      flex:0.5;
      height:100%;
    }
    
  </style>

  <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/morris.js/0.5.1/morris.css">
  <script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js"></script>
  <script src="//cdnjs.cloudflare.com/ajax/libs/raphael/2.1.0/raphael-min.js"></script>
  <script src="//cdnjs.cloudflare.com/ajax/libs/morris.js/0.5.1/morris.min.js"></script>
`

const className = value =>
  `column ${value.score > 89 ? 'good' : value.score > 69 ? 'medium' : 'bad'}`

const renderMeasurement = obj => {
  let html = ''

  const {
    firstMeaningfulPaint,
    firstInteractive,
    consistentlyInteractive,
    data
  } = obj

  const dataCol =
    (data &&
      data.commit &&
      `<div class="column"><strong>${data.commit}</strong></div>`) ||
    ''

  html += dataCol

  html += `<div class="${className(firstMeaningfulPaint)}"><strong>${
    firstMeaningfulPaint.score
  }</strong> First meaningful paint ${firstMeaningfulPaint.displayValue} </div>`

  html += `<div class="${className(firstInteractive)}"><strong>${
    firstInteractive.score
  }</strong> First interactive${firstInteractive.displayValue}</div>`

  html += `<div class="${className(consistentlyInteractive)}"><strong>${
    consistentlyInteractive.score
  }</strong> Consistently interactive ${
    consistentlyInteractive.displayValue
  }</div>`

  return html
}

const chartData = items => {
  const data = []
  items.map(item => {
    data.push({
      score: item.firstMeaningfulPaint.score,
      x: ''
    })
  })

  return data
}

module.exports = ({ items }) => `
    <!DOCTYPE html />
    <html>
      <head>
        ${head}
      </head>
      <body>
        <div class="root">
          <ul>
            ${items
              .map(
                resultObj =>
                  `<li>
                ${renderMeasurement(resultObj)}
              </li>`
              )
              .join('')}
          </ul>
          <div id="chart"></div>
        </div>
        <script>
        new Morris.Bar({
          element: 'chart',
          data: ${JSON.stringify(chartData(items))},
          // The name of the data record attribute that contains x-values.
          xkey: 'x',
          // A list of names of data record attributes that contain y-values.
          ykeys: ['score'],
          // Labels for the ykeys -- will be displayed when you hover over the
          // chart.
          labels: ['score']
        });
        </script>
      </body>
    </html>
  `
