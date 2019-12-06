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
        this.history=[];
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
        this.history=[];
    }

}

$(document).ready(function(){


   

    $("#Login").click(function(){
        var users = JSON.parse(localStorage.getItem("users"));
        var val=false;

        var username = $("#Username").val();
        var password = $("#Password").val();

        // console.log(username);
        // console.log(password);
        console.log(users);
        let count=0;
        $.each(users,function(index,value){
            // console.log(value.username);
            // console.log(value.password);

            

            if(username==value.username && password==value.password ){
                val =true;
                
                if(value.type=="Owner"){
                    users["current"].properties=value.properties; 
                }
                if(value.type=="Client"){
                    users["current"].favorites=value.favorites;
                    users["current"].history=value.history;
                }
                if(value.type=="Inspector"){
                    users["current"].inspect=value.inspect; 
                }
                if(value.type=="Admin"){
                    users["current"].validate=value.validate; 
                }
                

                users["current"].username=value.username;
                users["current"].password=password;
                users["current"].name=value.name;
                users["current"].email=value.email;
                users["current"].contact=value.contact;
                users["current"].imageProfile=value.imageProfile;
                users["current"].type=value.type;
                localStorage.setItem("users",JSON.stringify(users));
                window.location.assign(users["current"].type+".html");

            }
            count++;
        });
        


    })






})