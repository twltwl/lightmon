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
        { maxBuffer: 1024 * 1000 * 10 },
        (err, stdout, stderr) => {
          if (err) {
            console.log(err)

            return
          }

          const { audits } = JSON.parse(stdout)

          const results = {
            firstMeaningfulPaint: {
              score: audits['first-meaningful-paint'].score,
              displayValue: audits['first-meaningful-paint'].displayValue
            },
            firstInteractive: {
              score: audits['first-interactive'].score,
              displayValue: audits['first-interactive'].displayValue
            },
            consistentlyInteractive: {
              score: audits['consistently-interactive'].score,
              displayValue: audits['consistently-interactive'].displayValue
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
