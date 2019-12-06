$(document).ready(function(){

    $("#ProfileButton").click(function(){
        let users = JSON.parse(localStorage.getItem("users"));
        let currentUser = users["current"];
        let currentProfile = users["currentProfile"];
        currentProfile.username=currentUser.username;
        currentProfile.name = currentUser.name;
        currentProfile.email= currentUser.email;
        currentProfile.birth= currentUser.birth;
        currentProfile.contact = currentUser.contact;
        currentProfile.password = currentUser.password;
        currentProfile.imageProfile = currentUser.imageProfile;

        localStorage.setItem("users",JSON.stringify(users));
    })

})