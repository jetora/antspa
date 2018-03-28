import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Form, Input, Button, notification, Icon } from 'antd';
import Messages from '../notifications/Messages'
import Errors from '../notifications/Errors'

import loginRequest from './actions'
import './index.less'
// If you were testing, you'd want to export this component
// so that you can test your custom made component and not
// test whether or not Redux and Redux Form are doing their jobs
const FormItem = Form.Item;
const createForm = Form.create;
class Loginpage extends Component {
    constructor(props) {
        super(props)

    }
  // Pass the correct proptypes in for validation
  static propTypes = {
      postLogin: PropTypes.func,
      login: PropTypes.shape({
      requesting: PropTypes.bool,
      successful: PropTypes.bool,
      messages: PropTypes.array,
      errors: PropTypes.array,
    }),
  }

  // Remember, Redux Form passes the form values to our handler
  // In this case it will be an object with `email` and `password`
  submit = (e) => {
      e.preventDefault();
      let n = this.props.form.getFieldsValue().email;
      let p = this.props.form.getFieldsValue().password;
      this.props.postLogin({email:n,password:p})
  }
  render () {
    const {
      login: {
        requesting,
        successful,
        messages,
        errors,
      },
    } = this.props
      const { getFieldDecorator } = this.props.form
    return (
      <div className="loginpagewrap">
          <div className="box">
              <p>Welcome to the React</p>
              <div className="loginWrap">
                  <Form onSubmit={this.submit}>
                      <FormItem>
                          {getFieldDecorator('email', {
                              rules: [{ required: true, message: '请输入用户名' }],
                          })(
                              <Input placeholder="Username：123" />
                          )}
                      </FormItem>
                      <FormItem>
                          {getFieldDecorator('password', {
                              rules: [{ required: true, message: '请输入密码' }],
                          })(
                              <Input type="password" placeholder="Password：123" />
                          )}
                      </FormItem>
                      <Button type="primary" htmlType="submit" className="loginBtn">Login</Button>
                  </Form>

        <div className="auth-messages">
          {/* As in the signup, we're just using the message and error helpers */}
          {!requesting && !!errors.length && (
            <Errors message="Failure to login due to:" errors={errors} />
          )}
          {!requesting && !!messages.length && (
                <Messages messages={messages} />
          )}
          {requesting && <div>Logging in...</div>}
          {!requesting && !successful && (
            <Link to="/signup">Need to Signup? Click Here »</Link>
          )}
        </div>
      </div>
          </div>
      </div>
    )
  }
}

// Grab only the piece of state we need
const mapStateToProps = state => ({
  login: state.login,
})
const mapDispatchToProps = (dispatch) => {
    return {
        postLogin: payload => {
            dispatch(loginRequest(payload))
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(createForm()(Loginpage));