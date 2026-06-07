const canvas=document.getElementById('game');
const ctx=canvas.getContext('2d');

let anna={x:50,y:50};
let ziba={x:300,y:300};

document.addEventListener('keydown',(e)=>{
if(e.key==='ArrowUp')anna.y-=10;
if(e.key==='ArrowDown')anna.y+=10;
if(e.key==='ArrowLeft')anna.x-=10;
if(e.key==='ArrowRight')anna.x+=10;
});

function loop(){
ctx.clearRect(0,0,400,400);
ctx.fillText('👰',anna.x,anna.y);
ctx.fillText('🤵',ziba.x,ziba.y);
ziba.x+=(anna.x-ziba.x)*0.02;
ziba.y+=(anna.y-ziba.y)*0.02;
requestAnimationFrame(loop);
}
loop();
