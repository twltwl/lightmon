const head = `
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing:border-box;
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
    
  </style>
`

const className = value =>
  `column ${value.score > 89 ? 'good' : value.score > 69 ? 'medium' : 'bad'}`

const renderMeasurement = obj => {
  let html = ''

  const {
    firstMeaningfulPaint,
    firstInteractive,
    consistentlyInteractive
  } = obj

  html += `<div class="${className(
    firstMeaningfulPaint
  )}">First meaningful paint ${firstMeaningfulPaint.displayValue} ${
    firstMeaningfulPaint.score
  }</div>`

  html += `<div class="${className(firstInteractive)}">First interactive${
    firstInteractive.displayValue
  }</div>`

  html += `<div class="${className(
    consistentlyInteractive
  )}">Consistently interactive ${consistentlyInteractive.displayValue}</div>`

  return html
}

module.exports = ({ items }) => `
    <!DOCTYPE html />
    <html>
      <head>
        ${head}
      </head>
      <body>
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
      </body>
    </html>
  `
