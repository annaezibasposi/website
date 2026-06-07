let lang='fr';

function setLang(l){lang=l;render();}

function render(){
const t=data[lang];
document.getElementById('subtitle').innerText=t.subtitle;
document.getElementById('countdownTitle').innerText=t.countdown;
document.getElementById('infoTitle').innerText=t.info;
document.getElementById('churchInfo').innerText=t.church;
document.getElementById('venueInfo').innerText=t.venue;
document.getElementById('stayInfo').innerText=t.stay;
document.getElementById('aboutText').innerText=t.about;
document.getElementById('rsvpLink').href=data.rsvp;
renderCountdown();
renderGifts();
}

function renderCountdown(){
const target=new Date(data.date).getTime();
setInterval(()=>{
const diff=target-Date.now();
const days=Math.floor(diff/86400000);
document.getElementById('countdown').innerText=days+' days';
},1000);
}

function renderGifts(){
const c=document.getElementById('giftList');
c.innerHTML='';
data.gifts.forEach((g,i)=>{
const d=document.createElement('div');
d.className='card';
d.innerHTML=`<h4>${g.name}</h4><p>${g.price}€</p><button onclick="buyGift(${i})">Buy</button>`;
c.appendChild(d);
});
}

function buyGift(i){
data.gifts[i].price-=50;
renderGifts();
}

render();
