const selectIcon1=document.querySelector(".toggleIcon");

selectIcon1.addEventListener("click",toggle2);
function toggle2() {
    document.querySelector(".sideNav").classList.toggle("sideVisible")
    document.querySelector(".rightPart").classList.toggle("rightPartMargin");
    document.querySelector(".toggleIcon").classList.toggle("toggleIconApply");
}

const selectCircle2=document.querySelectorAll(".compDel")

for(let i=0;i<selectCircle2.length;i++){
    selectCircle2[i].addEventListener('click',function fillCircle() {
        document.querySelector(`${"."+"cir"+(i+1)}`).classList.toggle("fa-solid")
    });
    

}

const currDate=new Date();
const year = currDate.getFullYear();
const month = currDate.getMonth()+1;
const day = currDate.getDate();

document.getElementById("date").innerHTML=day+"/"+month+"/"+year;

