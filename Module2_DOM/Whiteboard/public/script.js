let canvas = document.querySelector("#canvas");

let { top : canvasTop } = canvas.getBoundingClientRect(); // top s kitna necha h wo dedega

// canvas k size badhane k liye
canvas.width = window.innerWidth;
canvas.height = window.innerHeight - (canvasTop+5); 


window.addEventListener("resize" , function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - (canvasTop+5);  
    redrawLine();        
})

let ctx = canvas.getContext("2d");
ctx.lineCap = 'round';

let db=[]; // sari lines store krega
let redoDB = []; // redo k info store krega bs
let line=[]; // for 1 line info - mouse down and then bhot sare mouse move objects

let isMouseDown = false;

canvas.addEventListener("mousedown" , function(e){
    if(redoDB.length){
        redoDB = [];
    }
    isMouseDown = true;
    let x = e.clientX; 
    let y = e.clientY - canvasTop; // upar k width minus hogi
    ctx.beginPath();
    ctx.moveTo(x,y); // starting point

    let pointObject = {
        type:"md",
        x:x,
        y:y,
        color:ctx.strokeStyle,
        width:ctx.lineWidth
    }
    line.push(pointObject);
})

canvas.addEventListener("mousemove" , function(e){
    if(isMouseDown){
        let x = e.clientX;
        let y = e.clientY - canvasTop;
        ctx.lineTo(x,y);
        ctx.stroke(); //line stroke visible hona shuru hojaega x,y point se

        let pointObject = {
            type:"mm",
            x:x,
            y:y,
        }
        line.push(pointObject);
    }
})

canvas.addEventListener("mouseup" , function(e){
    isMouseDown = false;
    db.push(line);
    line = []; //line db m save hokr reset hojagi
    console.log(db);
}) 