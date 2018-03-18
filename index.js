const express = require('express')

const { fork } = require('child_process')

const binHandler = require('./bin')
const resultsView = require('./views/results.js')

let BIN_ID = process.env.ID
const port = process.env.PORT || 4711

const app = express()

app.get('/run', async (req, res) => {
  const runner = fork('runner.js')
  runner.send('run')
  runner.on('message', result => {
    if (result) {
      binHandler.update(BIN_ID, result)
    }

    runner.kill()
    res.end('done')
  })
})

app.get('/results', async (req, res) => {
  const results = await binHandler.get(BIN_ID)
  console.log(results.items)
  res.status(200).send(resultsView(results))
})

app.listen(port, async () => {
  console.log(`Monitor running on port ${port}`)
  if (!BIN_ID) {
    const bin = await binHandler.create()
    BIN_ID = bin.id
    console.log(
      `Your app has generated a new ID, please set ID=${BIN_ID} before next launch.`
    )
  }
})
