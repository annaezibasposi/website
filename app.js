let lang='fr';

function scrollToSection(id){
  const element=document.getElementById(id);
  if(element){
    element.scrollIntoView({behavior:'smooth'});
    updateActiveNav(id);
  }
}

function updateActiveNav(id){
  document.querySelectorAll('.nav-link').forEach(a=>a.classList.remove('active'));
  const link=[...document.querySelectorAll('.nav-link')].find(a=>a.getAttribute('onclick')===`scrollToSection('${id}')`);
  if(link) link.classList.add('active');
}

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
document.getElementById('giftsTitle').innerText=t.gifts||'Lista nozze';
document.getElementById('rsvpTitle').innerText=t.rsvp||'RSVP';
document.getElementById('aboutTitle').innerText=t.aboutTitle||'Gli sposi';
document.getElementById('rsvpLink').href=data.rsvp;

// Load logo and couple photo
document.getElementById('logo').src=data.logo;
document.getElementById('couplePhoto').src=data.couplePhoto;

// Load maps
document.getElementById('churchMap').src=data.churchLocation.mapEmbed;
document.getElementById('venueMap').src=data.venueLocation.mapEmbed;

// Load Google Maps links
const churchMapUrl=`https://maps.google.com/?q=${encodeURIComponent(data.churchLocation.address)}`;
const venueMapUrl=`https://maps.google.com/?q=${encodeURIComponent(data.venueLocation.address)}`;
document.getElementById('churchLink').href=churchMapUrl;
document.getElementById('venueLink').href=venueMapUrl;

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
  const percentage=Math.min(100, (g.paid/g.price)*100);
  const remaining=g.price-g.paid;
  const isPaid=remaining<=0;
  
  const d=document.createElement('div');
  d.className=`gift-card ${isPaid?'gift-paid':''}`;
  
  d.innerHTML=`
    <div class="gift-emoji">${g.emoji||'🎁'}</div>
    ${g.image?`<img src="${g.image}" alt="${g.name}" class="gift-image-bubble">`:'<div style="width:120px;height:120px;margin:0 auto 15px;border-radius:50%;border:3px solid #8b7355;background:#e8e0d8;display:flex;align-items:center;justify-content:center;font-size:48px;">${g.emoji||'🎁'}</div>'}
    <h4 class="gift-name">${g.name}</h4>
    <div class="gift-price-info">
      <div class="gift-price-label">Progress</div>
      <div class="price-bar">
        <div class="price-progress" style="width:${percentage}%"></div>
      </div>
      <div class="price-text">€${g.paid} / €${g.price}</div>
      ${remaining>0?`<div style="font-size:14px;color:#999;">€${remaining} remaining</div>`:'<div style="font-size:14px;color:#8b7355;font-weight:600;">✓ Paid</div>'}
    </div>
    ${!isPaid?`<button class="buy-button" onclick="contributeGift(${i})">Contribute</button>`:'<button class="buy-button" disabled>Complete</button>'}
  `;
  c.appendChild(d);
});
}

function contributeGift(i){
const gift=data.gifts[i];
const contribution=Math.min(50, gift.price-gift.paid);
if(contribution>0){
  gift.paid+=contribution;
  renderGifts();
}
}

// Update active nav on scroll
window.addEventListener('scroll',()=>{
  const sections=['home','info','gifts','rsvp','about'];
  let current='home';
  sections.forEach(id=>{
    const el=document.getElementById(id);
    if(el && el.getBoundingClientRect().top<200){
      current=id;
    }
  });
  updateActiveNav(current);
});

render();
