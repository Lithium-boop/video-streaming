import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import Header from './Header'
import Footer from './Footer'

const Home = () => {
  const [videos, setVideos] = useState([])

  useEffect(() => {
    const getVideos = async () => {
      try {
        const response = await fetch('http://localhost:4000/videos')
        const data = await response.json()
        setVideos([...data])
      } catch (error) {
        console.log(error)
      }
    }
    getVideos()
  }, [])

  return (
    <div className="App App-header">
      <Header />
      <div className="container">
        <div className="row">
          {videos.map((video) => (
            <div className="col-md-4" key={video.id}>
              <Link to={`/player/${video.id}`}>
                <div className="card border-0">
                  <img
                    src={`http://localhost:4000${video.poster}`}
                    alt={video.name}
                  />
                  <div className="card-body">
                    <p>{video.name}</p>
                    <p>{video.duration}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Home
