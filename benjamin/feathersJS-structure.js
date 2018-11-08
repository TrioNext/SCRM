/*
- initial : script run :
	- Load main object : app.js
	- use main object : as a web server : listening for request

	app.js : Cài đặt - thiết lập
	- load all lib object : ready for using them
	- config các object này để trở thành 1 web server

		- expressJS : RESTful
		- socket : realtime
		- middleware
		- services : load all services : đây là thành phần chính :
		- hooks : load main object hooks
		- channels : định nghĩa main object channel, và gán user -> channel room : dùng chung
		- Database object
			- sequelize : object hỗ trợ query database

		- authentication : object dùng để tạo token API


		-> dùng main object app : thiết lập ExpressJS : RESTFUL
		-> main app : thiết lập môi trường thông số môi trường server
		-> main app : thiết lập bảo mật :
			- cơ chế http:method : GET - POST - UPDATE - PATCH - DELETE..

		-> thiêt lập 1 trang tỉnh của server
		-> thiết lập socket - database object - channel
		-> thiết lập : trình quản lý lỗi
		-> thiết lập hooks :
    
*/
