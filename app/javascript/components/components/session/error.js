import React from 'react';
import ErrorImg from 'images/error-img'

const Error = ({ err }) => {
  debugger
  return (
    <>
      {err["password"] && 
        <div className="session-error">
          <img src={ErrorImg} />
          Password {err["password"]}.
        </div>
      }
      {err["email"] && 
        <div className="session-error">
          <img src={ErrorImg} />
          You must provide a valid email address.
        </div>
      }
      {err["login"] && 
        <div className="session-error">
          <img src={ErrorImg} />
          Sorry, you entered an incorrect email address or password.
        </div>
      }
    </>
  )
}

export default Error;