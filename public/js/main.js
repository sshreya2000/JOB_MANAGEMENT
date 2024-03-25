
// anime  on Home Page
var textWrapper = document.querySelector(".ml12");
if(textWrapper) textWrapper.innerHTML = textWrapper.innerHTML.replace(/\S/g,
"<span class='letter'>$&</span>"
);

anime
.timeline({ loop: true })
.add({
targets: ".ml12 .letter",
translateX: [40, 0],
translateZ: 0,
opacity: [0, 1],
easing: "easeOutExpo",
duration: 1200,
delay: (el, i) => 500 + 30 * i,
})
.add({
targets: ".ml12 .letter",
translateX: [0, -30],
opacity: [1, 0],
easing: "easeInExpo",
duration: 1100,
delay: (el, i) => 100 + 30 * i,
});

// alert to delete job
function deleteJob(id){
    const result= confirm('Are you sure you want to delete this job?');
    if(result){
        fetch('/job/delete/'+id, {
            method:"GET"
        }).then((res)=>{
            if(res.ok) location.replace('/jobs');
        })
    }
}

// alert to update job
function updateJob(id){
    const result= confirm('Are you sure you want to update this job?');
    if(result){
        fetch('/job/update/'+id, {
            method:"GET"
        }).then((res)=>{
            if(res.ok) location.replace('/job/update/'+id);
        })
    }
}

// pagination
function loadPage(page){
    fetch(`/jobs?page=${page}`,{
        method:"GET"
    }).then((res)=>{
        if(res.ok)location.replace(`/jobs?page=${page}`);
    })
}
function loadPrevPage(page){
    fetch(`/jobs?page=${Number(page)-1}`,{
        method:"GET"
    }).then((res)=>{
        if(res.ok)location.replace(`/jobs?page=${Number(page)-1}`);
    })
}
function loadNextPage(page){
    fetch(`/jobs?page=${Number(page)+1}`,{
        method:"GET"
    }).then((res)=>{
        if(res.ok)location.replace(`/jobs?page=${Number(page)+1}`);
    })
}