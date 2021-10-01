import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import Header from './Header'
import Footer from './Footer'

const Player = () => {
  const { id } = useParams()

  const [videoId, setVideoId] = useState(id)
  const [videoData, setVideoData] = useState({})

  useEffect(() => {
    const getVideoData = async () => {
      try {
        const res = await fetch(`http://localhost:4000/video/${videoId}/data`)
        const data = await res.json()
        setVideoData(data)
      } catch (error) {
        console.log(error)
      }
    }
    getVideoData()
  }, [videoId])

  return (
    <div className="App">
      <Header />
      <video controls muted autoPlay crossOrigin="anonymous">
        <source
          src={`http://localhost:4000/video/${videoId}`}
          type="video/mp4"
        />
        <track
          label="English"
          kind="captions"
          srcLang="en"
          src={`http://localhost:4000/video/${videoId}/caption`}
          default
        />
      </video>
      <h1>{videoData.name}</h1>
      <Footer />
    </div>
  )
}

export default Player
