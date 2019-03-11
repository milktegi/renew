import React, { Component } from 'react';
import FormField from '../utils/Form/formField';
import { connect } from 'react-redux';
import { update, generateData, isFormValid } from '../utils/Form/formActions';
import { withRouter } from 'react-router-dom';
import { loginUser } from '../../actions/user_actions';

class Login extends Component {
  state = {
    formError: false,
    formSuccess: '',
    formdata: {
      email: {
        element: 'input',
        value: '',
        config: {
          name: 'email_input',
          type: 'email',
          placeholder: '이메일'
        },
        validation: {
          required: true,
          email: true
        },
        valid: false,
        touched: false,
        validationMessage: ''
      },
      password: {
        element: 'input',
        value: '',
        config: {
          name: 'password_input',
          type: 'password',
          placeholder: '패스워드'
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ''
      }
    }
  };

  updateForm = (element) => {
    const newFormdata = update(element, this.state.formdata, 'login');
    // console.log(newFormdata);
    this.setState({
      formError: false,
      formdata: newFormdata
    });
  };

  submitForm = (event) => {
    event.preventDefault();
    let dataToSubmit = generateData(this.state.formdata, 'login');
    // 또 유효성 검사 왜왜왜
    let formIsValid = isFormValid(this.state.formdata, 'login');

    if (formIsValid) {
      this.props.dispatch(loginUser(dataToSubmit)).then((response) => {
				if(response.payload.loginSuccess){
					console.log(response.payload)
					this.props.history.push('/user/dashboard')
				} else {
					this.setState({
						 formError: true
					})
				}
			});
    } else {
      this.setState({
        formError: true
      });
    }
  };

  render() {
    return (
      <div className='signin_wrapper'>
        <form onSubmit={(event) => this.submitForm(event)}>
          <FormField
            id={'email'}
            formdata={this.state.formdata.email}
            change={(element) => this.updateForm(element)}
          />
          <FormField
            id={'password'}
            formdata={this.state.formdata.password}
            change={(element) => this.updateForm(element)}
          />

          {this.state.error ? (
            <div className='error_label'>입력 정보를 다시한번 확인해주세요.</div>
          ) : null}
          <button onClick={(event) => this.submitForm(event)}>로그인</button>
        </form>
      </div>
    );
  }
}

export default connect()(withRouter(Login));
