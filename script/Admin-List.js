$(document).ready(function () {

    let properties = JSON.parse(localStorage.getItem("properties"));
    let activities = JSON.parse(localStorage.getItem("activities"));
    let countprop = 0;
    var coisas=[];
    $.each(properties, function (index, value) {

        if (Object.keys(properties)[countprop] != "current") {
            console.log(value.imageProfile)
            $("#ListDiv").append("<div class=\"row col-12 user my-1 py-2 mx-4\" id=\" " + value.name + "-" + value.type + "-" + value.owner + "\">" +
                "<div class=\"col-2\"><img style=\"width:60px; height:60px;\" src=\" " + value.img + " \"></div>" +
                "<div class=\"col-5 pt-3\"><a class=\"link\" href=\"HouseDetail.html\"><h5>" + value.name + "</h5></a></div>" +
                "<div class=\"col-3 pt-3\"><h5>" + value.type + "</h5></div>" +
                "<div class=\"col-2 pt-3\"><i class=\"fas fa-ban\"></i></div></div>");
            coisas.push(value);

        }
        countprop++;
    })
    let countact = 0;
    $.each(activities, function (index, value) {
        if (Object.keys(activities)[countact] != "current") {
            $("#ListDiv").append("<div class=\"row col-12 user my-1 py-2 mx-4\" id=\" " + value.name + "-" + value.type + "-" + value.owner + "\">" +
                "<div class=\"col-2 \"><img style=\"width:60px; height:60px;\" src=\" " + value.img + " \"></div>" +
                "<div class=\"col-5 pt-3\"><a class=\"link\" href=\"ActivityDetail.html\"><h5>" + value.name + "</h5></a></div>" +
                "<div class=\"col-3 pt-3\"><h5>" + value.type + "</h5></div>" +
                "<div class=\"col-2 pt-3\"><i class=\"fas fa-ban\"></i></div></div>");
            coisas.push(value);
        }
        countact++;


    })

    $("#searchButton").click(function () {

        let search = $("#searchUser").val();
        // console.log(search)
        let count = 0;
        let contador = 0;
        $("#ListDiv").empty();
        $.each(coisas, function (index, value) {

            if (value.name.toLowerCase().includes(search.toLowerCase())) {
                let type="";
                if(value.type=="Activity"){
                    type="ActivityDetail.html";
                }
                else{
                    type="HouseDetail.html";
                }
                $("#ListDiv").append("<div class=\"row col-12 user my-1 py-2 mx-4\" id=\" " + value.name + "-" + value.type + "-" + value.owner + "\">" +
                "<div class=\"col-2 \"><img style=\"width:60px; height:60px;\" src=\" " + value.img + " \"></div>" +
                "<div class=\"col-5 pt-3\"><a class=\"link\" href=\""+type+"\"><h5>" + value.name + "</h5></a></div>" +
                "<div class=\"col-3 pt-3\"><h5>" + value.type + "</h5></div>" +
                "<div class=\"col-2 pt-3\"><i class=\"fas fa-ban\"></i></div></div>");
                contador++;

            }

            count++;

        })
        if (contador == 0) {
            $("#ListDiv").append("<div style=\"background-color:white\"><h1> No Results found! </h1></div>")
        }



    })




})