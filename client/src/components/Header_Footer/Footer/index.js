import React from 'react';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faCompass from '@fortawesome/fontawesome-free-solid/faCompass';
import faPhone from '@fortawesome/fontawesome-free-solid/faPhone';
import faClock from '@fortawesome/fontawesome-free-solid/faClock';
import faEnvelope from '@fortawesome/fontawesome-free-solid/faEnvelope';

const Footer = () => {
	return(
		<footer className="bck_b_dark">
				<div className="container">
						<div className="logo">
								perfect coffee
						</div>
						<div className="wrapper">
					
								<div className="left">
										<h2>고객센터</h2>
										<div className="business_nfo">
												<div className="tag">
														<FontAwesomeIcon
																icon={faCompass}
																className="icon"
														/>
														<div className="nfo">
																<div>주소</div>
																<div>경기도 성남시 분당구 판교로</div>
														</div>
												</div>
												<div className="tag">
														<FontAwesomeIcon
																icon={faPhone}
																className="icon"
														/>
														<div className="nfo">
																<div>주소</div>
																<div>010-1111-1111</div>
														</div>
												</div>
												<div className="tag">
														<FontAwesomeIcon
																icon={faClock}
																className="icon"
														/>
														<div className="nfo">
																<div>상담문의시간</div>
																<div>월-금 /9am-8pm</div>
														</div>
												</div>
												<div className="tag">
														<FontAwesomeIcon
																icon={faEnvelope}
																className="icon"
														/>
														<div className="nfo">
																<div>이메일</div>
																<div>windflower@gmail.com</div>
														</div>
												</div>
										</div>
										
								</div>
								<div className="left">
										<h2>1:1 문의</h2>
										<div>
											<div>
													궁금한 점이 있으신가요?
													1:1 문의에 남겨주시면 친절히 답변 드리겠습니다.
											</div>
										</div>
								</div>
						</div>
				</div>
		</footer>
	)
}

export default Footer; 