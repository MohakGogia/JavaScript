let photo = document.querySelector("#photo");
let download = document.querySelector("#download");
let photoInput = document.querySelector("#photo-upload");

photo.addEventListener("click" , function(){
    photoInput.click();
});

photoInput.addEventListener("change" , function(e){
    let fileObject = e.target.files[0];
    console.log(fileObject);

    let imageUrl = URL.createObjectURL(fileObject);
    let img = document.createElement("img");
    img.src = imageUrl;
    img.classList.add("image-upload");
    appendSticky(img); //img file k object pass hoga isme aur sticky k content m photo ajaegi
})


download.addEventListener("click" , function(){
    let canvasUrl = canvas.toDataURL({type:"image/png"});
    let aTag = document.createElement("a");
    aTag.download = "canvas.png";
    aTag.href = canvasUrl;
    aTag.click();
}) 