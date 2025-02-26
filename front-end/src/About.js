import { useState, useEffect } from 'react'
import axios from 'axios'
import './About.css'

/**
 * A React component that fetches and displays information about you.
 * The data is retrieved from the back-end API endpoint.
 * @param {*} props any props passed to this component
 * @returns The JSX for the About page.
 */
const About = props => {
  const [aboutData, setAboutData] = useState(null)
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState('')

  /**
   * A function to fetch the About data from the back-end.
   */
  const fetchAbout = () => {
    axios
      .get(`${process.env.REACT_APP_SERVER_HOSTNAME}/api/about`)
      .then(response => {
        // assuming the response data is an object with name, bio, and image properties
        setAboutData(response.data)
      })
      .catch(err => {
        const errMsg = JSON.stringify(err, null, 2)
        setError(errMsg)
      })
      .finally(() => {
        setLoaded(true)
      })
  }

  // Fetch the About data when the component mounts.
  useEffect(() => {
    fetchAbout()
  }, [])

  if (error) return <p className="About-error">{error}</p>
  if (!loaded) return <p>Loading about information...</p>
  if (!aboutData) return <p>No about information available.</p>

  return (
    <div className="about-container">
      <h1>About Us</h1>
      <h2>{aboutData.name}</h2>
      <p>{aboutData.bio}</p>
      <img src={aboutData.image} alt={`${aboutData.name}'s profile`} />
    </div>
  )
}

export default About