var path = require("path"), 
	utils = module.exports = exports;

//继承函数
util.expend = function(sub,sup) {
	var F = function() {};
	F.prototype = sup.prototype;
	sub.prototype = new F();
}

/**
 * 字符串处理函数
 * @constructor
 * @param {String|Array} str 初始字符
 */
function _StringBuffer (str) {
	if(str instanceof String) {
		this._string = new Array(str);
	} else if(str instanceof Array) {
		this._string = new Array();
		var temp = this;
		str.forEach(function(param) {
			temp.append(param);
		})
	} else {
		this._string = new Array();
	}
};
//_StringBuffer原型方法

_StringBuffer.prototype.append = function(str) {
	this._string.push(str);
	return this;
};

_StringBuffer.prototype.prepend = function(str) {
	this._string = [str].concat(this._string);
	return this;
};

_StringBuffer.prototype.join = function(str) {
	if(str) {
		return this._string.join(str);
	} else {
		return this._string.join("");
	}
};

_StringBuffer.prototype.remove = function(str) {
	var temp = new _StringBuffer();
	str = str||'';
	for(var i in this._string) {
		if(this._string[i] != str) {
			temp.append(this._string[i]);
		}
	};
	return temp;
};

_StringBuffer.prototype.getArray = function() {
	return this._string;
}
_StringBuffer.prototype.toString = _StringBuffer.prototype.join;
//stringBuffer
utils.stringBuffer = function(str) {
	return new _StringBuffer(str);
}
/**
 * merger
 * @param  {Object} org       被合并的对象
 * @param  {Object} extend    合并对象
 * @param  {Boolean} overwrite 是否覆盖
 * @return {org}           合并后的对象
 */
utils.merger = function(org, extend, overwrite) {
	for(var i in extend) {
		if(extend.hasOwnProperty(i)) {
			if(!org[i] || overwrite) {
				org[i] = extend[i];
			}
		}
	}
	return org;
}

