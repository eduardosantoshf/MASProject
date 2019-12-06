$(document).ready(function () {

    load();

    $(".Details").click(function(){
        let info = $(this).parent().parent().attr("id");
        info= info.split("-");
        let name = info[0];
        let type =info[1].trim();
        let owner = info[2].trim();
        

        if (type=="Activity") {
            let act = JSON.parse(localStorage.getItem("activities"));
            let current = act["current"];
            $.each(act, function (index, value) {
                if(value.name==name && value.owner==owner){
                    current.name=name;
                    current.local =value.local;
                    current.owner=owner;
                    current.price=value.price;
                    current.data = value.data;
                    current.space = value.space;
                    current.img= value.img;
                    current.capacity=value.capacity;
                    current.validated=value.validated;
                    current.file=value.file;
                    current.description = value.description;
                    current.rating= value.rating;

                    localStorage.setItem("activities", JSON.stringify(act));

                }
            }
            )}
        else{
            let prop =JSON.parse(localStorage.getItem("properties"));
            let current = prop["current"];
            $.each(prop,function(index,value){
                if(value.name==name && value.owner==owner){
                    current.name=name;
                    current.local=value.local;
                    current.owner=owner;
                    current.price=value.price;
                    current.rooms=value.rooms;
                    current.img=value.img;
                    current.capacity=value.capacity;
                    current.validated=value.validated;
                    current.file=value.file;
                    current.description = value.description;
                    current.rating= value.rating;

                    localStorage.setItem("properties", JSON.stringify(prop));

                }
            })
        }
    })
})

function load() {

    let propriedades = JSON.parse(localStorage.getItem("properties"));
    let atividades = JSON.parse(localStorage.getItem("activities"));

    let coisas = [];
    $.each(propriedades, function (index, value) {

        if (value.file == "" && index!="current") {
            coisas.push(value);
        }


    })
    $.each(atividades, function (index, value) {

        if (value.file == "" && index!="current") {
            coisas.push(value);
        }


    })
    console.log(coisas);


    $.each(coisas, function (index, value) {


        if (value.file == "" && value.validated=="No") {
            let x;
            if (value.type == "Activity") {
                x = "ActivityDetail.html";
            }
            else {
                x = "HouseDetail.html";
            }
            $("tbody").append("<tr id=\"" + value.name + "-" + value.type + "-" + value.owner + "\"><th scope=\"row\"><img src=\"" + value.img + " \" class=\"table-img\"></th><td> <a class=\"Details\" href=\" " + x + "\" >" + value.name + "</a></td><td><i class=\"fas fa-info-circle\"></i></td> </tr>");
        }


    })
    return coisas;
}