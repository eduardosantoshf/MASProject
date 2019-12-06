$(document).ready(function(){

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

    class Activity{

        constructor(name,local,price,data,space,owner,capacity,validated,img,description,file,rating){
            this.name=name;
            this.local=local;
            this.price=price;
            this.data=data;
            this.img=img;
            this.description=description;
            this.type="Activity";
            this.owner=owner;
            this.space=space;
            this.capacity=capacity;
            this.validated=validated;
            this.file=file;
            this.rating=rating;
        }
    }

    var properties={
        "House" : new Property("House","Local","300","1","Owner","Empty","No","http://f.i.uol.com.br/fotografia/2013/06/06/284440-970x600-1.jpeg","Internet and much more","Testing some files here!",""),
        "Casa"  : new Property("Casa","Aveiro","200","3","Owner","Empty","Yes","https://media-cdn.tripadvisor.com/media/photo-s/02/6b/08/98/backyard.jpg","Descrição da casa","File","3"),
        "Casa da Ria": new Property("Casa da Ria","Aveiro","400","1","Owner","Empty","No","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_jbUXk0t4QPqD63APYzeT5KLRFPDrrsmwwsVNSqwXrh-TYIZ3","Casa Ideal para passar ferias","",""),
        "Casa na montanha" : new Property("Casa na montanha","Serra da Estrela","250","2","Owner","Full","Yes","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0wQQy6hzTedyT07_GPAUcgvMmbh1ccy6lwpnTLKx2iIfcDxKC","Linda casa na montanha","File","4"),
        "Casa2":new Property("Casa2","Aveiro","200","3","Owner","Empty","Yes","../Imagens/casanatureza.png","Descrição da casa","File","3"),
        "Casinha": new Property("Casinha","Avanca","100","2","Owner","Empty","No","https://www.diver.com.pt/op/image/?co=3445&h=e8d9b","Casinha pequena","",""),
        "current":new Property("","","","","","","","","","",""),

    };
    var activities={
        "Activity": new Activity("Activity","local","0","2020-05-22","20","Owner","Full","Yes","../Imagens/casanatureza.png","Fun and cool activity","",""),
        "Surf": new Activity("Surf","Barra","30","2019-07-28","30","Owner","Empty","No","https://thumbs.web.sapo.io/?epic=YzY2lZwPAxhuTa0CSksic3INlY28J6m+Ae313vraKra68+fcnbM1RySJqgZY84+ggTP3eifDX0dMp6p2GclbHl25O0zX51FkYvwzQ69k59goHGM=&W=800&H=0&delay_optim=1","Surf na praia da barra","",""),
        "Rappel": new Activity("Rappel","Serra da Estrela","40","2020-03-10","0","Owner","Full","Yes","https://mk0theadventuregfnyq.kinstacdn.com/wp-content/uploads/HowToRappel3.jpg","Rappel na serra","File","4"),
        "BTT" : new Activity("BTT","Aveiro","10","2019-07-12","4","Owner","Empty","No","https://bttlobo.com/wp-content/uploads/2017/12/The-Munga-MTB-6-1.jpg","Btt","File",""),
        "current" : new Activity("","","","","","","","","","",""),
    };

    
    if(localStorage.getItem("properties")==null){
        localStorage.setItem("properties",JSON.stringify(properties));
    }
    if(localStorage.getItem("activities")==null){
        localStorage.setItem("activities",JSON.stringify(activities));
    }
    




    var users = JSON.parse(localStorage.getItem("users"));

    if(users["Owner"].properties==""){
       $.each(properties,function(index,value){
            if(index!="current"){
                users["Owner"].properties.push(value);
            }
            

       })
       $.each(activities,function(index,value){

        if(index!="current"){
            users["Owner"].properties.push(value);
        }

   })


    }
    localStorage.setItem("users",JSON.stringify(users));
    

})