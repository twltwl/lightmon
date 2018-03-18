const axios = require('axios')

const create = async () => {
  const bin = await axios.post(
    'https://api.jsonbin.io/b',
    JSON.stringify({ items: [] }),
    {
      headers: {
        'content-type': 'application/json'
      }
    }
  )

  return bin.data
}

const get = async id => {
  const bin = await axios.get(`https://api.jsonbin.io/b/${id}/latest`)

  return bin.data
}

const update = async (id, data) => {
  const bin = await get(id)

  const { items } = bin
  items.unshift(data)
  items.length = items.length > 100 ? 100 : items.length

  const updatedBin = {
    items
  }

  axios.put(`https://api.jsonbin.io/b/${id}`, JSON.stringify(updatedBin), {
    headers: { 'Content-Type': 'application/json' }
  })

  return true
}

module.exports = { create, get, update }
