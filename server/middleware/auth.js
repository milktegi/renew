const { User } = require('./../models/user');

let auth = (req, res, next) => {
	let token = req.cookies.w_auth;
	User.findByToken(token, function(err, user){
			if(err) throw err;
			if(!user) return res.json({
				isAuth: false,
				error: true
			});

			// 유저 로그인 허용 
			req.token = token; 
			req.user = user;
			next();

	})

//////////////


}


module.exports = { auth }