import React from 'react'
import { Link } from 'react-router-dom'


class Greeting extends React.Component {
  render() {
    const user = this.props.user;
    return (
      <div>
        {user 
          ? <>
            Hello {user.email}
            <button onClick={() => {this.props.logoutUser(user)}}>Log out</button>
          </>
          : <div style={{display:"flex", flexDirection: "column"}}>
            <Link to="/login">Sign in</Link>
            <Link to="/signup">Sign up</Link>
          </div>
        }
      </div>
    )
  }
}

export default Greeting