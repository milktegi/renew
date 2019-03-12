import React from 'react';
import { Link } from 'react-router-dom';

const links = [
	{
		name: '내 계정',
		linkTo: '/user/dashboard'
	},
	{
		name: '유저 정보',
		linkTo: '/user/user_profile'
	},
	{
		name: '장바구니',
		linkTo: '/user/cart'
	},
]

const UserLayout = (props) => {
	return(
		<div className="container">
			<div className="user_container">
				
			</div>
		</div>
	)
}

export default UserLayout;