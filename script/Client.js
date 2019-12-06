$(document).ready(function () {

    let properties = JSON.parse(localStorage.getItem("properties"));
    let activities = JSON.parse(localStorage.getItem("activities"));
    let users= JSON.parse(localStorage.getItem("users"));
    let current = users["current"];
    let coisas = [];

    $.each(properties, function (index, value) {
        if (index != "current" && value.validated!="No" && value.capacity!="Full") {
            coisas.push(value);
        }

    });
    $.each(activities, function (index, value) {
        if (index != "current" && value.validated!="No" && value.capacity!="Full") {
            coisas.push(value);
        }
    });


    shuffle(coisas);
    load(coisas);




    $(".fa-heart").click(function(){
        if ($(this).attr("class") == "far fa-heart") {
            $(this).attr("class","fas fa-heart");
            let info=$(this).parent().attr("id");
            // console.log(info)
            info=info.split("-");
            $.each(coisas,function(index,value){
                console.log(info);
                if(value.name==info[0].trim() && value.type==info[1].trim() && value.owner==info[2].trim()){
                    current.favorites.push(value);
                }

            })

            localStorage.setItem("users",JSON.stringify(users));
            // console.log(current.favorites);

        }
        else{
            $(this).attr("class","far fa-heart");
            let favor = current.favorites;
            let info=$(this).parent().attr("id");
            console.log(info)
            info=info.split("-");
            for(let i = 0; i<favor.length;i++){

                if(favor[i].name==info[0] && favor[i].owner==info[2]){
                    favor.splice(i,1);
                    break;
                }

            }
            localStorage.setItem("users",JSON.stringify(users));


        }



    })

    $("#search-button").click(function(){

        let local = $("#local").val();
        let people = $("#people").val();
        let search = $("#search").val();
        let date  = $("#date").val();
        let price =$("#price").val();
        let type =$("#type").val();

        let cenas = [];

        $.each(coisas,function(index,value){
            let valid = true;
            if(parseInt(value.price)>price){
                valid=false;
            }
            if(price==0){
                valid = true;
            }
            if(!value.name.toLowerCase().includes(search.toLowerCase())){
                valid=false;
            }
            
            if(!value.local.toLowerCase().includes(local.toLowerCase())){
                valid =false;
            }
            if(date!=""){
                type="Activity";
            }
            if(value.type=="Activity"){
                if(parseInt(value.space)<parseInt(people)){
                    valid = false;
                    // console.log("nao tem espaço suficiente activity");
                }
                
                if(compareDates(date,value.data)){
                    valid=false;
                }
                
            }
            else{
                if(parseInt(value.rooms)<parseInt(people)){
                    valid=false;
                    // console.log("naon tem espaço suficiente property");
                }
            }
            

            if(valid){
                if(type!="All"){
                    if(type==value.type){
                        cenas.push(value);
                    }
                }
                else{
                    cenas.push(value);
                }
                
            }



        })
        console.log(cenas)
        $("#addCoisas").empty()
        load(cenas);

    })


})


function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
    console.log(array);
}

function load(array) {
    let users= JSON.parse(localStorage.getItem("users"));
    let current = users["current"].favorites;
    $.each(array, function (index, value) {
        let ref;
        let space;
        
        let classe= "far fa-heart";

        for(let i = 0; i<current.length;i++){
            if(current[i].name==value.name && current[i].owner==value.owner && index!="current"){
                classe="fas fa-heart"
            }
        }

        if (value.type == "Activity") {
            ref = "ActivityDetail.html";
            space = value.space + " available";
        }
        else {
            ref = "HouseDetail.html";
            space = value.rooms+ " rooms";
        }

        



        $("#addCoisas").append("<div id=\""+value.name+"-"+value.type+"-"+value.owner+"\" class=\"col-md-6 col-lg-4 mb-4\">" +
            "<i style=\"position:absolute;z-index:1;margin-top:0;margin-left:0;color:rgb(0,0,0);font-size:40px;>\" class=\""+classe+"\"></i>"+
            "<a href=\"" + ref + "\" class=\"prop-entry d-block weird Detail\">" +
            "<figure>" +
            " <img style=\"width:100%;height:100%\" src=\"" + value.img + "\"  class=\"img-cropped\">" +
            "</figure>" +
            "<div class=\"prop-text\">" +
            "<div class=\"inner\">" +
            "<span class=\"price rounded\">" + value.price + " €</span>" +
            "<h3 class=\"title text-shadow\">" + value.name + "</h3 >" +
            "<p class=\"location text-shadow\">" + value.local + "</p>" +
            "</div>" +
            "<div class=\"prop-more-info\">" +
            "<div class=\"inner d-flex\" style=\"text-align:left\">" +
            "<div class=\"col\">" +
            "<strong>" + rating(value.rating) + "</strong>" +
            "</div>"+
            "<div class=\"col\">" +
            "<strong>" + space + "</strong>" +
            
            "</div>" +
            "</div >"+
            "</div >"+
            "</div >"+
         "</a >"+
       "</div >");
    })

}

function compareDates(date , now){

    var dyear = parseInt(date.split("-")[0]);
    var dmonth = parseInt(date.split("-")[1]);
    var dday = parseInt(date.split("-")[2]);
    // console.log(dyear)
    // console.log(dmonth)
    // console.log(dday)
    
    var nyear = parseInt(now.split("-")[0]);
    var nmonth = parseInt(now.split("-")[1]);
    var nday = parseInt(now.split("-")[2]);
    // console.log(nyear)
    // console.log(nmonth)
    // console.log(nday)

    if(dyear<nyear){
        return false;
    }
    else if(dyear>nyear){
        return true;
    }
    else{
        if(dmonth>nmonth){
            return true;
        }
        else if(dmonth<nmonth){
            return false;
        }
        else{
            if(dday>nday){
                return true;
            }
            else{
                return false;
            }
        }
    }
}

function rating(num){

    let stars = "";

    for(let i=0; i<num ; i++){
        stars+="<i class=\"fas fa-star\"></i>"
    }
    return stars


}
