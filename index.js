const express = require("express")
const axios = require("axios")

const { fork } = require("child_process")

const binHandler = require("./bin")

let BIN_ID = process.env.ID
const port = process.env.PORT || 4711

const app = express()

app.get("/start/:id", async (req, res) => {
  if (BIN_ID === req.params.id) {
    const runner = fork("runner.js")
    runner.send("run")
    runner.on("message", result => {
      if (result) {
        binHandler.update(BIN_ID, result)
      }

      runner.kill()
      res.end("ok")
    })
  } else {
    res.send("no")
  }
})

app.get("/results", async (req, res) => {
  const results = await binHandler.get(BIN_ID)
  res.status(200).json(results)
})

app.listen(port, async () => {
  console.log(`Monitor running on port ${port}`)
  if (!BIN_ID) {
    const bin = await binHandler.create()
    BIN_ID = bin.id
    console.log(
      `Your app has generated a new ID, please set ID=${BIN_ID} before next launch.
      
      To trigger a new test - curl host/${BIN_ID}
      `
    )
  }
})
