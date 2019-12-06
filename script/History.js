$(document).ready(function(){

    var users= JSON.parse(localStorage.getItem("users"));
    var history = users["current"].history;
    var properties=JSON.parse(localStorage.getItem("properties"));
    var activities = JSON.parse(localStorage.getItem("activities"));

    for(let i = 0;i<history.length;i++){

        let value = history[i];
        let type;
        let favorites = users["current"].favorites;
        let heart="<i style=\"font-size:20px;\" class=\"far fa-heart\"></i>";
        for(let j =0;j<favorites.length;j++){
            if(favorites[j].name==value.name && favorites[j].owner==value.owner){
                heart="<i style=\"font-size:20px;\" class\"fas fa-heart\" ><\i>"
            }
        }
        let rating;
        $.each(properties,function(index,val){
            if(val.name==value.name && val.owner==value.owner && index!="current" && val.type==value.type){
                rating = val.rating;
            }
        })
        $.each(activities,function(index,val){
            if(val.name==value.name && val.owner==value.owner && index!="current" && val.type==value.type){
                rating = val.rating;
            }
        })

        let rate="";
        for(let k=0;k<parseInt(rating);k++){
            rate+="<i class=\"fas fa-star\"></i>";
        }
        console.log(rate)

        if(value.type=="Activity"){
            type="Activity.html"
        }
        else{
            type="HouseDetail.html"
        }
        $("#ListDiv").append("<div class=\"row col-12 user my-1 py-2 mx-4\" id=\" " + value.name + "-" + value.type + "-" + value.owner + "\">" +
                "<div class=\"col-2 \"><img style=\"width:60px; height:60px;\" src=\" " + value.img + " \"></div>" +
                "<div class=\"col-5 pt-3\"><a  class=\"Detail\" href=\""+type+"\"><h5>" + value.name + "</h5></a></div>" +
                "<div class=\"col-3 pt-3\">"+heart+"</div>" +
                "<div class=\"col-2 pt-3\">"+rate+"</div></div>");
    }

    $(".Detail").click(function () {

        
        let x = $(this).parent().attr("id");
        let n = x.split("-");
        let name = n[0];
        let owner =n[2];
        let type = n[1].trim();
    
        if (type=="Activity") {
            let act = JSON.parse(localStorage.getItem("activities"));
            let current = act["current"];
            $.each(act, function (index, value) {
                if(value.name==name && value.owner==owner){
    
                    current.name=name;
                    current.local =value.local;
                    current.owner=owner;
                    current.price=value.price;
                    current.data = value.data;
                    current.space = value.space;
                    current.img= value.img;
                    current.capacity=value.capacity;
                    current.validated=value.validated;
                    current.file=value.file;
                    current.description=value.description;
    
                    localStorage.setItem("activities", JSON.stringify(act));
    
    
                }
    
            }
    
            )}
        else{
            let prop =JSON.parse(localStorage.getItem("properties"));
            let current = prop["current"];
            $.each(prop,function(index,value){
    
                if(value.name==name && value.owner==owner){
    
                    current.name=name;
                    current.local=value.local;
                    current.owner=owner;
                    current.price=value.price;
                    current.rooms=value.rooms;
                    current.img=value.img;
                    current.capacity=value.capacity;
                    current.validated=value.validated;
                    current.file=value.file;
                    current.description=value.description;
    
                    localStorage.setItem("properties", JSON.stringify(prop));
    
                }
    
    
    
            })
    
    
    
        }
    
    })

    


})




