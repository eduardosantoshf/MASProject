$(document).ready(function () {
    var users = JSON.parse(localStorage.getItem("users"));
    var activities = JSON.parse(localStorage.getItem("activities"));
    let type = users["current"].type;


    if (type == "Owner") {
        $("#Edit").removeClass("d-none");
    }
    else if (type == "Client") {

        $("#Buy").removeClass("d-none");
        $("#RateDiv").removeClass("d-none");
    }
    else if (type == "Admin") {
        $("#Admin").removeClass("d-none");
    }
    else if (type == "Inspector") {
        $("#File").removeClass("d-none");
    }
    let current = activities["current"];
    let name = current.name;
    let img = current.img;
    let price = current.price;
    let data = current.data;
    let space = current.space;
    let local = current.local;
    let description = current.description;
    let rating = current.rating;
    let rate = "";
    for (let i = 0; i < parseInt(rating); i++) {
        rate += "<i class=\"fas fa-star\"></i>"
    }
    $("myFrame").attr("src","https://www.google.com/maps/embed/v1/place?key=AIzaSyBh6_jNlm-6VBToliRwBpUstAO24tVYL9Y&q"+local);
    $("#Name").html(name);
    $("#Image").attr("src", img);
    $("#Price").html(price + "€");
    $("#Space").html(space);
    $("#Local").val(local);
    $("#Description").html(description);
    $("#Date").html(data)
    $("#Rating").html(rate);

    $.each(users, function (index, value) {
        if (current.owner == value.username && index != "current") {
            $("#ownername").html(value.name);
            $("#ownercontact").html(value.contact);
            $("#owneremail").html(value.email);
        }
    })


    $("#RateButton").click(function () {


        $.each(activities, function (index, value) {
            if (value.name == current.name && value.owner == value.owner) {
                value.rating = $("input[name='rate']:checked").val();

            }
        })
        localStorage.setItem("activities", JSON.stringify(activities))
        window.location.assign("ActivityDetail.html");

    })

    $("#BuyButton").click(function () {
        $(".modal").modal("show");
    })

    $("#Buy").click(function () {

        let current = users["current"];
        let history = current.history;
        let act = activities["current"];
        let people = $("#People").val();
        if(people>parseInt(act.space)){
            $("#People").html("There is no space");
            return false;
        }
        history.push(act);
        console.log(history);
        $.each(activities,function(index,value){

            if(act.name==value.name && act.owner==value.owner){
                parseInt(value.space)-=people;
                if(value.space==0){
                    value.capacity="Full";
                }
            }
            
        })

        $(".modal").modal("hide");

        localStorage.setItem("activities",JSON.stringify(activities));
        localStorage.setItem("users", JSON.stringify(users));



    })

    $("#File").click(function () {
        $("#Inspector").modal("show");
    })

    $("#FileChanges").click(function () {
        let current = activities["current"]
        $.each(activities, function (index, value) {
            if (index != "current" && value.name == current.name && value.owner == current.owner) {
                value.file = $("#WriteFile").val();
            }
        })
        $("#Inspector").modal("hide");
        localStorage.setItem("activities", JSON.stringify(activities));

    })


    $("#Validate").click(function(){

        let atividades = JSON.parse(localStorage.getItem("activities"));
        let current= atividades["current"];

        $.each(atividades,function(index,value){

            if(value.name==current.name && value.owner==current.owner && index!="current"){
                value.validated="Yes";
            }



        })
        localStorage.setItem("activities",JSON.stringify(atividades));



    })
    $("#Remove").click(function () {

        let type="Activity";


        let propriedades = JSON.parse(localStorage.getItem("properties"));
        let atividades = JSON.parse(localStorage.getItem("activities"));
        let users = JSON.parse(localStorage.getItem("users"));
        let owner = atividades["current"].owner;
        let name =atividades["current"].name;
        let prop = users[owner].properties;

        $.each(users, function (index, value) {

            if (value.type = "Client") {
                let fav = value.favorites

                for (let i = 0; i < favorites.length; i++) {

                    if (favorites[i].name == name && favorites[i].owner == owner) {
                        favorites.splice(i, 1);
                        localStorage.setItem("users", JSON.stringify(users));
                        break;
                    }

                }

            }


        })
        if (type.trim() == "Activity") {
            let count = 0;

            $.each(atividades, function (index, value) {
                if (value.name == name.trim() && value.owner == owner.trim()) {
                    delete atividades[Object.keys(atividades)[count]];
                    return false;
                }
                count++;
            })
        }
        else {
            // console.log("entrou")
            let count = 0;
            $.each(propriedades, function (index, value) {
                if (value.name == name.trim() && value.owner == owner.trim()) {
                    delete propriedades[Object.keys(propriedades)[count]];
                    return false;

                }
                count++;
            })
        }
        let count = 0;
        let ind;
        $.each(prop, function (index, value) {
            if (value.name == name.trim()) {
                ind = count;
                console.log(ind)
            }
            count++;
        })
        prop.splice(ind, 1);

        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("properties", JSON.stringify(propriedades));
        localStorage.setItem("activities", JSON.stringify(atividades));

    })


    $("#Edit").click(function () {

        $(".edit").removeClass("d-none");
        $(".texto").addClass("d-none");
        $("#SaveEdit").removeClass("d-none");
        $("#Edit").addClass("d-none")



    })

    $("#SaveEdit").click(function () {
        let newprice = $("#PriceInput").val();
        let newdate = $("#DateInput").val();
        let newdescription = $("#DescriptionInput").val();
        let newspace = $("#SpaceInput").val();
        let valid = true;
        var hoje = new Date();
        var year = hoje.getFullYear();
        var month = hoje.getMonth() + 1;
        var day = hoje.getDate();
        var today = "" + year + "-" + month + "-" + day;

        if (newspace.length == 0 || newspace.length > 20) {
            valid = false;
        }
        if (newdate == null || compareDates(newdate, today) == false) {
            valid = false;
        }
        if (isNaN(newprice) || newprice.length > 6 || newprice.length == 0) {
            valid = false;
        }
        if (newdescription.length < 10 || newdescription.length > 200) {
            valid = false;
        }
        if (valid) {
            $.each(users, function (index, value) {
                if (value.type == "Client") {
                    let favorites = value.favorites;
                    for (let i = 0; i < favorites.length; i++) {
                        if (favorites[i].name == current.name && favorites[i].owner == current.owner) {
                            favorites[i].price = newprice;
                            favorites[i].data = newdate;
                            favorites[i].description = newdescription;
                        }
                    }
                }

            })


            $.each(activities, function (index, value) {
                if (value.name == current.name && value.owner == value.owner) {
                    value.price = newprice;
                    value.data = newdate;
                    value.description = newdescription;
                }
            })
            let currentuser = users["current"].properties;

            let name = activities["current"].name;
            for (let i = 0; i < currentuser.length; i++) {

                if (currentuser[i].name == name) {
                    currentuser[i].price = newprice;
                    currentuser[i].data = newdate;
                    currentuser[i].description = newdescription;
                }

            }


            localStorage.setItem("users", JSON.stringify(users));
            localStorage.setItem("activities", JSON.stringify(activities));
            window.location.assign("ActivityDetail.html");
        }
    })


})



function compareDates(date, now) {

    var dyear = parseInt(date.split("-")[0]);
    var dmonth = parseInt(date.split("-")[1]);
    var dday = parseInt(date.split("-")[2]);


    var nyear = parseInt(now.split("-")[0]);
    var nmonth = parseInt(now.split("-")[1]);
    var nday = parseInt(now.split("-")[2]);

    if (dyear < nyear) {
        return false;
    }
    else if (dyear > nyear) {
        return true;
    }
    else {
        if (dmonth > nmonth) {
            return true;
        }
        else if (dmonth < nmonth) {
            return false;
        }
        else {
            if (dday > nday) {
                return true;
            }
            else {
                return false;
            }
        }
    }




}