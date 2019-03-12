import React, { Component } from 'react';
import FormField from '../utils/Form/formField';
import { connect } from 'react-redux';
import { update, generateData, isFormValid } from '../utils/Form/formActions';
import { withRouter } from 'react-router-dom';
import { registerUser } from '../../actions/user_actions';
import Dialog from '@material-ui/core/Dialog';

class Register extends Component {
  state = {
    formError: false,
    formSuccess: '',
    formdata: {
      name: {
        element: 'input',
        value: '',
        config: {
          name: 'name_input',
          type: 'text',
          placeholder: '이름'
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ''
      },
      nickname: {
        element: 'input',
        value: '',
        config: {
          name: 'nickname_input',
          type: 'text',
          placeholder: '닉네임'
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ''
      },
      email: {
        element: 'input',
        value: '',
        config: {
          name: 'email_input',
          type: 'email',
          placeholder: '이메일'
        },
        validation: {
          required: true
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
      },
      confirmPassword: {
        element: 'input',
        value: '',
        config: {
          name: 'confirmPassword_input',
          type: 'password',
          placeholder: '패스워드 확인'
        },
        validation: {
          required: true,
          confirm: 'password'
        },
        valid: false,
        touched: false,
        validationMessage: ''
      }
    }
  };

	
  updateForm = (element) => {
    const newFormdata = update(element, this.state.formdata, 'register');
    // console.log(newFormdata);
    this.setState({
      formError: false,
      formdata: newFormdata
    });
  };
	
	submitForm = (event) => {
    event.preventDefault();
    let dataToSubmit = generateData(this.state.formdata, 'register');
    // 또 유효성 검사 왜왜왜
    let formIsValid = isFormValid(this.state.formdata, 'register');

   if(formIsValid){
		 // dispatch action 
		 this.props.dispatch(registerUser(dataToSubmit))
		 .then(response=> {
			 if(response.payload.success){
				 this.setState({
					 formError: false,
					 formSuccess: true
				 });
				 setTimeout(()=>{
					 this.props.history.push('/register_login');
				 }, 3000)
			 } else {
				 this.setState({ formError: true })
			 }
		 }).catch(e => {
			 this.setState({ formError: true })
		 })
		 
		 console.log(dataToSubmit)
	 } else {
		 this.setState({
			 formError: true
		 })
	 }
  };

	
	
  render() {
    return (
      <div className='page_wrapper'>
        <div className='container'>
          <div className='register_login_container'>
            <div className='left'>
              <form onSubmit={(event) => this.submitForm(event)}>
                <h2>개인 정보</h2>
                <div className='form_block_two'>
                  <div className='block'>
                    <FormField
                      id={'name'}
                      formdata={this.state.formdata.name}
                      change={(element) => this.updateForm(element)}
                    />
                  </div>
									<div className='block'>
                    <FormField
                      id={'nickname'}
                      formdata={this.state.formdata.nickname}
                      change={(element) => this.updateForm(element)}
                    />
                  </div>
                </div>
								<div>
								<FormField
                      id={'email'}
                      formdata={this.state.formdata.email}
                      change={(element) => this.updateForm(element)}
                    />
								</div>
								<h2>패스워드 확인</h2>
								<div className='form_block_two'>
								<div className='block'>
                    <FormField
                      id={'password'}
                      formdata={this.state.formdata.password}
                      change={(element) => this.updateForm(element)}
                    />
                  </div>
									<div className='block'>
                    <FormField
                      id={'confirmPassword'}
                      formdata={this.state.formdata.confirmPassword}
                      change={(element) => this.updateForm(element)}
                    />
                  </div>
									
								</div>
								<div>
									{ this.state.formError ?
									
									<div className="error_label">
											please check your data
									</div>
									
									: null }
									<button onClick={(event)=> this.submitForm(event)}>
											회원 가입
									</button>
								</div>
								
								
              </form>
            </div>
          </div>
        </div>
				
				<Dialog open={this.state.formSuccess}>
										<div className="dialog_alert">
												<div>congraturation</div>
										</div>
				</Dialog>
      </div>
    );
  }
}

export default connect()(Register);
