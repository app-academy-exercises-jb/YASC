import React from 'react'
import HeaderContainer from '../home_page/header_container'

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillUnmount() {
    this.props.clearErrors();
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { email, password } = this.state;
    this.props.processForm({
      email, password
    })
  }

  render() {
    const { errors, type } = this.props;
    return (
      <div className="front-page">
        <HeaderContainer />
        <div>
          <ul>
            {Object.keys(errors).map((err,idx) => (
              <li key={idx}>{err}: {errors[err]}</li>
            ))}
          </ul>
      
          <form onSubmit={this.handleSubmit}>
              <label>
                Email:
                <input type="text" name="email" onChange={this.handleChange}/>
              </label>

              <label>
                Password:
                <input type="password" name="password" onChange={this.handleChange}/>
              </label>

              <input type="submit" value={type}/>
          </form>
        </div>
      </div>
    )
  } 
}

export default SessionForm;