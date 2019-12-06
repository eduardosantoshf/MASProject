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
class Current extends User{
    constructor(username,password,name,email,contact,imageProfile,inspect,validate,favorites,properties,type){
        super(username,password,name,email,contact,imageProfile,type);
        this.inspect=inspect;
        this.validate=validate;
        this.favorites=favorites;
        this.properties=properties;
    }

}
$("#LogOut").click(function(){

    let users = JSON.parse(localStorage.getItem("users"));

    let current = users["current"];

    users[current.username].name = current.name;
    users[current.username].birth = current.birth;
    users[current.username].imageProfile = current.imageProfile;
    users[current.username].email = current.email;
    users[current.username].contact = current.contact;
    users[current.username].password = current.password;
    

    if(current.type=="Owner"){
        users[current.username].properties = current.properties;
    
    }
    if(current.type=="Client"){
        users[current.username].favorites = current.favorites;
        users[current.username].history = current.history;
    }

    users["current"] = new Current("","","","","","","","","","","")
    users["current"].properties=[];

    localStorage.setItem("users",JSON.stringify(users));



})