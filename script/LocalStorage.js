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
    class User{
        constructor(username,password,name,email,contact,imageProfile,type){
            this.username=username;
            this.password=password;
            this.name=name;
            this.email=email;
            this.contact=contact;
            this.imageProfile=imageProfile;
            this.type=type;
            
        }
    }
    
    class Owner extends User{
        constructor(username,password,name,email,contact,imageProfile,properties,type){
            super(username,password,name,email,contact,imageProfile,type);
            this.properties=properties;
            
        }
    }
    
    class Client extends User{
        constructor(username,password,name,email,contact,imageProfile,favorites,type){
            super(username,password,name,email,contact,imageProfile,type);
            this.favorites=favorites;
            this.history=[]
        }
    }
    
    class Admin extends User{
        constructor(username,password,name,email,contact,imageProfile,validate,type){
            super(username,password,name,email,contact,imageProfile,type);
            this.validate=validate;
        }
    }
    
    class Inspector extends User{
        constructor(username,password,name,email,contact,imageProfile,inspect,type){
            super(username,password,name,email,contact,imageProfile,type);
            this.inspect=inspect;
        }
    }
    
    class Current extends User{
        constructor(username,password,name,email,contact,imageProfile,inspect,validate,favorites,properties,type){
            super(username,password,name,email,contact,imageProfile,type);
            this.inspect=inspect;
            this.validate=validate;
            this.favorites=favorites;
            this.properties=properties;
        }
    
    }

    var users={
        "Owner":new Owner("Owner","Owner","Eduardo Santos","qualquercoisa@ua.pt","919191919","../Imagens/ProfileDefault.png",[],"Owner"),
        "Client": new Client("Client","Client","Gonçalo Pereira", "naosei@ua.pt","","../Imagens/ProfileDefault.png",[],"Client"),
        "Admin": new Admin("Admin", "Admin", "admin@admin.pt","","","","","Admin"),
        "Inspector": new Inspector("Inspector","Inspector","abc@ua.pt","","","","","Inspector"),
        "current":new Current("","","","","","","","","","",""),
        "currentProfile": new Current("","","","","","","","","","",""),

    };

    
    if(localStorage.getItem("users")==null){
        users["Client"].favorites.push(new Property("Casa","Aveiro","200","3","Owner","Empty","Yes","https://media-cdn.tripadvisor.com/media/photo-s/02/6b/08/98/backyard.jpg","Descrição da casa","File","3"))
        users["Client"].history.push(new Property("Casa","Aveiro","200","3","Owner","Empty","Yes","https://media-cdn.tripadvisor.com/media/photo-s/02/6b/08/98/backyard.jpg","Descrição da casa","File","3"))
        localStorage.setItem("users",JSON.stringify(users));

    }

})