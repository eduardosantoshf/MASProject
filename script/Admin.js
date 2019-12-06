$(document).ready(function () {

    let coisas = load();

    $(".fa-file-alt").click(function () {

        let info = $(this).parent().parent().attr("id");
        info = info.split("-");
        console.log(info);

        $.each(coisas, function (index, value) {

            if (value.name == info[0].trim() && value.owner == info[2].trim()) {

                $("#FileTitle").html(value.name);
                $("#FileText").html(value.file);
            }

        })
        $("#FileDiv").removeClass("d-none");

    })
    $("#closeFile").click(function () {

        $("#FileDiv").addClass("d-none");
    })

    $(".fa-check-circle").click(function () {
        let propriedades = JSON.parse(localStorage.getItem("properties"));
        let atividades = JSON.parse(localStorage.getItem("activities"));
        let users = JSON.parse(localStorage.getItem("users"));
        // console.log(users["Owner"].username)
        let info = $(this).parent().parent().attr("id");
        info = info.split("-");
        if ($(this).attr("class") == "far fa-check-circle") {
            return false;
        }
        // $.each(coisas, function (index, value) {

        //     if (value.name == info[0].trim() && value.owner == info[2].trim()) {

        //         value.validated = "Yes";

        //     }

        // })
        if (info[1].trim() == "Activity") {
            $.each(atividades, function (index, value) {
                if (value.name == info[0].trim() && value.owner == info[2].trim()) {
                    value.validated = "Yes";
                }
            })
        }
        else {
            $.each(propriedades, function (index, value) {
                if (value.name == info[0] && value.owner == info[2].trim()) {
                    value.validated = "Yes";
                }
            })
        }

        let prop = users[info[2]].properties;
        // console.log(users[info[2]].properties);
        // console.log(prop[0].name==info[0].trim())

        $.each(prop, function (index, value) {
            if (value.name == info[0]) {
                value.validated = "Yes";
            }


        })


        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("properties", JSON.stringify(propriedades));
        localStorage.setItem("activities", JSON.stringify(atividades));

        removeLine(info);
        // console.log(prop);

    })

    $(".fa-trash-alt").click(function () {

        let info = $(this).parent().parent().attr("id");
        info = info.split("-");

        removeList(info, true);
    })

    $(".fa-ban").click(function () {

        let propriedades = JSON.parse(localStorage.getItem("properties"));
        let atividades = JSON.parse(localStorage.getItem("activities"));
        let users = JSON.parse(localStorage.getItem("users"));
        let info = $(this).parent().parent().attr("id");
        info = info.split("-");


        let prop = users[info[2]].properties;
        $.each(prop, function (index, value) {
            let inf = [value.name, value.type, value.owner];
            if (value.validated == "No") {

                removeList(inf, true);
            }
            else {

                removeList(inf, false);
            }
        })
    })

    $(".Details").click(function () {

        let x = $(this).parent().parent().attr("id");
        x = x.split("-");
        let name = x[0].trim();
        let owner = x[1].trim();
        let type = x[2].trim();

        if (tipo == "Activity") {
            let act = JSON.parse(localStorage.getItem("activities"));
            let current = act["current"];
            $.each(act, function (index, value) {
                if (value.name == name && value.owner == owner) {
                    current.name = name;
                    current.local = value.local;
                    current.owner = owner;
                    current.price = value.price;
                    current.data = value.data;
                    current.space = value.space;
                    current.img = value.img;
                    current.capacity = value.capacity;
                    current.validated = value.validated;
                    current.file = value.file;
                    current.description = value.description;
                    localStorage.setItem("activities", JSON.stringify(act));
                }
            }
            )
        }
        else {
            let prop = JSON.parse(localStorage.getItem("properties"));
            let current = prop["current"];
            $.each(prop, function (index, value) {
                if (value.name == name && value.owner == owner) {
                    current.name = name;
                    current.local = value.local;
                    current.owner = owner;
                    current.price = value.price;
                    current.rooms = value.rooms;
                    current.img = value.img;
                    current.capacity = value.capacity;
                    current.validated = value.validated;
                    current.file = value.file;
                    current.description = value.description;
                    localStorage.setItem("properties", JSON.stringify(prop));
                }
            })
        }
    })
})





// Da load ao conteudo da tabela___________________________________________
function load() {

    let propriedades = JSON.parse(localStorage.getItem("properties"));
    let atividades = JSON.parse(localStorage.getItem("activities"));

    let coisas = [];
    $.each(propriedades, function (index, value) {

        if (value.validated == "No" && value != propriedades["current"]) {
            coisas.push(value);
        }


    })
    $.each(atividades, function (index, value) {

        if (value.validated == "No" && value != atividades["current"]) {
            coisas.push(value);
        }


    })
    console.log(coisas);


    $.each(coisas, function (index, value) {


        if (value.validated == "No") {
            let x;
            if (value.type == "Activity") {
                x = "ActivityDetail.html";
            }
            else {
                x = "HouseDetail.html";
            }
            if (value.file != "") {

                $("tbody").append("<tr id=\"" + value.name + "-" + value.type + "-" + value.owner + "\"><th scope=\"row\"><img src=\"" + value.img + " \" class=\"table-img\"></th><td> <a class=\"Details\" href=\" " + x + "\" >" + value.name + "</a></td><td><i class=\"fas fa-file-alt\"></i></td><td><i class=\"fas fa-check-circle\"></i></td><td><i class=\"fas fa-trash-alt\"></i></td><td><i class=\"fas fa-ban\"></i></td> </tr>");
            }
            else {
                $("tbody").append("<tr id=\"" + value.name + "-" + value.type + "-" + value.owner + "\"><th scope=\"row\"><img src=\"" + value.img + " \" class=\"table-img\"></th><td><a class=\"Details\" href=\" " + x + "\">" + value.name + "</a><td></td></td><td><i class=\"far fa-check-circle\"></i></td><td><i class=\"fas fa-trash-alt\"></i></td><td><i class=\"fas fa-ban\"></i></td> </tr>")
            }
        }


    })
    return coisas;
}


//Remove uma linha da tabela _______________________________________________________-

function removeLine(x) {
    let id = "#" + x[0] + "-" + x[1] + "-" + x[2];

    console.log(id);
    $(id).remove();

}



//Remove da lista _____________________________________________________________________
function removeList(info, onList) {

    let propriedades = JSON.parse(localStorage.getItem("properties"));
    let atividades = JSON.parse(localStorage.getItem("activities"));
    let users = JSON.parse(localStorage.getItem("users"));
    let prop = users[info[2]].properties;

    $.each(users,function(index,value){

        if(value.type="Client"){
            let fav = value.favorites

            for(let i = 0;i<favorites.length;i++){

                if(favorites[i].name==info[0] && favorites[i].owner==info[2]){
                    favorites.splice(i,1);
                    localStorage.setItem("users",JSON.stringify(users));
                    break;
                }

            }

        }


    })
    if (info[1].trim() == "Activity") {
        let count = 0;

        $.each(atividades, function (index, value) {
            if (value.name == info[0].trim() && value.owner == info[2].trim()) {
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
            if (value.name == info[0].trim() && value.owner == info[2].trim()) {
                delete propriedades[Object.keys(propriedades)[count]];
                return false;

            }
            count++;
        })
    }
    let count = 0;
    let ind;
    $.each(prop, function (index, value) {
        if (value.name == info[0].trim()) {
            ind = count;
            console.log(ind)
        }
        count++;
    })
    prop.splice(ind, 1);

    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("properties", JSON.stringify(propriedades));
    localStorage.setItem("activities", JSON.stringify(atividades));

    if (onList) {
        removeLine(info);
    }
}