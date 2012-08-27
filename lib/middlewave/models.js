var fs = require('fs'),
	utils	= require('../utils.js');

//是否js文件检测正则对象
var jsFile = new RegExp(/\.js$/);

//是否文件夹检测正则对象
var folder = new RegExp(/^[a-z0-9]+$/);

//model构造函数
function Models() {
	this.models = {};
	this.init();
}

var proto = Models.prototype;

//初始化函数
proto.init = function() {
	this.setModel(config.modelsDir);
}

//循环读取并设置model
proto.setModel = function(dir) {
	var obj = this.models;
	var fileDir = this.readDir(dir);
	for(var i in fileDir) {
		//类文件检测
		if(jsFile.test(fileDir[i])) {
			var name = this.formatName(dir+"/"+fileDir[i].slice(0,-3));
			obj[name] = require(dir + "/" + fileDir[i]);
			continue;
		}

		//文件夹检测
		if(folder.test(fileDir[i])) {
			this.setModel(dir + "/" + fileDir[i]);
			continue;
		}
	}
}

//读取文件夹
proto.readDir = function(dir) {
	console.log('routing read models in' + dir);
	var data;
	try {
		data = fs.readdirSync(dir);
	} catch(e) {
		console.log('not found');
		return [];
	}
	return data;
}

//格式化函数名
proto.formatName = function(name) {
	//去除绝对路径
	name = name.replace(config.modelsDir,"");
	name = name.replace(/(\/.)/g,function(d,c) {return "_" + d.slice(1,2).toUpperCase()});
	return name = "Model" + name;
}

var modelist = (new Models()).models;

function models() {
	return function(req, res, next) {
		if(req.models) {
			utils.merger(req.models, modelist);
		} else {
			req.models = modelist;
		}
	}		
}
module.exports = models;
