"use strict";
var Membership = {

    members: [],
    edit: null,
    
    init: function(){
		Membership.globalId = 10001;
    
        //Letar upp elementet med ID't "button".
        var button = document.getElementById("button");
        
        //Gör knappen till en funktion som returnerar funktionen.
        button.onclick = Membership.addMember;
        
        //Letar upp elementet med ID't "editButton".
        var editButton = document.getElementById("editButton");
        
        //Gör knappen till en funktion som returnerar funktionen.
        editButton.onclick = function(){
            if (Membership.edit !== null) {
                Membership.editMember(Membership.edit);
                Membership.edit = null;
            }
		};
        
        var firstName = document.getElementById("firstName");
        firstName.focus();
        
        var phoneNumber = document.getElementById("phoneNumber");
        
        //Gör textfältet till en funktion som skickar ett meddelande om användaren trycker enter.
        phoneNumber.onkeypress = function(e){
            //IE-fix.
            if (!e) {
                var e = window.event;
            }
            
            if (e.keyCode === 13) {
                Membership.addMember();
                return false;
            }
            
        };
		
        var editPhoneNumber = document.getElementById("editPhoneNumber");
        
        editPhoneNumber.onkeypress = function(e){
            //IE-fix.
            if (!e) {
                var e = window.event;
            }
            
            if (e.keyCode === 13) {
                if (Membership.edit !== null) {
                    Membership.editMember(Membership.edit);
                    Membership.edit = null;
                    return false;
                }
            }
            
        };
        
        //Letar upp p-tagen med idt counter och skriver ut antal medlemmar.
        var p_counter = document.getElementById("counter");
        p_counter.className = "counter";
        p_counter.innerHTML += "Medlemmar: " + Membership.members.length;
        
    },
    
    //Skriver ut en medlem.
    addMember: function(){
    
        var firstName = document.getElementById("firstName").value;
        var lastName = document.getElementById("lastName").value;
        var phoneNumber = document.getElementById("phoneNumber").value;
        //var Member.id = Math.floor(Math.random(1) * 9999);
		Member.id = Membership.globalId;
		Membership.globalId = Membership.globalId + 1;
        //Skapar en ny medlem.
        var newMember = new Member(firstName, lastName, phoneNumber, Member.id);
        
        
        //Lägger till det nya meddelandet sist i arrayen members.
        Membership.members.push(newMember);

		//Anropar funktionen renderMembers.
        Membership.renderMembers();
        
        
    },
    
    editMember: function(memberID){
    
        var firstName = document.getElementById("editFirstName").value;
        var lastName = document.getElementById("editLastName").value;
        var phoneNumber = document.getElementById("editPhoneNumber").value;
        
        Membership.members[memberID].setFirstName(firstName);
        Membership.members[memberID].setLastName(lastName);
        Membership.members[memberID].setPhoneNumber(phoneNumber);
        
        Membership.renderMembers();
        
    },
    
    //Skriver ut alla medlemmar.
    renderMembers: function(){
    
        //Ta bort alla medlemmar.
        document.getElementById("members").innerHTML = "";
        document.getElementById("counter").innerHTML = "";
        document.getElementById("firstName").value = "";
        document.getElementById("lastName").value = "";
        document.getElementById("phoneNumber").value = "";
        document.getElementById("editFirstName").value = "";
        document.getElementById("editLastName").value = "";
        document.getElementById("editPhoneNumber").value = "";
        document.getElementById("editH3").innerHTML = "Ändra medlem.";
        
        //Skriver ut alla medlemmar.
        for (var i = 0; i < Membership.members.length; ++i) {
            Membership.renderMember(i);
        }
        
		//Letar upp p-tagen med idt counter och skriver där ut antal medlemmar.
        var p_counter = document.getElementById("counter");
        p_counter.className = "counter";
        p_counter.innerHTML += "Medlemmar: " + Membership.members.length; 
        
    },
    
    renderMember: function(memberID){
    
        //Skapar en div-tag och p-tag där medlemmen skrivs ut.
        var header = document.createElement("div");
        header.className = "header";
        var div = document.getElementById("members");
        
        var text = document.createElement("div");
        var p1 = document.createElement("p");
        var p2 = document.createElement("p");
        var p3 = document.createElement("p");
        var p4 = document.createElement("p");
		p4.className="idHeader";
        
        text.className = "member";
        
        p1.innerHTML = "Föramn: ";
        p2.innerHTML = "Efternamn: ";
        p3.innerHTML = "Telefon: ";
        p4.innerHTML = "ID: " + Membership.members[memberID].getID();
        
        var firstName = document.createElement("span");
        firstName.className = "space";
        var lastName = document.createElement("span");
        lastName.className = "space2";
        var phoneNumber = document.createElement("span");
        phoneNumber.className = "space3";
        
        firstName.innerHTML = Membership.members[memberID].getFirstName();
        lastName.innerHTML = Membership.members[memberID].getLastName();
        phoneNumber.innerHTML = Membership.members[memberID].getPhoneNumber();
        
        div.appendChild(header);
        div.appendChild(text);
        text.appendChild(p1);
        text.appendChild(p2);
        text.appendChild(p3);
        header.appendChild(p4);
        p1.appendChild(firstName);
        p2.appendChild(lastName);
        p3.appendChild(phoneNumber);
        
        
        //Skapar element och funktioner för bilden där man tar bort medlemmar.
        var p_icon = document.createElement("p");
        var a = document.createElement("a");
        var img = document.createElement("img");
        
        a.setAttribute("href", "#");
        img.setAttribute("src", "pics/delete-icon.png");
        img.setAttribute("height", "16");
        img.setAttribute("width", "16");
        img.setAttribute("alt", "Ta bort medlem.");
        
        header.appendChild(p_icon);
        p_icon.appendChild(a);
        a.className = "icons";
        a.appendChild(img);
        
        //Funktion som tar bort en medlem i arrayen med hjälp av splice.
        a.onclick = function(){
            var remove = window.confirm("Vill du verkligen radera " + Membership.members[memberID].getFirstName() + " " + Membership.members[memberID].getLastName() + " (ID: " + Membership.members[memberID].getID() + ")?");
            if (remove === true) {
                Membership.members.splice(memberID, 1);
                Membership.renderMembers();
            }
            
        };
        
        //Skapar element och funktioner för bilden som man ändrar en medlem med.
        var p_icon = document.createElement("p");
        var a = document.createElement("a");
        var img = document.createElement("img");
        
        a.setAttribute("href", "#edit");
        img.setAttribute("src", "pics/edit-icon.png");
        img.setAttribute("height", "16");
        img.setAttribute("width", "16");
        img.setAttribute("alt", "Ändra en medlem.");
        
        header.appendChild(p_icon);
        p_icon.appendChild(a);
        a.className = "icons";
        a.appendChild(img);
        
        //Funktion som låter användaren ändra en medlem.
        a.onclick = function(){
        
            var firstName = document.getElementById("editFirstName");
			firstName.focus();
            firstName.value = Membership.members[memberID].getFirstName();
            var lastName = document.getElementById("editLastName");
            lastName.value = Membership.members[memberID].getLastName();
            var phoneNumber = document.getElementById("editPhoneNumber");
            phoneNumber.value = Membership.members[memberID].getPhoneNumber();
            
            var editHead = document.getElementById("editH3");
            
            editHead.innerHTML = "Ändra medlem. (ID:" + Membership.members[memberID].getID() + ")";
            
            Membership.edit = memberID;
            
        };
        
        //Skapar element och funktioner för information om medlemmen.
        var a = document.createElement("a");
        var img = document.createElement("img");
        
        a.setAttribute("href", "#");
        img.setAttribute("src", "pics/about.png");
        img.setAttribute("height", "16");
        img.setAttribute("width", "16");
        img.setAttribute("alt", "Info om medlemmen.");
        
        header.appendChild(p_icon);
        p_icon.appendChild(a);
        a.className = "icons";
        a.appendChild(img);
        
        a.onclick = function(){
            alert(Membership.members[memberID].getFirstName() + " " + Membership.members[memberID].getLastName() + " (ID: " + Membership.members[memberID].getID() + ") registrerades: " + Membership.members[memberID].getDateText());
        };
        
        
    }
    
    
};

window.onload = Membership.init;