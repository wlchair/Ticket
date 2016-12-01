var application_root = __dirname,
	express = require('express'),
	bodyParser = require('body-parser'),
	path = require('path');
// mongoose = require('mongoose');

var app = express();
// mongoose.connect('mongodb://localhost/library_database');
// var container = new mongoose.Schema({
// 	modelCell: String
// });
// var ContainerModel = mongoose.model('container', container);

app.configure(function() {
	app.use(bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(path.join(application_root, './')));
	app.use(express.errorHandler({
		dumpExceptions: true,
		showStack: true
	}));
});


app.post('/text.htm/fill_bgcolor', function(request, response) {
	for (var i = 0; i < 10000; i++) {
		console.log('run');
	}
	return response.send({
		returncode: -1
	});
});
app.post('/och/front/sh/app', function(request, response) {
	var wait = function(mils) {
		var now = new Date();
		while (new Date - now <= mils);
	}
	var actionType = request.body.requestAction;
	wait(3000);
	if (actionType == 'GetAppointmentSource') {
		response.send({
			"code": "000000",
			"msg": "",
			"data": [{
				"SourceSeq": "549427257",
				"AptVisitDate": "2016-12-02",
				"AptType": 0,
				"AptTypeName": "门诊",
				"SourceType": 3,
				"SourceTypeName": "专业",
				"SchedulingCode": "01",
				"SchedulingName": "上午号",
				"SpecCode": "106014",
				"DoctorCode": "",
				"DoctorName": "",
				"RegFee": 5.0,
				"ValidNumber": 25,
				"SpecName": "口腔黏膜专业普通门诊",
				"DeptCode": "28",
				"DeptName": "口腔科"
			}, {
				"SourceSeq": "549427258",
				"AptVisitDate": "2016-12-02",
				"AptType": 0,
				"AptTypeName": "门诊",
				"SourceType": 3,
				"SourceTypeName": "专业",
				"SchedulingCode": "02",
				"SchedulingName": "下午号",
				"SpecCode": "106014",
				"DoctorCode": "",
				"DoctorName": "",
				"RegFee": 5.0,
				"ValidNumber": 0,
				"SpecName": "口腔黏膜专业普通门诊",
				"DeptCode": "28",
				"DeptName": "口腔科"
			}, {
				"SourceSeq": "549427567",
				"AptVisitDate": "2016-12-02",
				"AptType": 1,
				"AptTypeName": "特需",
				"SourceType": 1,
				"SourceTypeName": "专家",
				"SchedulingCode": "03",
				"SchedulingName": "小夜号",
				"SpecCode": "300049",
				"DoctorCode": "1003",
				"DoctorName": "特需小夜口腔科门诊",
				"RegFee": 300.0,
				"ValidNumber": 0,
				"SpecName": "特需口腔科小夜门诊",
				"DeptCode": "28",
				"DeptName": "口腔科"
			}, {
				"SourceSeq": "552986072",
				"AptVisitDate": "2016-12-02",
				"AptType": 0,
				"AptTypeName": "门诊",
				"SourceType": 3,
				"SourceTypeName": "专业",
				"SchedulingCode": "01",
				"SchedulingName": "上午号",
				"SpecCode": "106015",
				"DoctorCode": "",
				"DoctorName": "",
				"RegFee": 5.0,
				"ValidNumber": 0,
				"SpecName": "口腔颌面外科普通门诊",
				"DeptCode": "28",
				"DeptName": "口腔科"
			}, {
				"SourceSeq": "549427059",
				"AptVisitDate": "2016-12-02",
				"AptType": 0,
				"AptTypeName": "门诊",
				"SourceType": 3,
				"SourceTypeName": "专业",
				"SchedulingCode": "01",
				"SchedulingName": "上午号",
				"SpecCode": "106051",
				"DoctorCode": "",
				"DoctorName": "",
				"RegFee": 5.0,
				"ValidNumber": 1,
				"SpecName": "牙科普通门诊",
				"DeptCode": "28",
				"DeptName": "口腔科"
			}, {
				"SourceSeq": "549427580",
				"AptVisitDate": "2016-12-02",
				"AptType": 1,
				"AptTypeName": "特需",
				"SourceType": 1,
				"SourceTypeName": "专家",
				"SchedulingCode": "01",
				"SchedulingName": "上午号",
				"SpecCode": "300058",
				"DoctorCode": "476",
				"DoctorName": "张志苓",
				"RegFee": 300.0,
				"ValidNumber": 0,
				"SpecName": "张志玲（牙科）",
				"DeptCode": "28",
				"DeptName": "口腔科"
			}, {
				"SourceSeq": "549427076",
				"AptVisitDate": "2016-12-02",
				"AptType": 0,
				"AptTypeName": "门诊",
				"SourceType": 3,
				"SourceTypeName": "专业",
				"SchedulingCode": "01",
				"SchedulingName": "上午号",
				"SpecCode": "106052",
				"DoctorCode": "",
				"DoctorName": "",
				"RegFee": 7.0,
				"ValidNumber": 1,
				"SpecName": "牙科副主任医师",
				"DeptCode": "28",
				"DeptName": "口腔科"
			}]
		});
	}
	if (actionType == 'LockAppointmentSource') {
		response.send({
			"code": "000000"
		});
	}
});
// app.get('/excel.htm',function(request,response){
// 	return ContainerModel.find(function(err, container) {
// 		if (!err) {
// 			return response.send(container);
// 		} else {
// 			return console.log(err);
// 		}
// 	})
// });
// app.post('/text.htm', function(request, response) {
// 	for(var i =0 ;i<100000;i++){
// 		console.log(i);
// 	}
// 	response.send({
// 		returncode: 200
// 	});
// });
// app.post('/template/merge/cells.html', function(request, response) {
// 	var container = new ContainerModel({
// 		contents: request.body.contents,
// 		completeStatus: request.body.completeStatus
// 	});
// 	container.save(function(err) {
// 		if (!err) {
// 			return console.log(container);
// 		} else {
// 			return console.log(err);
// 		}
// 		return response.send(container);
// 	});
// });
// app.get('/template/merge/cells.html', function(request, response) {
// 	var container = new ContainerModel({
// 		contents: request.body.contents,
// 		completeStatus: request.body.completeStatus
// 	});
// 	container.save(function(err) {
// 		if (!err) {
// 			return console.log(container);
// 		} else {
// 			return console.log(err);
// 		}
// 		return response.send(container);
// 	});
// });

// app.post('/template/cells.htm?m=create', function(request, response) {
// 	var container = new ContainerModel({
// 		contents: request.body.contents,
// 		completeStatus: request.body.completeStatus
// 	});
// 	container.save(function(err) {
// 		if (!err) {
// 			return console.log('has created');
// 		} else {
// 			return console.log(err);
// 		}
// 		return response.send(container);
// 	});
// });


// app.put('/notes/containers/:id', function(request, response) {
// 	console.log('Updating container ' + request.body.id);
// 	return ContainerModel.findById(request.params.id, function(err, container) {
// 		container.contents = request.body.contents;
// 		container.completeStatus = request.body.completeStatus;

// 		return container.save(function(err) {
// 			if (!err) {
// 				console.log('Container updated');
// 			} else {
// 				console.log(err);
// 			}
// 			return response.send(container);
// 		});
// 	});
// });
// app.delete('/notes/containers/:id', function(request, response) {
// 	console.log('Deleting Container with id: ' + request.params.id);
// 	return ContainerModel.findById(request.params.id, function(err, container) {
// 		return container.remove(function(err) {
// 			if (!err) {
// 				console.log('Container removed');
// 				return response.send('');
// 			} else {
// 				console.log(err);
// 			}
// 		});
// 	});
// });

var port = 4711;

app.listen(port, function() {
	console.log('express server listening on port %d in %s mode', port, app.settings.env)
});