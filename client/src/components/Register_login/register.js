import React, { Component } from 'react';
import FormField from '../utils/Form/formField';
import { connect } from 'react-redux';
import { update, generateData, isFormValid } from '../utils/Form/formActions';
import { withRouter } from 'react-router-dom';
import { loginUser } from '../../actions/user_actions';



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
          required: true,

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
          required: true,

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
          placeholder: '패스워드'
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
	}
	
	
	
	render() {
		return (
			<div>
				Register
			</div>
		)
	}
}


export default connect()(withRouter(Register));