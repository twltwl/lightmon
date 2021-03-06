const { exec } = require('child_process')

const run = async () =>
  new Promise((resolve, reject) => {
    try {
      console.log(
        `lighthouse --output json --chrome-flags="--headless --port=9222 --disable-gpu --disable-setuid-sandbox --no-sandbox"  ${
          process.env.URL
        }`
      )
      exec(
        `lighthouse --output json --chrome-flags="--headless --port=9222 --disable-gpu --disable-setuid-sandbox --no-sandbox" ${
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
              score: audits['first-meaningful-paint'].score * 100,
              displayValue: audits['first-meaningful-paint'].rawValue.toFixed(0) + ' ms'
            },
            firstInteractive: {
              score: audits['first-cpu-idle'].score * 100,
              displayValue: audits['first-cpu-idle'].rawValue.toFixed(0) + ' ms'
            },
            consistentlyInteractive: {
              score: audits['interactive'].score * 100,
              displayValue: audits['interactive'].rawValue.toFixed(0) + ' ms'
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
