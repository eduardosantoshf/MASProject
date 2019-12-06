$(document).ready(function(){


    $("#Main").click(function(){

        var users = JSON.parse(localStorage.getItem("users"));
        
        let type=users["current"].type;
        if(type==""){
            window.location.assign("../index.html");
        }
        if(type=="Client"){
            window.location.assign("Client.html");
        }
        if(type=="Owner"){
            window.location.assign("Owner.html");
        }
        if(type=="Inspector"){
            window.location.assign("Inspector.html");
        }
        if(type=="Admin"){
            window.location.assign("Admin.html");
        }


    })



})