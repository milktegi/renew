import React from 'react';
import MyButton from '../utils/button';

import Login from '../Register_login/login';

const RegisterLogin = () => {
		return(
			<div className="page_wrapper">
					<div className="container">
							<div className="register_login_container">
									<div className="left">
											<h1>회원 계정 생성</h1>
											<p>커피프렌즈에 오신것을 환영합니다. 
												새로운 계정을 만들고 커피의 세계에 빠져보세요.
											</p>
									<MyButton
											type="default"
											title="create an account"
											linkTo="/register"
											addStyles={{
													margin: '10px 0 0 0',
											}}
									/>
									
									</div>
									<div className="right">
										<h2>신규 회원 가입</h2>
										<p>아이디가 있으면 로그인하세요.</p>
										<Login/>
									</div>
							</div>
					</div>
			</div>
		)
}

export default RegisterLogin;