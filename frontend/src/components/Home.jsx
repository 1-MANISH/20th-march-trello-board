import { Link } from 'react-router'
import '../style/home.scss'

const Home = () => {
  return (
    <main className="home-page">
      <div className="home-content box-shadow">
        <h1>Build your team's to-do flow like Trello</h1>
        <p>
          For organizations and startups: organize tasks, track progress, and
          move faster with a simple board workflow.
        </p>
        <div className="home-actions">
          <Link className="home-button login" to="/login">Login</Link>
          <Link className="home-button signup" to="/signup">Signup</Link>
        </div>
      </div>
    </main>
  )
}

export default Home