$(document).ready(function () {


    

    var users = JSON.parse(localStorage.getItem("users"));

    if(users["current"].username!=users["currentProfile"].username){

        $("#edit").addClass("d-none");

    }

    var name = users["currentProfile"].name;
    var birth = users["currentProfile"].birth;
    var email = users["currentProfile"].email;
    var contact = users["currentProfile"].contact;
    var password = users["currentProfile"].password;

    $("#Name").val(name);
    if (birth == "") {
        $("#Birth").val("");
    }
    else {
        $("#Birth").val(birth);
    }
    if (contact == null) {
        $("#Contact").val("");
    }
    else {
        $("#Contact").val(contact);
    }

    $("#Email").val(email);

    $("#Password").val(password);


    $("#ConfirmButton").click(function () {
        if (password == $("#ConfirmPassword").val()) {
            $("#Name").attr("readonly", false);
            $("#Birth").attr("readonly", false);
            $("#Email").attr("readonly", false);
            $("#Contact").attr("readonly", false);
            $("#Password").attr("readonly", false);
            $("#ConfirmModal").modal("hide");
            $("#edit").addClass("d-none");
            $("#save").removeClass("d-none");
            $("#ErrorPassword").addClass("d-none");

        }
        else {
            $("#ErrorPassword").removeClass("d-none");

        }

    $("#perfil").click(function(){

        let current = users["current"];
        let profile = users["currentProfile"];

        profile.name = current.name;
        if(current.birth==null){
            profile.birth="";
        }else{
            profile.birth = current.birth;
        }

        profile.email = current.birth;
        profile.imageProfile=current.imageProfile;
        profile.contact= current.contact;
        profile.password=current.password;

    })



    })
    $("#save").click(function () {


        let name = $("#Name").val();
        let birth = $("#Birth").val();
        let email = $("#Email").val();
        let contact = $("#Contact").val();
        let password = $("#Password").val();
        let imagesrc = $("#imagemInput").val();
        let user = users["currentProfile"];

        

        

        user.name = name;
        user.birth = birth;
        user.email = email;
        user.contact = contact;
        user.password = password;
        user.imageProfile = image;
        let valid = true;

        if(user.username==users["current"].username){
            let current = users["current"];
            current.name = user.name;
            current.birth= user.birth;
            current.email=user.email;
            current.contact=user.contact;
            current.password=user.password;
            current.imageProfile=user.imageProfile;
        }
        
        
        if (!(name.trim().length > 3 && name.trim().length < 20)) {
            valid = false;
        }
        let re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!(re.test(email))) {
            valid = false;
        }
        if (contact.length > 15 || contact.length < 5) {
            valid = false;
        }
        $.each(users, function (index, value) {
            if (email == value.email && value.username!=users["current"].username && value.username!=users["currentProfile"]) {
                valid = false;
            }
        })

        if (valid) {
            $("#save").addClass("d-none");
            $("#edit").removeClass("d-none");
            localStorage.setItem("users", JSON.stringify(users));
            $("#Name").attr("readonly", true);
            $("#Birth").attr("readonly", true);
            $("#Email").attr("readonly", true);
            $("#Contact").attr("readonly", true);
            $("#Password").attr("readonly", true);
            $("#Imagem").attr("src",user.imageProfile);
        }

    })


    $("#Previous").click(function(){
        history.back();
    })








})