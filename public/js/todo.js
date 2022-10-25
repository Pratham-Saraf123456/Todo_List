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

// const selectStar = document.querySelectorAll(".starImp");

// for(let i=0;i<selectStar.length;i++){
//     // console.log(selectStar[i].classList.toggle("fa-solid"));
//     selectStar[i].addEventListener('click',function(){
//         document.querySelector(`${"."+"imp"+ (i+1)}`).classList.toggle("fa-solid");
//     })

// }
