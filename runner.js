const { exec } = require("child_process")

const run = async () => new Promise((resolve, reject) => {
    try {
        console.log(`lighthouse --output json --chrome-flags="--headless" --port=9222 ${process.env.URL}`)
      exec(
        `lighthouse --output json --chrome-flags="--headless" --port=9222 ${process.env.URL}`,
        { maxBuffer: 1024 * 500 * 2 },
        (err, stdout, stderr) => {
          if (err) {
            console.log(err)
            return
          }
  
          const audits = JSON.parse(stdout).audits
  
          const results = {
            "first-meaningful-paint": {
              score: audits["first-meaningful-paint"].score,
              displayValue: audits["first-meaningful-paint"].displayValue
            },
            "time-to-first-byte": {
              score: audits["time-to-first-byte"].score,
              displayValue: audits["time-to-first-byte"].displayValue
            }
          }
  
          resolve(results)
          // send to https://jsonbin.io/api-reference#api-v2-update
        }
      )
    } catch (e) {
      reject(false)
    }
})



process.on("message", async (url, id) => {
  const result = await run(url, id)
  process.send(result)
})
