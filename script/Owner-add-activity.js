class Activity{

    constructor(name,local,price,data,space,owner,capacity,validated,img,description,file,rating){
        this.name=name;
        this.local=local;
        this.price=price;
        this.data=data;
        this.space=space;
        this.img=img;
        this.description=description;
        this.type="Activity";
        this.owner=owner;
        this.capacity=capacity;
        this.validated=validated;
        this.file=file;
        this.rating=rating;
    }
}



$(document).ready(function(){

    var users = JSON.parse(localStorage.getItem("users"));
    var properties = users["current"].properties;

    $("#add").click(function(){
        var name = $("#Title").val();
        var local = $("#Local").val();
        var space = $("#Space").val();
        var price = $("#Price").val();
        var date = $("#date").val();
        var description = $("#Description").val();
        var image = $("#imageUrl").val();

        var valid = true;
        if(image==""){
            image="http://www.emaar.in/app/webroot/img/products/album-default.png";
        }
        // console.log(date);  
        var hoje = new Date();
        // console.log(hoje);
        var year = hoje.getFullYear();
        // console.log(year);
        var month = hoje.getMonth()+1;
        // console.log(month);
        var day = hoje.getDate();
        // console.log(day);
        var today = ""+year+"-"+month+"-"+day;
        // console.log(today);

        if(name.length<4 || name.length>30){
            valid=false;
            console.log("1")
        }
        if(local.length<3 || local.length>40){
            valid=false;
            console.log("2")
        }
        if(space.length==0 || space.length>20){
            valid=false;
            console.log("3")
        }
        // console.log(compareDates(date,today));
        if(date==null || compareDates(date,today)==false){
            valid=false;        
            console.log("leandro burro");
        }
        if(isNaN(price) || price.length>6 || price.length==0){
            valid=false;
            console.log("4")
        }
        if(description.length<10 || description.length>200){
            valid = false;
            console.log("5")
        }

        var act = JSON.parse(localStorage.getItem("activities"));

        $.each(act,function(index,value){
            // console.log(name+users["current"].username);
            // console.log("//////////////////")
            // console.log(value.name+value.owner);
            //posso escolher nomes iguais para atividades mas nao podem ser ambas do mesmo dono;
            if(name+users["current"].username==value.name+value.owner){
                valid=false;
                console.log("nome ja escolhido");
            }

        })


        if(valid){

            var novo = new Activity(name.trim(),local.trim(),price,date,space,users["current"].username,"Empty","No",image,description,"","");
            properties.push(novo);
            // console.log(properties);
            localStorage.setItem("users",JSON.stringify(users));
            // var act = JSON.parse(localStorage.getItem("activities"));
            act[name+users["current"].username]=novo;
            console.log(act);
            localStorage.setItem("activities",JSON.stringify(act));
            window.location.assign("Owner.html");
        }

    })

});


function compareDates(date , now){

    var dyear = date.split("-")[0];
    var dmonth = date.split("-")[1];
    var dday = date.split("-")[2];
    // console.log(dyear)
    // console.log(dmonth)
    // console.log(dday)
    
    var nyear = now.split("-")[0];
    var nmonth = parseInt(now.split("-")[1]);
    var nday = now.split("-")[2];
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
