var cells = document.querySelectorAll("#board th"),
    turn = 0;
    color = ["black","white"];

function startPosition(){
    cells[27].classList.add("white"); 
    cells[28].classList.add("black");
    cells[35].classList.add("black");
    cells[36].classList.add("white");
}

window.onload = startPosition;

for (let i = 0; i < cells.length; i++){
    cells[i].addEventListener("click", function(){click_location(i)}, false);
}

function click_location(index){
    cells[index].classList.add(color[turn % 2]);
    turn++;
}

function color_change(index){
    

}