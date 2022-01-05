import axios from 'axios'

const LandingPage = ({ currentUser }) => {
  console.log('currentUser', currentUser)

  return <h1>Landing Page</h1>
}

LandingPage.getInitialProps = async ({ req }) => {
  if (typeof window === 'undefined') {
    const { data } = await axios.get(
      'http://local-ingress-srv/api/users/current_user',
      {
        headers: req.headers
      }
    )

    return data
  } else {
    const { data } = await axios.get('/api/users/current_user')

    return data
  }
}

export default LandingPage
