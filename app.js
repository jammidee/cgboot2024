/**
 * Copyright (C) 2012-2024 Lalulla OPC. All rights reserved.
 * Copyright (c) 2017 - Joel M. Damaso - mailto:jammi_dee@yahoo.com Manila/Philippines
 * This file is part of Lalulla OPC System.
 * 
 * Lalulla Framework is distributed under the terms of the GNU General Public License 
 * as published by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * Lalulla System is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with Cloud Gate System.  If not, see <http://www.gnu.org/licenses/>.
 * 
 * Framework Designed by: Jammi Dee (jammi_dee@yahoo.com)
 * 10/22/2023
 * 
*/

var createError 		= require('http-errors');
var express 			= require('express');
var session				= require('express-session');	
var path 				= require('path');
var cookieParser 		= require('cookie-parser');
var logger 				= require('morgan');

var indexRouter 		= require('./routes/index');
var indexLogin 			= require('./routes/login');
var usersRouter 		= require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//=============================================================
// Demo mode scripts. This will protect the app from executing 
// when the date had expired.
// Added by Jammi Dee 02/10/2019
//=============================================================

//Expiration date of the demo app
var xdate = new Date("2030-02-12");
//The current date
var cdate = new Date();

if( cdate > xdate){
  //throw  new Error ('Time-bound access to the app error!');
  console.log('============================================================================');
  console.log('Time-bound access to the app has been reached!');
  console.log('The limit is ' + xdate );
  console.log('============================================================================');
  
  process.exit();
  
}



//Declare initial values of sessions
//resave is important to be true for rolling age
app.use(session({
	cookieName: 				  	'session',
	secret: 					  	'Lux in Domino',
	duration: 					  	30 * 60 * 1000,
	activeDuration: 				5 * 60 * 1000,
	resave: 					    true,
	saveUninitialized: 				true,
	rolling: 					    true,
	cookie: { maxAge: 				30 * 60 * 1000 },
	ephemeral: 					  	true,
	varAppName:					  	'Lalulla Template',
	varAppCopyright:				'Lalulla Copyright 2024',
	varAppPrefix:				  	'LAM',
	varAppContext:					'laMobile2018',
	varAppId:					    'LAMOBILE',
	varAppCategory:					'B2C',
	logged: 						'NO'
}));

//=======================
// Path of the jQuery JS
//=======================

app.use('/admin-lte/node_modules', express.static(path.join(__dirname, 'node_modules', 'admin-lte', 'node_modules')));
app.use('/admin-lte/node_modules/plugins', express.static(path.join(__dirname, 'node_modules', 'admin-lte', 'plugins')));

//jQuery 3.5.1+ 10/22/2023
app.get('/admin-lte/plugins/jquery/jquery.min.js', function(req, res) {
	res.sendFile(__dirname + '/node_modules/admin-lte/plugins/jquery/jquery.min.js');
});

//Admin LTE 10/22/2023
app.use('/admin-lte/js', express.static(path.join(__dirname, 'node_modules', 'admin-lte', 'dist', 'js')));
app.get('/admin-lte/js/adminlte.js', function(req, res) {
	res.sendFile(__dirname + '/node_modules/admin-lte/dist/js/adminlte.min.js');
});
app.use('/admin-lte/css', express.static(path.join(__dirname, 'node_modules', 'admin-lte', 'dist', 'css')));
app.get('/admin-lte/css/adminlte.css', function(req, res) {
	res.sendFile(__dirname + '/node_modules/admin-lte/dist/css/adminlte.min.css');
});

//Bootstrap 4.6 10/22/2023
app.use('/admin-lte/node_modules/bootstrap/js', express.static(path.join(__dirname,  'node_modules', 'boostrap','dist', 'js')));
app.get('/admin-lte/node_modules/bootstrap/js/bootstrap.js', function(req, res) {
	res.sendFile(__dirname + '/node_modules/bootstrap/dist/js/bootstrap.bundle.min.js');
});
app.get('/admin-lte/node_modules/bootstrap/js/bootstrap.bundle.min.js.map', function(req, res) {
	res.sendFile(__dirname + '/node_modules/bootstrap/dist/js/bootstrap.bundle.min.js.map');
});

app.use('/admin-lte/node_modules/bootstrap/css', express.static(path.join(__dirname,  'node_modules', 'boostrap','dist', 'css')));
app.get('/admin-lte/node_modules/bootstrap/js/bootstrap.js', function(req, res) {
	res.sendFile(__dirname + '/node_modules/bootstrap/dist/js/bootstrap.bundle.min.css');
});
app.get('/admin-lte/node_modules/bootstrap/js/bootstrap.bundle.min.css.map', function(req, res) {
	res.sendFile(__dirname + '/node_modules/bootstrap/dist/js/bootstrap.bundle.min.css.map');
});

//Font Awesome Free 10/22/2023
app.use('/admin-lte/plugins/fontawesome-free/webfonts', express.static(path.join(__dirname, 'node_modules', 'admin-lte', 'plugins', 'fontawesome-free', 'webfonts')));
app.get('/admin-lte/plugins/fontawesome-free/css/all.css', function(req, res) {
	res.sendFile(__dirname + '/node_modules/admin-lte/plugins/fontawesome-free/css/all.css');
});

//-iCheck-Bootstrap Free 10/22/2023
app.get('/admin-lte/plugins/icheck-bootstrap/icheck-bootstrap.min.css', function(req, res) {
	res.sendFile(__dirname + '/node_modules/admin-lte/plugins/icheck-bootstrap/icheck-bootstrap.min.css');
});

//PopperJS 1.16.1 10/22/2023
app.use('/admin-lte/plugins/popper', express.static(path.join(__dirname, 'node_modules', 'admin-lte', 'plugins', 'popper', 'umd' )));
app.get('/admin-lte/plugins/popper/popper.min.js', function(req, res) {
	res.sendFile(__dirname + '/node_modules/admin-lte/plugins/popper/umd/popper.min.js');
});


//Added by Jammi Dee 10/22/2023
// Declare application global variables here
/**
 * Global variable declaration.
 * @name Global variables
 * @function
 * @global
 * @todo Add all possible global variables here.
 */
app.use(function(req, res, next) {
      
  require('dotenv').config();

  	req.session.cgAppId					    = process.env.APP_ID || 'LAM';
	req.session.cgAppName					= process.env.APP_NAME || 'LAMOBILE';
	req.session.cgAppVersion				= process.env.APP_VERSION || '0.0.0';
	req.session.cgAppDesc					= process.env.APP_DESC || 'This an official template of Lalulla Framework using NodeJS';
	req.session.cgAppPrefix					= process.env.APP_PREFIX || 'LAT';
	
	// Protect the app from F12 or view source in the browser
	// The script is location in the cgJsGlobal.pug
	// Added by Jammi Dee 07/13/2021
	req.session.cgAppProtect				= process.env.APP_PROTECT || 'ON';
	
	// Framework and App version are the same 
	// during framework development.
	req.session.cgFrameCodeName			= process.env.APP_FRAMECODENAME || 'Alstroemeria'; 			// http://www.typesofflowers.co.uk/flower-list
	req.session.cgFrameVersion			= process.env.APP_FRAMEVERSION || '0.0.0'; 							// versioning http://semver.org/
	req.session.cgFrameworkVersion		= process.env.APP_FRAMEVERSION || '0.0.0'; 

	//Added by Jammi Dee - 07/10/2021
	//Get the initial signupentity. Well be used for default entity as well
	req.session.signupEntity			= process.env.APP_SIGNUPENTITY || 'LALULLA';
	req.session.entityid				= process.env.APP_SIGNUPENTITY || 'LALULLA';

	//Non session ID yet
	req.session.cgSessId				= '';
	req.session.cgMotd					= '';

	//Collapse side page 10/24/2017 
	//Values: sidebar-collapse, layout-top-nav, layout-boxed, fixed
	//Use blank for normal page mode
	req.session.cgBodyClass				= '';
	
	//Site Mode - Provides a website like interface before the user login to the system
	//Added by Jammi Dee 27/2017
	req.session.cgSiteMode				= 'YES';

	//Added by Jammi Dee 12/11/2021
	req.session.appprotect				= process.env.APP_PROTECT || 'OFF';
	req.session.enforcecaptcha			= process.env.APP_ENFORCECAPTCHA || 'OFF';
	req.session.enforcehttps			= process.env.APP_ENFORCEHTTPS || 'OFF';
	req.session.enforceotp				= process.env.APP_ENFORCEOTP || 'OFF';
	
	//Framework switches
	req.session.cgSwApp					= 'YES';						//Application Menu
	req.session.cgSwMsg					= 'YES';						//Message module
	req.session.cgSwNoti				= 'YES';						//Notification module
	req.session.cgSwTask				= 'YES';						//Task module
	req.session.cgSwRight				= 'YES';						//Right side column
	req.session.cgSwNoDev				= 'YES';						//All Development page and features
	req.session.cgSwLog					= 'YES';						//Added by Jammi Dee logging switch
	
	//Added by Jammi Dee 03/20/2018
	req.session.cgSwApp 				= process.env.APP_SWITCH_APP ||'ON';
	req.session.cgSwMsg 				= process.env.APP_SWITCH_MSG ||'ON';
	req.session.cgSwNoti 				= process.env.APP_SWITCH_NOTI ||'ON';
	req.session.cgSwTask 				= process.env.APP_SWITCH_TASK ||'ON';
	req.session.cgSwRight 				= process.env.APP_SWITCH_RIGHT ||'ON';
	req.session.cgSwNoDev 				= process.env.APP_SWITCH_NODEV ||'ON';
	//Added by Jammi Dee 04/14/2018
	req.session.cgSwLog 	= process.env.APP_SWITCH_LOG ||'ON';
	
	
	res.locals.logged					= 'NO';
  
  
	//Config declarations that can be access in pages using
	//the format #{config.cfgName}
	app.locals.config = {
					cfgName: 'Jammi Dee',
					cfgPhone: '0917-580-9483',
					cfgEmail: 'jammi_dee@yahoo.com'
				}
    
	if(!res.locals.cgAboutCnt){
		
		res.locals.cgAboutCnt = 1;
		
	} else {
		
		res.locals.cgAboutCnt = 2;
		
	}
    
	//=====================================================
	// Configuration for Synchronization - JMD 10/31/2021
	//=====================================================
	// req.session.masterhost					= nconf.get('masterhost');
	// req.session.masterport					= nconf.get('masterport');
	// req.session.syncentity					= nconf.get('syncentity');
	// req.session.targettable					= nconf.get('targettable');
	// req.session.includeall					= nconf.get('includeall');
	// req.session.testmode					  = nconf.get('testmode');
	// req.session.routemode					  = nconf.get('routemode');
	// req.session.sourcefolder				= nconf.get('sourcefolder');
	// req.session.targetfolder				= nconf.get('targetfolder');
	// req.session.sourcerecreate				= nconf.get('sourcerecreate');
	
	next();
});



app.use('/', indexRouter);
app.use('/login', indexLogin);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
