"use strict";
function Member(firstName, lastName, phoneNumber, id, date){

	this.getFirstName = function(){
		return firstName;
	};
	
	this.setFirstName = function(_firstName){
		firstName = _firstName;
	};
	
	this.getLastName = function(){
		return lastName;
	};
	
	this.setLastName = function(_lastName){
		lastName = _lastName;
	};
	
	this.getPhoneNumber = function(){
		return phoneNumber;
	};
	
	this.setPhoneNumber = function(_phoneNumber){
		phoneNumber = _phoneNumber;
	};
	
	this.getID = function(){
		return id;
	};
	
	this.setID = function(_id){
		id = _id;
	};
	
	this.getDate = function(){
		return date;
	};
	
	this.setDate = function(_date){
		date = _date;
	};
	
	this.getTime = function(){
		return time;
	};
	
	this.setTime = function(_time){
		time = _time;
	};
	
	Member.prototype.toString = function(){
		return this.getText() + "(" + this.getDate() + ")";
	};
	
	Member.prototype.getHTMLText = function(){
		return this.getText().replace(/[\n]/g, "<br />");
	};
	
	Member.prototype.getDateText = function(){
		var today = new Date();
		var dd = today.getDate();
		var month = new Array(12);
		month[0] = "01";
		month[1] = "02";
		month[2] = "03";
		month[3] = "04";
		month[4] = "05";
		month[5] = "06";
		month[6] = "07";
		month[7] = "08";
		month[8] = "09";
		month[9] = "10";
		month[10] = "11";
		month[11] = "12";
		var yyyy = today.getFullYear();
		
		return ""+yyyy+"-"+month[today.getMonth()]+"-"+dd+".";
	};
	
}