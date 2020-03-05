import React from 'react'
import Error from './error'

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.demoLogin = this.demoLogin.bind(this);
  }

  demoLogin(e) {
    e.preventDefault();
    this.props.loginUser({ email: "demo@example.com", password: "abcd1234" });
  }

  componentWillUnmount() {
    this.props.clearErrors();
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    const that = this;
    e.preventDefault();
    const { email, password } = this.state;
    this.props.processForm({
      email, password
    })
      .then(function (res) {
        if (that.props.redirect) {
          that.props.pushHistory('/create');
        }
      })
  }

  render() {
    const { errors, type } = this.props;
    return (
      <>
        <form onSubmit={this.handleSubmit} className="session-form">
          <span>Enter your <b>email address</b> and <b>password.</b></span>
          <label>
            <input type="text" name="email" placeholder="name@example.com" onChange={this.handleChange}/>
          </label>

          <label>
            <input type="password" name="password" placeholder="password" onChange={this.handleChange}/>
          </label>

          <input type="submit" value={type}/>
          <input type="submit" value="Demo Login" onClick={this.demoLogin}/>
        </form>

        <ul>
          {Object.keys(errors).map((err,idx) => (
            <Error err={{ [err]: errors[err] }} key={idx} />
          ))}
        </ul>
      </>
    )
  } 
}

export default SessionForm;