$(document).ready(function () {

    var users = JSON.parse(localStorage.getItem("users"));

    var properties = users["current"].properties;

    for (var i = 0; i < properties.length; i++) {
        let x;
        if(properties[i].type=="Activity"){
            x = "ActivityDetail.html";
        }
        else{
            x = "HouseDetail.html";
        }
        $("#tabela").append("<tr id=\" " + properties[i].name + "-" + properties[i].type + "-" + properties[i].owner + " \"> <th scope=\"row\"><img src=\"" + properties[i].img + "\" class=\"table-img\"></th> <td><a class=\"housedetail\" href=\" "+x+" \">" + properties[i].name + "</td></a> <td>" + properties[i].capacity + "</td> <td>" + properties[i].validated + "</td> <td><i  class=\"fas fa-trash-alt\"></i></td> </tr>");

    }



    $(".fa-trash-alt").click(function () {

        let x = this.parentNode.parentNode.rowIndex - 1;
        properties.splice(x, 1);
        // console.log(properties);
        console.log($(this).parent().parent().attr("id"));
        $(this).parent().parent().remove();
        localStorage.setItem("users", JSON.stringify(users));
        // remove from properties and activities the one that was removed

        let y = $(this).parent().parent().attr("id");
        let n = y.split("-");
        let name = n[0].trim();
        let owner =n[2].trim();
        let type = n[1].trim();
        
        $.each(users,function(index,value){

            if(value.type=="Client"){
                let favorites = value.favorites;
                for(let i = 0;i<favorites.length;i++){

                    if(favorites[i].name==name && favorites[i].owner==owner){
                        favorites.splice(i,1);
                        localStorage.setItem("users",JSON.stringify(users));
                        break;
                    }

                }

            }


        })
        if (type=="Activity") {
            let act = JSON.parse(localStorage.getItem("activities"));
            let count = 0;
            $.each(act, function (index, value) {
                // console.log(Object.keys(act)[1])
                // console.log(count);
                if(value.name==name && value.owner==owner && Object.keys(act)[count]!="current"){
                    // console.log("dentro")
                    delete act[Object.keys(act)[count]];
                    localStorage.setItem("activities",JSON.stringify(act));
                    return false;
                }
                count++;
            }

            )}

        else{
            let prop = JSON.parse(localStorage.getItem("properties"));
            let count = 0;
            $.each(prop, function (index, value) {
                // console.log(Object.keys(act)[1])
                // console.log(count);
                if(value.name==name && value.owner==owner && Object.keys(prop)[count]!="current"){
                    // console.log("dentro")
                    delete prop[Object.keys(prop)[count]];
                    localStorage.setItem("properties",JSON.stringify(prop));
                    return false;
                }
                count++;
            }

            )



        }

    })


    $(".housedetail").click(function () {

        let x = $(this).parent().parent().attr("id");
        let n = x.split("-");
        let name = n[0].trim();
        let owner =n[2].trim();
        let type = n[1].trim();
        

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

                    localStorage.setItem("properties", JSON.stringify(prop));

                }



            })



        }

    })
})

