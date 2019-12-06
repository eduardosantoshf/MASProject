$(document).ready(function(){

$("#home").click(function(){
    history.back();
})

let users = JSON.parse(localStorage.getItem("users"));
let current = users["current"];
if(current.username == ""){
    $("#LogOut").addClass("d-none")
}


function textAreaAdjust(o) {
    o.style.height = "1px";
    o.style.height = (25+o.scrollHeight)+"px";
}
});