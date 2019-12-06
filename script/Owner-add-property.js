class Property{

    constructor(name,local,price,rooms,owner,capacity,validated,img,description,file,rating){
    this.name=name;
    this.local=local;
    this.price=price;
    this.rooms=rooms;
    this.owner=owner;
    this.img=img;
    this.description=description;
    this.type="Property";
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
        var name = $("#Name").val();
        var local = $("#Local").val();
        var rooms = $("#Rooms").val();
        var price = $("#Price").val();
        var description = $("#Description").val();
        var image = $("#imageUrl").val();

        var valid = true;
        if(image==""){
            image="http://www.emaar.in/app/webroot/img/products/album-default.png";
        }

        if(name.length<4 || name.length>30){
            valid=false;
        }
        if(local.length<5 || local.length>40){
            valid=false;
        }   
        if(rooms.length==0 || rooms.length>20){
            valid=false;
        }
        if(isNaN(price) || price.length>6 || price.length==0){
            valid=false;
        }
        if(description.length<10 || description.length>200){
            valid = false;
            
        }
        var houses = JSON.parse(localStorage.getItem("properties"));

        $.each(houses,function(index,value){
            // console.log(name+users["current"].username);
            // console.log("//////////////////")
            // console.log(value.name+value.owner);
            //posso escolher nomes iguais para propriedades mas nao podem ser ambas do mesmo dono;
            if(name+users["current"].username==value.name+value.owner){
                valid=false;
                console.log("nome ja escolhido");
            }

        })

        if(valid){

            var novo = new Property(name.trim(),local.trim(),price,rooms,users["current"].username,"Empty","No",image,description,"","");
            properties.push(novo);
            console.log(properties);
            localStorage.setItem("users",JSON.stringify(users));
            // var houses = JSON.parse(localStorage.getItem("properties"));
            houses[name+users["current"].username]=novo;
            localStorage.setItem("properties",JSON.stringify(houses));
            window.location.assign("Owner.html");
        }

    })

});

