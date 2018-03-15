const axios = require("axios")

const create = async () => {
  const bin = await axios({
    method: "post",
    url: "https://api.jsonbin.io/b",
    data: JSON.stringify({ items: [] }),
    headers: {
      "content-type": "application/json"
    }
  })

  return bin.data
}

const get = async id => {
  console.log("getting bin", id)
  const bin = await axios.get(`https://api.jsonbin.io/b/${id}/latest`)
  console.log("got bin", bin.data)
  return bin.data
}

const update = async (id, data) => {
  console.log("update", data)
  const bin = await get(id)

  const items = { ...bin }.items
  items.unshift(data)
  items.length = items.length > 100 ? 100 : items.length

  const updatedBin = {
    items
  }

  console.log("update", updatedBin)

  axios.put(`https://api.jsonbin.io/b/${id}`, JSON.stringify(updatedBin), {
    headers: { "Content-Type": "application/json" }
  })

  return true
}

module.exports = { create, get, update }
