const { exec } = require('child_process')

const run = async () =>
  new Promise((resolve, reject) => {
    try {
      console.log(
        `lighthouse --output json --chrome-flags="--headless" --port=9222 ${
          process.env.URL
        }`
      )
      exec(
        `lighthouse --output json --chrome-flags="--headless" --port=9222 ${
          process.env.URL
        }`,
        { maxBuffer: 1024 * 500 * 2 },
        (err, stdout, stderr) => {
          if (err) {
            console.log(err)

            return
          }

          const { audits } = JSON.parse(stdout)

          const results = {
            'first-meaningful-paint': {
              score: audits['first-meaningful-paint'].score,
              displayValue: audits['first-meaningful-paint'].displayValue
            },
            'time-to-first-byte': {
              score: audits['time-to-first-byte'].score,
              displayValue: audits['time-to-first-byte'].displayValue
            }
          }

          resolve(results)
        }
      )
    } catch (e) {
      reject(e)
    }
  })

process.on('message', async (url, id) => {
  const result = await run(url, id)
  process.send(result)
})
