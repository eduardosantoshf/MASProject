$(document).ready(function(){

    let users = JSON.parse(localStorage.getItem("users"));

    // console.log("dentro")
    let count = 0;
    $.each(users,function(index,value){

        console.log(value.username);

        if(value != users["current"] && Object.keys(users)[count]!="currentProfile" && (value.type=="Owner" || value.type=="Client") ){
            console.log(value.imageProfile)
            if(value.imageProfile==""){
                value.imageProfile="../Imagens/ProfileDefault.png";
            }
            $("#ListDiv").append("<div class=\"row col-12 user my-1 py-2 mx-4\" id=\" "+value.username+"\">" + 
            "<div class=\"col-2\"><img style=\"width:60px;width:60px;\" src=\" "+value.imageProfile +" \"></div>" +
            "<div class=\"col-5 pt-3\"><a class=\"link\" href=\"Profile.html\"><h6>" + value.username + "</h6></a></div>" +
            "<div class=\"col-3 pt-3\"><h6>" + value.type + "</h6></div>" +
            "<div class=\"col-2 pt-3\"><i class=\"fas fa-ban\"></i></div></div>");

        }
        count++;
    })


    $(".link").click(function(){
        let id = $(this).parent().parent().attr("id");
        $.each(users,function(index,value){

            if(value.username==id.trim()){
                users["currentProfile"]=value;
            }


        })


    })

    $("#searchButton").click(function(){

        let search = $("#searchUser").val();
        console.log(search)
        let count = 0;
        let contador = 0;
        $("#ListDiv").empty();
        $.each(users,function(index,value){
            if(value.imageProfile==""){
                value.imageProfile="../Imagens/ProfileDefault.png";
            }
            
            if(value.username.toLowerCase().includes(search.toLowerCase()) && value!=users["current"] && Object.keys(users)[count]!="currentProfile" &&(value.type=="Owner" || value.type=="Client")){
                $("#ListDiv").append("<div class=\"row col-12 user my-1 py-2 mx-4\" id=\" "+value.username+"\">" + 
            "<div class=\"col-2\"><img style=\"width:60px;width:60px;\" src=\" "+value.imageProfile +" \"></div>" +
            "<div class=\"col-5 pt-3\"><a class=\"link\" href=\"Profile.html\"><h6>" + value.username + "</h6></a></div>" +
            "<div class=\"col-3 pt-3\"><h6>" + value.type + "</h6></div>" +
            "<div class=\"col-2 pt-3\"><i class=\"fas fa-ban\"></i></div></div>");
            contador++;

            }

            count++;

        })
        if(contador==0){
            $("#ListDiv").append("<div style=\"background-color:white\"><h1> No Results found! </h1></div>")
        }



    })





})