import axios from 'axios';

import { 
	LOGIN_USER
} from './types';


import { USER_SERVER } from '../components/utils/misc'



export function loginUser(dataToSubmit){
	
		// 요청이라는 이름의 변수에 dataToSubmit을 저장하고 
		// axios post로 서버에 보내고 
		// promise 리턴 받을 거니까 
		// 그거를 이 함수에서 리턴값으로 
		const request = axios.post(`${USER_SERVER}/login`, dataToSubmit)
		.then(response => response.data);
		
		return {
			type: LOGIN_USER,
			payload: request
			
		}
	
}