import express from 'express'
import fs from 'fs'
import path from 'path'
import cors from 'cors'
import thumbsupply from 'thumbsupply'

const __dirname = path.resolve()

const videos = [
  {
    id: 0,
    poster: '/video/0/poster',
    duration: '11 sec',
    name: 'Sample 1',
  },
  {
    id: 1,
    poster: '/video/1/poster',
    duration: '7 sec',
    name: 'Sample 2',
  },
  {
    id: 2,
    poster: '/video/2/poster',
    duration: '9 sec',
    name: 'Sample 3',
  },
]

const app = express()
app.use(cors())

app.get('/videos', (req, res) => res.json(videos))

app.get('/video/:id/data', (req, res) => {
  const { id } = req.params
  res.json(videos[id])
})

app.get('/video/:id', (req, res) => {
  const path = `assets/${req.params.id}.mp4`
  const stat = fs.statSync(path)
  const fileSize = stat.size
  const range = req.headers.range
  if (range) {
    const parts = range.replace(/bytes=/, '').split('-')
    const start = parseInt(parts[0], 10)
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1
    const chunkSize = end - start + 1
    const file = fs.createReadStream(path, { start, end })
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunkSize,
      'Content-Type': 'video/mp4',
    }
    res.writeHead(206, head)
    file.pipe(res)
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
    }
    res.writeHead(200, head)
    fs.createReadStream(path).pipe(res)
  }
})

app.get('/video/:id/poster', (req, res) => {
  thumbsupply
    .generateThumbnail(`assets/${req.params.id}.mp4`)
    .then((thumb) => res.sendFile(thumb))
})

app.get('/video/:id/caption', (req, res) =>
  res.sendFile('assets/captions/sample.vtt', { root: __dirname }),
)

app.listen(4000, () => {
  console.log('Listening on port 4000!')
})
