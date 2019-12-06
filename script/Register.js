var users;

$(document).ready(function () {
    users = JSON.parse(localStorage.getItem("users"));

    class User {
        constructor(username, password, name, email, contact, imageProfile, type) {
            this.username = username;
            this.password = password;
            this.name = name;
            this.email = email;
            this.contact = contact;
            this.imageProfile = imageProfile;
            this.type = type;

        }
    }

    class Owner extends User {
        constructor(username, password, name, email, contact, imageProfile, properties, type) {
            super(username, password, name, email, contact, imageProfile, type);
            this.properties = properties;
        }
    }

    class Client extends User {
        constructor(username, password, name, email, contact, imageProfile, favorites, type) {
            super(username, password, name, email, contact, imageProfile, type);
            this.favorites = favorites;
        }
    }

    class Admin extends User {
        constructor(username, password, name, email, contact, imageProfile, validate, type) {
            super(username, password, name, email, contact, imageProfile, type);
            this.validate = validate;
        }
    }

    class Inspector extends User {
        constructor(username, password, name, email, contact, imageProfile, inspect, type) {
            super(username, password, name, email, contact, imageProfile, type);
            this.inspect = inspect;
        }
    }

    class Current extends User {
        constructor(username, password, name, email, contact, imageProfile, inspect, validate, favorites, properties, type) {
            super(username, password, name, email, contact, imageProfile, type);
            this.inspect = inspect;
            this.validate = validate;
            this.favorites = favorites;
            this.properties = properties;
        }

    }

    $("#Register").click(function () {

        if (Validation()) {

            var username = $("#Username").val();
            var name = $("#FullName").val();
            var email = $("#Email").val();
            var password = $("#Password").val();
            var type = $("input[name='AccountType']:checked").val();
            var user;
            if (type == "Owner") {
                user = new Owner(username, password, name, email, "", "", "", "Owner");

            }
            else if (type == "Client") {
                user = new Client(username, password, name, email, "", "", "", "Client");
            
            }
            users[username] = user;
            users["current"].username = username;
            users["current"].password = password;
            users["current"].name = name;
            users["current"].email = email;
            users["current"].type = type;
            localStorage.setItem("users", JSON.stringify(users));
            window.location.assign(type + ".html");
        }
        else {
            // console.log($("input[name='AccountType']:checked").val())
            return false
        };


    })



})




function Validation() {
    console.log(users)
    var valido = true;

    var input1 = $("#Username").val();

    if (!(input1.trim().length > 3 && input1.trim().length < 20)) {
        valido = false;

    }

    var input2 = $("#FullName").val();

    if (input2 == null || (input2.trim().length < 3 || input2.trim().length > 50)) {
        valido = false;


    }

    var input3 = $("#Email").val();
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!(re.test(input3))) {

        valido = false;
    }

    var input4 = $("#Password").val();
    var input5 = $("#Confirm").val();

    if (!(input4 == input5)) {
        valido = false;
    }
    else {
        if (input4.length < 3 || input4.length > 30) {
            valido = false;
        }
    }

    if (!$("input[name='AccountType']:checked").val()) {
        valido = false;
    }

    if (valido) {
        $.each(users, function (index, value) {

            if (value.username == input1 || input3 == value.email) {
                valido = false;
            }
        })
    }

    return valido;



}
