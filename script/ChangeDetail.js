$(document).ready(function(){
    $(".Detail").click(function () {

        
        let x = $(this).parent().attr("id");
        let n = x.split("-");
        let name = n[0];
        let owner =n[2];
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
                    current.description=value.description;
    
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
                    current.description=value.description;
    
                    localStorage.setItem("properties", JSON.stringify(prop));
    
                }
    
    
    
            })
    
    
    
        }
    
    })
})

