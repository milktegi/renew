

export const validate = (element, formdata = []) => {
		
		let error = [ true, ''];
		
		// 이메일에 관한 유효성검증 
		if(element.validation.email){
				const valid = /\S+@\S+\.\S+/.test(element.value)
				const message = `${!valid ? '유효한 이메일을 입력' : ''}`;
				error = !valid ? [valid, message] : error;
				
		}
		
		if(element.validation.confirm){
			const valid = element.value.trim() === formdata[element.validation.confirm].value;
			const message = `${!valid ? '패스워드가 일치하지 않습니다' : ''}`;
			error = !valid ? [valid, message] : error;
		}
		
		
		// validation.required가 존재하면,
		// 하나라도 문자열 입력이 있다는 거니까
		// 일단 해당 문자열 객체의 value 프로퍼티가 빈문자열인지 확인하고
		// 빈문자열이 아니면 valid 라는 변수에 저장 
		// valid 변수가 falsy이면 false랑 필수입력사항입니다가 나오고 
		// truthy이면 default로 true랑 nothing이 저장되어 있는 그값을 대입. 
		if(element.validation.required){
				const valid = element.value.trim() !== '';
				const message = `${!valid ? '필수 입력 사항입니다' : ''}`
				error = !valid ? [ valid, message] : error;
		}		
		
		return error;
}


export const update = (element, formdata, formName) => {
		
		// 유저가 입력한 formdata 상태 객체를 전달 받고 
		const newFormdata = {
				...formdata
		}
		// 그게 email도 있고 password도 있으니까 
		// 다음과 같이 변수에 저장해두고 
		const newElement = {
			...newFormdata[element.id]
		}
		// 유저가 실제로 입력한 문자들을 newElement객체의 
		// .value 프로퍼티 안에 저장한다. 
		newElement.value = element.event.target.value;
		
		// 인풋 필드에 대한 유효성 검사 
		if(element.blur){
			let validData = validate(newElement, formdata);
			newElement.valid = validData[0]; // false of true 
			newElement.validationMessage = validData[1]; // message 
		}
		newElement.touched = element.blur;
		newFormdata[element.id] = newElement;
		
		return newFormdata;
		
}


// 데이터 생성 인풋필드 

export const generateData = (formdata, formName) => {
	let dataToSubmit = {}
	for(let key in formdata){
		
		if(key !== 'confirmPassword'){
			dataToSubmit[key] = formdata[key].value;
		}
		
	
		
	}
	return dataToSubmit;
}

export const isFormValid = (formdata, formName) => {
	
		let formIsValid = true; 
		for(let key in formdata){
			formIsValid = formdata[key].valid && formIsValid;
		}
}