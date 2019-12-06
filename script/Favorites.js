$(document).ready(function () {



    load()

    $(".fa-trash").click(function(){
        console.log("ola")
        let users = JSON.parse(localStorage.getItem("users"));
        let current = users["current"].favorites;

        let info = $(this).parent().parent().attr("id");
        info=info.split("-");

        for(let i=0;i<current.length;i++){
            let fav= current[i];
            if(fav.name==info[0] && fav.owner==info[2]){
                current.splice(i,1);
                // console.log("Ola")
                break;
            }

        }


        localStorage.setItem("users",JSON.stringify(users));
        window.location.assign("Client-Favorites.html")
    })


})



function load() {

    let users = JSON.parse(localStorage.getItem("users"));
    let current = users["current"].favorites;
    

    for (let i = 0; i < current.length; i++) {

        $("#ListDiv").append("<div class=\"row col-12 user my-1 py-2 mx-4\" id=\"" + current[i].name + "-" + current[i].type + "-" + current[i].owner + "\">" +
            "<div class=\"col-3\"><img style=\"width:60px; height:60px;\" src=\" " + current[i].img + " \"></div>" +
            "<div class=\"col-3 pt-3\"><a class=\"link\" href=\"HouseDetail.html\"><h5>" + current[i].name + "</h5></a></div>" +
            "<div class=\"col-3 pt-3\"><i class=\"fas fa-trash\"></i></div>" +
            "<div class=\"col-3 pt-3\">"+rating(current[i].rating)+"</i></div></div>");
    }

}

function rating(num){

    let stars = "";

    for(let i=0; i<num ; i++){
        stars+="<i class=\"fas fa-star\"></i>"
    }
    return stars


}
