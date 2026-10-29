/*
  ════════════════════════════════════════════════════════════════
  script.js: toda la interactividad del portfolio.
  Cada bloque (()=>{ ... })() es independiente y se ejecuta al cargar la página.
  Para cambiar contenidos: PROJECTS (proyectos) y FORTUNES (frases de la galleta).
  ════════════════════════════════════════════════════════════════
*/
/* ═════════ PORTADA: plumbob 3D, texto que se escribe solo y RAMIRO que cambia de letra ═════════ */
(()=>{
  /* ¿El sistema pide menos movimiento? Entonces se quitan las animaciones */
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  /* Plumbob: crea sus 8 caras (4 arriba y 4 abajo), cada una con un tono de rosa distinto */
  const pb=document.getElementById('plumbob');
  if(pb)[72,56,46,62].forEach((l,k)=>['t','b'].forEach(s=>{
    const v=s==='t'?l:l*.8,f=document.createElement('i');f.className='pb-'+s;f.style.setProperty('--r',k*90+'deg');
    f.style.setProperty('--g',`linear-gradient(170deg,hsl(332 100% ${Math.min(90,v+14)}%),hsl(332 90% ${v}%) 55%,hsl(336 80% ${v-12}%))`);pb.appendChild(f);
  }));
  /* Texto de la barra de búsqueda: se separa en letras y se van mostrando una a una con un cursor */
  const p=document.getElementById('type-text');
  if(p){
    p.setAttribute('aria-label',p.textContent.replace(/\s+/g,' ').trim());
    const chars=[];
    /* Envuelve cada letra en un <span> (dentro de la negrita también) */
    (function wrap(n){[...n.childNodes].forEach(c=>{
      if(c.nodeType===3){const f=document.createDocumentFragment();[...c.textContent].forEach(ch=>{const s=document.createElement('span');s.className='tc';s.setAttribute('aria-hidden','true');s.textContent=ch;chars.push(s);f.appendChild(s);});c.replaceWith(f);}
      else wrap(c);});})(p);
    const caret=document.createElement('i');caret.className='caret';p.prepend(caret);
    let i=0;
    /* Muestra la siguiente letra; tras un punto o una coma hace una pausa más larga */
    const step=()=>{if(i>=chars.length)return;const c=chars[i++];c.classList.add('on');c.after(caret);setTimeout(step,/[.,]/.test(c.textContent)?280:30+Math.random()*55);};
    if(reduce){chars.forEach(c=>c.classList.add('on'));caret.remove();}else setTimeout(step,900);
  }
  /* RAMIRO cambia de tipografía cada 150 ms. Cada fuente lleva un factor de tamaño para que todas se vean igual de grandes */
  const ram=document.getElementById('ram'),hero=document.querySelector('.hero');
  if(ram&&!reduce){
    const F=[["Petit Formal Script", 400, 1], ["Pacifico", 400, 1.13], ["Bungee", 400, 1.31], ["Special Elite", 400, 1.4], ["Permanent Marker", 400, 1.36], ["Playfair Display", 800, 1.36]];let k=0,t=0;
    const tick=()=>{if(hero.classList.contains('is-off'))return;k=(k+1+Math.floor(Math.random()*(F.length-1)))%F.length;
      const f=F[k];ram.style.fontFamily=`"${f[0]}",cursive`;ram.style.fontWeight=f[1];ram.style.setProperty('--k',f[2]);};
    /* Espera a que estén cargadas todas las fuentes antes de empezar */
    Promise.all(F.map(f=>document.fonts.load(`${f[1]} 1em "${f[0]}"`,'RAMIRO'))).catch(()=>{}).then(()=>{t=setInterval(tick,150);});
  }
  /* Pausa las animaciones en bucle que no están en pantalla (ahorra batería) */
  const io=new IntersectionObserver(es=>es.forEach(e=>e.target.classList.toggle('is-off',!e.isIntersecting)));
  document.querySelectorAll('.hero,.phone,.marquee').forEach(el=>io.observe(el));
})();

/* ═════════ PROYECTOS: datos de cada proyecto ═════════
   Rellena aquí la información de cada proyecto. Lo que se deje vacío aparece como "Por añadir.":
     title / year → nombre y año          about → de qué va el juego
     highlight → logro destacado (sale en negrita en "Sobre el proyecto")
     role → resumen de tu papel           roleList → lista de tareas (se ve al ampliar la nota "Mi papel")
     tools → herramientas                 time → duración          kind → tipo de proyecto
     play → enlace de itch.io             cover / images / trailer → portada, capturas y vídeo (mp4 o YouTube)
*/
/* Cada clave (rubbish, whispers…) coincide con el data-project de su tarjeta en index.html */
const PROJECTS={
  rubbish :{title:'The Rubbish Pathfinder',  year:'2024',
            about:'Por culpa del deshielo, un pingüino pierde a su familia. A lo largo de distintos escenarios tiene que encontrar a todos sus familiares.',
            role:'Programadora. Programé el videojuego completo e implementé el arte, los efectos de sonido y el resto de recursos.',
            roleList:[],
            highlight:'Terminado y publicado en itch.io en un cuatrimestre.',
            tools:['Construct'], time:'Un cuatrimestre', kind:'Proyecto académico',
            play:'https://frozen-trash-games.itch.io/the-rubbish-pathfinder',
            cover:'assets/projects/rubbish/cover.jpg', images:['assets/projects/rubbish/shot-1.jpg','assets/projects/rubbish/shot-2.jpg'], trailer:'assets/projects/rubbish/trailer.mp4'},
  whispers:{title:'Whispers of Vanished Case',year:'2024',
            about:'Un asesino vuelve a actuar después de un tiempo. Como detective, tienes que reunir las pistas repartidas por los distintos escenarios para atraparlo.',
            role:'Programadora. Programé el videojuego completo e implementé el arte, los efectos de sonido y el resto de recursos.',
            roleList:[],
            highlight:'Terminado y publicado en itch.io en un cuatrimestre.',
            tools:['Construct'], time:'Un cuatrimestre', kind:'Proyecto académico',
            play:'https://devouringstudios.itch.io/whispers-of-vanished-case',
            cover:'assets/projects/whispers/cover.jpg',images:['assets/projects/whispers/shot-1.jpg','assets/projects/whispers/shot-2.jpg'],trailer:'assets/projects/whispers/trailer.mp4'},
  clashing:{title:'Clashing Blocks',          year:'2024',
            about:'Multijugador local en el que un mago y un caballero luchan por los cereales supremos. El mago completa filas para desbloquear power-ups que fastidian al caballero, y el caballero esquiva las piezas y recoge los power-ups que caen del cielo. Gana quien aguante.',
            role:'Rol híbrido de programación y diseño, como gameplay programmer.',
            roleList:[
              'Programación íntegra de las mecánicas del mago, con Input Controller para mover y rotar las piezas.',
              'Sistemas de ataque por colisiones, gestión de salud e invulnerabilidad temporal tras recibir daño.',
              'Power-ups con efectos de estado: bloque de pinchos y bloque pegajoso que alteran la velocidad, la gravedad y el salto del rival.',
              'UI, efectos de sonido, implementación del arte y parte de las mecánicas del caballero.'
            ],
            highlight:'Terminado y publicado en itch.io en un cuatrimestre, trabajando en equipo.',
            tools:['Unity 2D','C#'], time:'Un cuatrimestre', kind:'Proyecto académico',
            play:'https://clashing-blocks.itch.io/clashing-blocks',
            cover:'assets/projects/clashing/cover.jpg',images:['assets/projects/clashing/shot-1.jpg','assets/projects/clashing/shot-2.jpg'],trailer:'assets/projects/clashing/trailer.mp4'},
  dashdine:{title:'Dash&Dine',                year:'2025',
            about:'Eres Víctor, un repartidor de la empresa Dash&Dine que busca vengarse de los cuatro jefes que dominan la ciudad. Cada entrega le acerca a sus secretos, hasta que descubre que quien le contrató es un doble agente del gobierno.',
            role:'Proyecto en pareja con rol híbrido de programación, producción y diseño.',
            roleList:[
              'Programación core: movimiento principal y game feel, físicas ragdoll, spawn de NPCs y vehículos, IA de tráfico por waypoints y combate de NPCs.',
              'UI/UX: HUD con minimapa dinámico, sistema de mensajería vinculado a las misiones y optimización de los efectos de sonido.',
              'Producción y diseño: gestión semanal con metodologías ágiles (Excel) y maquetación de los GDD.',
              'Despliegue: web oficial del proyecto y gestión del perfil de itch.io.'
            ],
            highlight:'Primer proyecto en el que gestioné la producción semanal del equipo.',
            tools:['Unity 3D','C#','DOTween'], time:'Un año académico', kind:'Proyecto académico',
            play:'https://dashdine.itch.io/dashanddine',
            cover:'assets/projects/dashdine/cover.jpg',images:['assets/projects/dashdine/shot-1.jpg','assets/projects/dashdine/shot-2.jpg'],trailer:'assets/projects/dashdine/trailer.mp4'},
  drowned :{title:'Drowned Cape',          year:'2026',about:'',role:'',roleList:[],tools:[],time:'',kind:'',play:'',
            cover:'assets/projects/drowned/cover.jpg',  images:[],trailer:'',soon:true},
  barquillos:{title:'Cooking Barquillos In Madrid',year:'2026',about:'',role:'',roleList:[],tools:[],time:'',kind:'Game jam',play:'',
            cover:'assets/projects/barquillos/cover.jpg',images:[],trailer:'',soon:true}
};

(()=>{
/* ═════════ PROYECTOS: el tablero de corcho interactivo ═════════ */
'use strict';
/* Atajos: buscar un elemento, limitar un número entre dos valores y escapar texto para insertarlo en HTML */
const $=(s,r=document)=>r.querySelector(s);
const clamp=(v,a,b)=>Math.min(b,Math.max(a,v));
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

/* Elementos del tablero y consultas de pantalla (móvil/tablet y menos movimiento) */
const board=$('#board'),world=$('#world'),layerBoard=$('#layer-board'),layerDetail=$('#layer-detail'),backBtn=$('#back-button');
const compactMQ=matchMedia('(max-width:900px),(max-height:560px)'),landMQ=matchMedia('(orientation:landscape)'),reduceMQ=matchMedia('(prefers-reduced-motion: reduce)');
const compact=()=>compactMQ.matches;
/* Tipo de distribución: 'd' ordenador o tablet horizontal grande, 'm' móvil/tablet en vertical, 'l' móvil en horizontal */
const kind=()=>!compact()?'d':(landMQ.matches?'l':'m');

/* Estado del tablero: pan (tablero activado en táctil), modo (tablero o ficha), tamaños, desplazamiento, etc. */
const S={pan:false,mode:'board',W:0,H:0,vw:0,vh:0,px:0,py:0,z:20,saved:null,opener:null,kind:kind()};

/* Pone la portada de cada tarjeta del tablero a partir de los datos */
document.querySelectorAll('.project-card').forEach(card=>{
  const p=PROJECTS[card.dataset.project];
  if(p&&p.cover){const c=card.querySelector('.project-cover');c.style.backgroundImage=`url("${p.cover}")`;c.classList.add('has-image');}
});

/* ── Mundo y piezas: medidas del corcho, desplazamiento y posición de cada pieza ── */
/* Mide la pantalla y decide el tamaño del corcho (más grande que la pantalla para poder moverse) */
function measure(){
  S.vw=board.clientWidth;S.vh=board.clientHeight;
  if(compact()){S.W=Math.max(900,Math.ceil(S.vw*2.3));S.H=Math.max(1500,Math.ceil(S.vh*1.8));}
  else{S.W=Math.max(2200,Math.ceil(S.vw*1.5));S.H=Math.max(1500,Math.ceil(S.vh*1.6));}
  world.style.width=S.W+'px';world.style.height=S.H+'px';
}
/* Desplaza el corcho sin dejar que se vean sus bordes */
function setPan(x,y){
  S.px=clamp(x,Math.min(0,S.vw-S.W),0);S.py=clamp(y,Math.min(0,S.vh-S.H),0);
  world.style.transform=`translate3d(${S.px}px,${S.py}px,0)`;
}
/* Coloca una pieza (posición, giro y, en la ficha del móvil, escala) */
function put(el){const p=el._p;el.style.transform=`translate3d(${p.x}px,${p.y}px,0) rotate(${p.r}deg)${p.s&&p.s!==1?` scale(${p.s})`:''}`;}
/* Evita que una pieza se salga del corcho */
function fit(el){const p=el._p;p.x=clamp(p.x,0,Math.max(0,S.W-el.offsetWidth));p.y=clamp(p.y,0,Math.max(0,S.H-el.offsetHeight));}
function setPiece(el,x,y,r){el._p={x,y,r};fit(el);put(el);}
/* Activa una transición suave del corcho durante medio segundo */
function ease(){
  if(reduceMQ.matches)return;
  world.classList.add('is-easing');clearTimeout(ease.t);ease.t=setTimeout(()=>world.classList.remove('is-easing'),560);
}

/* ── Distribución de las piezas ── */
/* Tablero: título arriba a la izquierda y las tarjetas repartidas para que todas quepan en la primera pantalla */
function layoutBoard(){
  /* proyectos desperdigados: todos caben en la primera pantalla (posiciones como fracción del visor) */
  const k=kind(),c=k!=='d',ox=(S.W-S.vw)/2,oy=(S.H-S.vh)/2;
  const at=(el,fx,fy,r)=>setPiece(el,ox+S.vw*fx-el.offsetWidth/2,oy+S.vh*fy-el.offsetHeight/2,r);
  setPiece($('#board-title'),ox+S.vw*(c?.05:.04),oy+(c?(k==='l'?76:84):Math.max(86,S.vh*.12)),-2);
  /* [x, y, giro] como fracción de la pantalla, en el orden de las tarjetas: Rubbish, Whispers, Clashing, Dash&Dine, Drowned, Barquillos */
  const tn=k==='l'&&$('#board-title').offsetWidth+3*$('.project-card').offsetWidth+S.vw*.05+45>S.vw;   /* si no caben tres tarjetas junto al titulo, se usa el reparto del ordenador */
  const P={
    m:[[.27,.42,-3],[.74,.36,2.5],[.27,.625,2],[.74,.61,-2.5],[.74,.86,3],[.27,.81,-2]],   /* móvil vertical: dos columnas escalonadas */
    l:[[.49,.34,-3],[.69,.36,2.5],[.88,.33,-2],[.17,.70,2.5],[.83,.72,3],[.50,.70,-2.5]],
    n:[[.15,.52,-3],[.47,.36,2.5],[.80,.34,-2],[.30,.80,2.5],[.86,.76,3],[.58,.80,-2.5]],   /* movil horizontal estrecho: como el ordenador */  /* móvil horizontal: dos filas */
    s:[[.62,.37,-3],[.86,.38,2.5],[.15,.70,-2],[.39,.70,2.5],[.87,.70,3],[.63,.70,-2.5]],   /* movil horizontal diminuto: dos arriba y cuatro abajo, en orden de lectura */
    d:[[.24,.47,-3],[.55,.36,2.5],[.82,.28,-2],[.15,.80,2.5],[.82,.72,-4],[.50,.79,3]]     /* ordenador */
  }[k==='l'&&S.vw<640?'s':k==='l'&&tn?'n':k];
  /* reparto: si las posiciones de arriba ya dejan aire entre tarjetas, titulo y botones, se quedan tal cual; si no (segun la resolucion),
     se separan lo justo hasta que ninguna tape el titulo, los botones ni a otra tarjeta */
  const cards=[...layerBoard.querySelectorAll('.project-card')],vw=S.vw,vh=S.vh,tt=$('#board-title'),pb=$('#pan-button'),mg=clamp(vw*.03,16,36);
  const tw=tt.offsetWidth,th=tt.offsetHeight,tx=tt._p.x-ox,ty=tt._p.y-oy;
  const obs=[[0,0,vw,66],[tx-12,ty-12,tx+tw+12,ty+th+12]];
  if(pb&&getComputedStyle(pb).display!=='none')obs.push([0,vh-72,152,vh]);
  obs.push([vw-mg-62,vh-mg-62,vw,vh]);
  const sets=[obs,obs.slice(0,-1),obs.slice(0,2)];   /* si no cabe todo, se renuncia primero al boton de subir y luego al de mover */
  const W=cards.map(el=>el.offsetWidth+16),H=cards.map(el=>el.offsetHeight+16),pad=Math.max(10,vw*.012),Go=10;
  const gp=(X,Y,i,j)=>Math.max(Math.abs(X[i]-X[j])-(W[i]+W[j])/2,Math.abs(Y[i]-Y[j])-(H[i]+H[j])/2);
  const go=(X,Y,i,r)=>[Math.max(r[0]-X[i]-W[i]/2,X[i]-W[i]/2-r[2]),Math.max(r[1]-Y[i]-H[i]/2,Y[i]-H[i]/2-r[3])];
  const met=(X,Y,ob)=>{let mp=1e9,mo=1e9;
    for(let i=0;i<6;i++){for(const r of ob){const d=go(X,Y,i,r);mo=Math.min(mo,Math.max(d[0],d[1]));}
      for(let j=i+1;j<6;j++)mp=Math.min(mp,gp(X,Y,i,j));}
    return [mp,mo];};
  const sol=(G,ext,ob)=>{
    const X=P.map(p=>vw*p[0]),Y=P.map(p=>vh*p[1]),X0=X.slice(),Y0=Y.slice();
    for(let it=0;it<700;it++){
      const sp=it<400?.02:0;
      for(let i=0;i<6;i++){
        X[i]+=(X0[i]-X[i])*sp;Y[i]+=(Y0[i]-Y[i])*sp;
        for(const r of ob){const d=go(X,Y,i,r);
          if(Math.max(d[0],d[1])<Go){
            if(d[0]>=d[1])X[i]+=(X[i]<(r[0]+r[2])/2?-1:1)*(Go-d[0]);else Y[i]+=(Y[i]<(r[1]+r[3])/2?-1:1)*(Go-d[1]);}}
      }
      for(let i=0;i<6;i++)for(let j=i+1;j<6;j++){
        const dx=Math.abs(X[i]-X[j])-(W[i]+W[j])/2,dy=Math.abs(Y[i]-Y[j])-(H[i]+H[j])/2;
        if(Math.max(dx,dy)<G){
          if(dx>=dy){const s=X[i]<X[j]?-1:1,n=(G-dx)/2;X[i]+=s*n;X[j]-=s*n;}
          else{const s=Y[i]<Y[j]?-1:1,n=(G-dy)/2;Y[i]+=s*n;Y[j]-=s*n;}}}
      for(let i=0;i<6;i++){X[i]=clamp(X[i],W[i]/2+pad,vw-W[i]/2-pad);Y[i]=clamp(Y[i],66+H[i]/2+6,vh+ext-H[i]/2-pad);}
    }
    const m=met(X,Y,ob);
    return {X,Y,ok:m[0]>=G-2&&m[1]>=Go-4,q:Math.min(m[0],m[1]+8)-(ob.length<obs.length?2:0)};
  };
  let res={X:P.map(p=>vw*p[0]),Y:P.map(p=>vh*p[1])},best;
  const m0=met(res.X,res.Y,obs);
  if(m0[0]<10||m0[1]<Go){
    find:for(const ob of sets)for(const ext of [0,vh*.25])
      for(const g of [.3,.24,.18,.13,.09,.05,.02]){res=sol(g*Math.min(...W),ext,ob);if(!best||res.q>best.q)best=res;if(res.ok)break find;}
    if(!res.ok)res=best;
  }
  cards.forEach((el,i)=>setPiece(el,ox+res.X[i]-el.offsetWidth/2,oy+res.Y[i]-el.offsetHeight/2,P[i][2]));
  return {x:-ox,y:-oy};
}

/* Posición de cada pieza en la ficha de un proyecto: [x, y, ancho, alto, giro].
   STAGE_D es para ordenador y STAGE_M para móvil y tablet */
const STAGE_D={w:1380,h:780,p:{play:[1215,150,150,0,4],trailer:[30,50,560,0,-1.5],cover:[640,30,250,0,2.5],shot1:[930,80,250,0,-2.5],title:[40,450,320,250,-2],about:[390,455,260,240,1.5],shot2:[680,430,230,0,-3],role:[930,410,275,195,1.5],tools:[975,628,230,110,-1.5]}};
/* STAGE_L: móvil en horizontal (ancho y bajito) */
const STAGE_L={w:900,h:400,p:{trailer:[0,0,330,0,-1],title:[345,0,180,150,-2],cover:[545,6,165,0,3],play:[740,10,115,0,-3],about:[0,245,200,140,1.5],role:[215,250,200,140,-1.5],tools:[430,245,160,120,1.5],shot1:[610,200,140,0,-2.5],shot2:[765,194,135,0,2]}};
const STAGE_M={w:350,h:740,p:{title:[0,0,168,176,-2],cover:[182,10,163,0,3],trailer:[10,196,330,0,-1],about:[0,432,112,150,1.5],role:[119,438,112,146,-1.5],tools:[238,432,112,150,1.5],shot1:[0,604,112,0,-2.5],shot2:[119,612,112,0,2],play:[240,602,108,0,-2]}};

/* Crea una pieza de la ficha (nota, foto, tráiler o botón) con su chincheta */
function piece(key,kind,cls,inner){
  const el=document.createElement('div');
  el.className=`piece ${kind} ${cls||''}`.trim();el.dataset.key=key;
  el.innerHTML=`<div class="piece-inner">${inner}<i class="pin"></i></div>`;
  return el;
}
/* Contenido de una nota: título, texto y "Leer más"; si no hay texto pone "Por añadir." */
function noteBody(title,html,emptyText){
  return html?`<h4>${title}</h4><div class="note-text">${html}</div><button class="note-more" type="button">Leer más</button>`
             :`<h4>${title}</h4><p class="is-empty">${esc(emptyText)}</p>`;
}
/* Decide cómo reproducir el tráiler: YouTube, archivo de vídeo u otra web */
function embedFor(url){
  const yt=url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/);
  if(yt)return {kind:'iframe',src:`https://www.youtube.com/embed/${yt[1]}?autoplay=1&rel=0`};
  if(/\.(mp4|webm|ogg)(\?.*)?$/i.test(url))return {kind:'video',src:url};
  return {kind:'iframe',src:url};
}
/* Cambia la portada del tráiler por el vídeo al pulsarlo */
function playTrailer(el,url){
  if(el._playing)return;el._playing=true;
  const m=el.querySelector('.trailer-media'),e=embedFor(url);
  m.innerHTML=e.kind==='video'
    ?`<video src="${esc(e.src)}" controls autoplay playsinline preload="auto"></video>`
    :`<iframe src="${esc(e.src)}" title="Tráiler" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
}

/* Construye la ficha de un proyecto con todas sus piezas */
function buildDetail(id){
  const p=PROJECTS[id],k=kind(),st=k==='l'?STAGE_L:k==='m'?STAGE_M:STAGE_D,soon=!!p.soon;
  const miss=soon?'Próximamente.':'Por añadir.';
  layerDetail.innerHTML='';
  const photo=(src,cap)=>`<div class="photo-img">${src?`<img src="${esc(src)}" alt="${esc(p.title)} — ${cap}" draggable="false">`:'<svg aria-hidden="true"><use href="#i-image"/></svg>'}</div><div class="photo-cap">${cap}</div>`;
  /* Lista de piezas: [clave, tipo, color, contenido] */
  const defs=[
    ['title','note note-title','note-yellow',`<p class="note-year">${esc(p.year)}</p><h3>${esc(p.title)}</h3>${soon?'<p class="note-status">Próximamente</p>':''}${p.kind?`<p class="note-status">${esc(p.kind)}</p>`:''}${p.time?`<p class="note-time">Duración: ${esc(p.time.toLowerCase())}</p>`:''}`],
    ['cover','photo','',photo(p.cover,'Portada')],
    ['trailer','trailer'+(p.trailer?' is-playable':''),'',`<div class="trailer-media">${p.cover&&p.trailer?`<img class="poster" src="${esc(p.cover)}" alt="" draggable="false">`:''}<span class="play-circle"><svg aria-hidden="true"><use href="#i-play"/></svg></span></div><div class="photo-cap">${soon?'Tráiler · próximamente':'Tráiler'}</div>`],
    ['about','note','note-paper',noteBody('Sobre el proyecto',p.about?`<p>${esc(p.about)}</p>${p.highlight?`<p class="note-highlight">${esc(p.highlight)}</p>`:''}`:'',miss)],
    ['shot1','photo','',photo(p.images[0],'Captura')],
    ['role','note','note-pink',noteBody('Mi papel',p.role?`<p>${esc(p.role)}</p>${p.roleList.length?`<ul>${p.roleList.map(t=>`<li>${esc(t)}</li>`).join('')}</ul>`:''}`:'',miss)],
    ['shot2','photo','',photo(p.images[1],'Captura')],
    ['tools','note','note-yellow',noteBody('Herramientas',p.tools.length?`<p>${esc(p.tools.join(', '))}</p>`:'',miss)],
    ['play','play','',p.play
      ?`<a class="play-btn" href="${esc(p.play)}" target="_blank" rel="noopener" aria-label="Jugar a ${esc(p.title)} en itch.io (se abre en otra pestaña)"><span>¡Jugar!</span></a><span class="play-label">en itch.io</span>`
      :`<span class="play-btn is-off" aria-hidden="true"><span>Pronto</span></span><span class="play-label">en itch.io</span>`]
  ];
  /* Crea cada pieza, le da su ancho y alto, y le asigna qué pasa al pulsarla */
  defs.forEach(([key,kind,color,html],i)=>{
    const el=piece(key,kind,color,html);
    const [,,w,mh]=st.p[key];
    el.style.width=w+'px';el.style.setProperty('--i',i);
    if(mh)el.firstElementChild.style[kind==='note'?'height':'minHeight']=mh+'px';   /* las notas de texto tienen alto fijo; el resto se lee al ampliarlas */
    if(kind==='note'&&el.querySelector('.note-text')){
      el._onClick=()=>zoomNote(el);el.tabIndex=0;el.setAttribute('role','button');
      el.setAttribute('aria-label','Ampliar la nota: '+el.querySelector('h4').textContent);
    }
    if(key==='trailer'&&p.trailer)el._onClick=()=>playTrailer(el,p.trailer);
    layerDetail.appendChild(el);
  });
}
/* nota ampliada: al pulsar una nota se abre en grande, encima del tablero, con todo el texto */
const zoom=$('#note-zoom'),zoomBody=zoom&&zoom.querySelector('.nz-body'),zoomCard=zoom&&zoom.querySelector('.nz-card');
function zoomNote(el){
  if(!zoom)return;
  zoomCard.className='nz-card '+[...el.classList].filter(c=>c.startsWith('note-')).join(' ');
  zoomBody.innerHTML=el.querySelector('h4').outerHTML+el.querySelector('.note-text').innerHTML;
  zoom.hidden=false;S.zoomFrom=el;zoom.querySelector('.nz-x').focus({preventScroll:true});
}
function closeZoom(){
  if(!zoom||zoom.hidden)return false;
  zoom.hidden=true;if(S.zoomFrom)S.zoomFrom.focus&&S.zoomFrom.focus({preventScroll:true});S.zoomFrom=null;return true;
}
if(zoom){zoom.querySelector('.nz-x').addEventListener('click',closeZoom);zoom.addEventListener('click',e=>{if(e.target===zoom)closeZoom();});}
/* marca las notas cuyo texto no cabe, para enseñar "Leer más" */
function markOverflow(){
  layerDetail.querySelectorAll('.note').forEach(el=>{const t=el.querySelector('.note-text');if(t)el.classList.toggle('has-more',t.scrollHeight>t.clientHeight+2);});
}
/* Se repite al terminar la animación de entrada y al cargar las fuentes, porque en algunos móviles las medidas tardan en estar listas */
function markOverflowSoon(){
  requestAnimationFrame(markOverflow);setTimeout(markOverflow,700);
  if(document.fonts&&document.fonts.ready)document.fonts.ready.then(markOverflow);
}
/* Botón "Leer más": abre la nota ampliada con un toque (funciona igual con ratón, dedo o teclado) */
layerDetail.addEventListener('click',e=>{const b=e.target.closest('.note-more');if(b){e.stopPropagation();zoomNote(b.closest('.note'));}});


/* Coloca las piezas de la ficha. En móvil y pantallas táctiles la ficha se encoge si hace falta para caber entera */
function layoutDetail(){
  const k=kind(),c=k!=='d',st=k==='l'?STAGE_L:k==='m'?STAGE_M:STAGE_D;
  const touch=matchMedia('(pointer:coarse),(hover:none)').matches;
  const top0=k==='l'?116:c?122:84,bottom=k==='l'?14:(c||touch)?72:40;
  const left=k==='l'&&touch?140:20;   /* en horizontal se deja libre la esquina del botón "Activar tablero" */
  /* escala para que la ficha entera quepa en la pantalla (abajo se deja hueco para el botón del tablero) */
  const s=Math.min(k==='m'?1.5:k==='d'?1.3:1,(S.vw-left-20)/st.w,(S.vh-top0-bottom)/st.h);   /* la ficha siempre cabe; en pantallas grandes crece un poco */
  const ox=S.W/2-st.w*s/2+(left-20)/2,oy=S.H/2-st.h*s/2;
  layerDetail.querySelectorAll('.piece').forEach(el=>{
    const [x,y,,,r]=st.p[el.dataset.key];setPiece(el,ox+x*s,oy+y*s,r);el._p.s=s;el.style.transformOrigin='0 0';put(el);
  });
  const top=top0-oy;
  return {x:S.vw/2-S.W/2,y:c?top:Math.max(S.vh/2+24-S.H/2,top)};
}

/* ── Abrir y cerrar un proyecto ── */
/* Abre la ficha de un proyecto: guarda dónde estaba el tablero, construye la ficha y la centra */
function openProject(id,opener){
  if(S.mode==='detail')return;
  S.mode='detail';S.id=id;S.opener=opener||null;S.saved={x:S.px,y:S.py};
  buildDetail(id);const pan=layoutDetail();markOverflowSoon();
  layerBoard.classList.add('is-away');layerBoard.inert=true;
  layerDetail.inert=false;layerDetail.classList.add('is-on');
  backBtn.hidden=false;
  ease();setPan(pan.x,pan.y);
  backBtn.focus({preventScroll:true});
}
/* Cierra la ficha y vuelve al tablero donde estaba */
function closeProject(){
  if(closeZoom())return;   /* si hay una nota ampliada, primero se cierra esa */
  if(S.mode!=='detail')return;
  S.mode='board';
  layerDetail.classList.remove('is-on');layerDetail.inert=true;
  layerBoard.classList.remove('is-away');layerBoard.inert=false;
  backBtn.hidden=true;
  ease();setPan(S.saved.x,S.saved.y);
  const op=S.opener;S.opener=null;if(op)op.focus({preventScroll:true});
  setTimeout(()=>{if(S.mode==='board')layerDetail.innerHTML='';},320);
}
backBtn.addEventListener('click',closeProject);
/* Botón "Activar tablero" (solo táctil): permite o no desplazar el corcho con el dedo */
const panBtn=$('#pan-button');
if(panBtn)panBtn.addEventListener('click',()=>{
  S.pan=!S.pan;board.classList.toggle('is-pan-on',S.pan);panBtn.setAttribute('aria-pressed',S.pan);
  panBtn.textContent=S.pan?'Desactivar tablero':'Activar tablero';
});
/* La tecla Escape cierra la nota ampliada o la ficha */
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeProject();});

/* ── Motor del puntero: arrastrar el tablero, arrastrar piezas y distinguir un clic de un arrastre ── */
/* A guarda el arrastre en curso; THRESH es cuántos píxeles hay que mover para que cuente como arrastre */
let A=null,inertiaId=0,edgeId=0,edge={x:0,y:0};
const THRESH=e=>e.pointerType==='mouse'?5:14;   /* con el dedo hay más margen para que un toque no cuente como arrastre */

/* Al pulsar: se prepara para arrastrar una pieza o el tablero */
board.addEventListener('pointerdown',e=>{
  if(A||(e.pointerType==='mouse'&&e.button!==0))return;
  if(e.target.closest('button,a,video,.edge-scroll,.note-zoom'))return;
  cancelAnimationFrame(inertiaId);
  const el=e.target.closest('.piece:not(.is-static)');
  if(!el&&e.pointerType==='touch'&&!S.pan)return;   /* tablero sin activar: el dedo hace scroll de la página */
  const r=board.getBoundingClientRect();
  A={id:e.pointerId,sx:e.clientX,sy:e.clientY,x:e.clientX,y:e.clientY,moved:false,el,
     panX:S.px,panY:S.py,vx:0,vy:0,t:performance.now(),lt:0};
  if(el){
    const p=el._p;A.gx=e.clientX-r.left-S.px-p.x;A.gy=e.clientY-r.top-S.py-p.y;
    S.z+=1;el.style.zIndex=S.z;S.touched=true;
  }
  board.setPointerCapture(e.pointerId);
});

/* Al mover: arrastra la pieza o desplaza el tablero (calculando la velocidad para la inercia) */
board.addEventListener('pointermove',e=>{
  if(!A||e.pointerId!==A.id)return;
  A.x=e.clientX;A.y=e.clientY;
  if(!A.moved){
    if(Math.hypot(A.x-A.sx,A.y-A.sy)<THRESH(e))return;
    A.moved=true;
    if(A.el){A.el.classList.add('is-dragging');startEdge();}else board.classList.add('is-panning');
  }
  if(A.el){dropAt();return;}
  const now=performance.now(),dt=Math.max(1,now-A.t);
  const nx=A.panX+(A.x-A.sx),ny=A.panY+(A.y-A.sy);
  A.vx=.8*((nx-S.px)/dt)+.2*A.vx;A.vy=.8*((ny-S.py)/dt)+.2*A.vy;A.t=now;A.lt=now;
  setPan(nx,ny);
});

/* Al soltar: si no se movió es un clic (abre el proyecto o la acción de la pieza); si se lanzó el tablero, sigue con inercia */
function end(e,cancelled){
  if(!A||e.pointerId!==A.id)return;
  const a=A;A=null;
  try{board.releasePointerCapture(e.pointerId);}catch(_){}
  stopEdge();board.classList.remove('is-panning');
  if(a.el){
    a.el.classList.remove('is-dragging');
    if(!a.moved&&!cancelled){
      if(a.el.classList.contains('project-card'))openProject(a.el.dataset.project,a.el);
      else if(a.el._onClick)a.el._onClick();
    }
  }else if(a.moved&&!cancelled&&performance.now()-a.lt<70&&!reduceMQ.matches){fling(a.vx,a.vy);}
}
board.addEventListener('pointerup',e=>end(e,false));
board.addEventListener('pointercancel',e=>end(e,true));
board.addEventListener('dragstart',e=>e.preventDefault());

/* Mueve la pieza que se está arrastrando a la posición del puntero */
function dropAt(){
  const el=A.el,r=board.getBoundingClientRect();
  el._p.x=A.x-r.left-S.px-A.gx;el._p.y=A.y-r.top-S.py-A.gy;
  fit(el);put(el);
}
/* Mientras llevas una pieza, el tablero se desplaza solo si acercas el puntero a un borde */
function startEdge(){
  const zone=compact()?56:90,max=compact()?12:20;
  const tick=()=>{
    if(!A||!A.el)return;
    const r=board.getBoundingClientRect(),x=A.x-r.left,y=A.y-r.top;
    const f=(d)=>d<zone?(zone-Math.max(0,d))/zone:0;
    const vx=(f(S.vw-x)-f(x))*max,vy=(f(S.vh-y)-f(y))*max;
    if(vx||vy){const ox=S.px,oy=S.py;setPan(S.px-vx,S.py-vy);if(ox!==S.px||oy!==S.py)dropAt();}
    edgeId=requestAnimationFrame(tick);
  };
  edgeId=requestAnimationFrame(tick);
}
function stopEdge(){cancelAnimationFrame(edgeId);}
/* Inercia: el tablero sigue deslizándose y frena poco a poco */
function fling(vx,vy){
  let last=performance.now();
  const step=t=>{
    const dt=Math.min(32,t-last);last=t;
    setPan(S.px+vx*dt,S.py+vy*dt);
    const k=Math.pow(.94,dt/16);vx*=k;vy*=k;
    if(Math.hypot(vx,vy)>.03)inertiaId=requestAnimationFrame(step);
  };
  inertiaId=requestAnimationFrame(step);
}

/* La rueda del ratón o el trackpad encima del tablero tiene que hacer scroll de la página.
   Normalmente el navegador lo hace solo; esto solo actúa si el navegador se "come" la rueda
   (si no llegó a hacer scroll de verdad). */
let lastScroll=0,wheelAcc=0,wheelT0=0,wheelTimer=0;
addEventListener('scroll',()=>{lastScroll=performance.now();},{passive:true});
board.addEventListener('wheel',e=>{
  if(e.ctrlKey||A)return;
  if(!wheelAcc)wheelT0=performance.now();
  wheelAcc+=e.deltaY*(e.deltaMode===1?16:e.deltaMode===2?innerHeight:1);
  clearTimeout(wheelTimer);
  wheelTimer=setTimeout(()=>{
    const dy=wheelAcc;wheelAcc=0;
    const max=document.documentElement.scrollHeight-innerHeight;
    const canMove=(dy>0&&scrollY<max-1)||(dy<0&&scrollY>1);
    if(canMove&&lastScroll<wheelT0-100)window.scrollBy({top:dy,behavior:'instant'});
  },160);
},{passive:true});

/* Teclado: flechas para mover el tablero; Enter o espacio para abrir un proyecto o ampliar una nota */
board.addEventListener('keydown',e=>{
  if(e.target===board){
    const d={ArrowLeft:[80,0],ArrowRight:[-80,0],ArrowUp:[0,80],ArrowDown:[0,-80]}[e.key];
    if(d){e.preventDefault();ease();setPan(S.px+d[0],S.py+d[1]);}
  }
  const note=e.target.closest&&e.target.closest('.note[role="button"]');
  if(note&&e.target===note&&(e.key==='Enter'||e.key===' ')){e.preventDefault();zoomNote(note);}
  const card=e.target.closest&&e.target.closest('.project-card');
  if(card&&e.target===card&&(e.key==='Enter'||e.key===' ')){e.preventDefault();openProject(card.dataset.project,card);}
});

/* ── Arranque y cambios de tamaño de la ventana ── */
/* Al cargar: mide, coloca las tarjetas y centra el tablero */
function init(){
  measure();
  layerDetail.inert=true;
  const pan=layoutBoard();setPan(pan.x,pan.y);
}
/* Al cambiar el tamaño de la ventana (o girar el móvil) se recolocan las piezas */
let rz=0;
addEventListener('resize',()=>{
  cancelAnimationFrame(rz);
  rz=requestAnimationFrame(()=>{
    measure();
    if(kind()!==S.kind){   /* cambia la distribución (p. ej. al girar el móvil): se recoloca todo */
      S.kind=kind();
      const pb=layoutBoard();
      if(S.mode==='detail'){closeZoom();buildDetail(S.id);const pd=layoutDetail();markOverflowSoon();setPan(pd.x,pd.y);S.saved=pb;}else setPan(pb.x,pb.y);
      return;
    }
    setPan(S.px,S.py);
    world.querySelectorAll('.piece').forEach(el=>{if(el._p){fit(el);put(el);}});
  });
});
/* Cuando terminan de cargar las fuentes se recoloca el tablero (los tamaños pueden cambiar) */
if(document.fonts&&document.fonts.ready)document.fonts.ready.then(()=>{if(S.mode==='board'&&!S.touched){const pan=layoutBoard();setPan(pan.x,pan.y);}});
init();
})();

/* ═════════ SOBRE MÍ: nevera con pegatinas que se arrastran + ojos saltones ═════════
   Cada pegatina tiene data-name y data-why en index.html: data-why es el motivo que sale en la nota amarilla. */
(()=>{
  /* Pegatinas: se colocan en su sitio inicial y se pueden arrastrar dentro de la nevera */
  const f=document.getElementById('fridge'),why=document.getElementById('why');
  if(f){
    let z=10,A=null;
    const put=(s,x,y)=>{s.style.left=x+'%';s.style.top=y+'%';};
    /* Enseña el motivo de una pegatina en la nota amarilla, con un pequeño salto */
    const show=s=>{if(!why)return;const w=s.dataset.why,p=why.querySelector('p');
      why.querySelector('h4').textContent=s.dataset.name;p.textContent=w||'Por añadir.';p.classList.toggle('is-empty',!w);
      why.classList.remove('pop');void why.offsetWidth;why.classList.add('pop');};
    f.querySelectorAll('.stk').forEach(s=>{put(s,+s.dataset.x,+s.dataset.y);s.style.setProperty('--r',s.dataset.r+'deg');});
    /* Al pulsar una pegatina se coge (solo las que están en la nevera, no en una puerta abierta) */
    f.addEventListener('pointerdown',e=>{
      const s=e.target.closest('.stk');if(!s||s.parentElement!==f||(e.pointerType==='mouse'&&e.button))return;
      const b=f.getBoundingClientRect();
      A={s,sx:e.clientX,sy:e.clientY,gx:e.clientX-b.left-s.offsetLeft,gy:e.clientY-b.top-s.offsetTop};
      s.style.zIndex=++z;s.classList.add('is-dragging');s.setPointerCapture(e.pointerId);e.preventDefault();
    });
    /* Al mover se arrastra sin salirse de la nevera */
    f.addEventListener('pointermove',e=>{
      if(!A)return;const b=f.getBoundingClientRect(),s=A.s;
      const x=Math.min(b.width-s.offsetWidth,Math.max(0,e.clientX-b.left-A.gx)),y=Math.min(b.height-s.offsetHeight,Math.max(0,e.clientY-b.top-A.gy));
      put(s,x/b.width*100,y/b.height*100);
    });
    /* Al soltar: si casi no se movió, cuenta como clic y enseña el motivo */
    const up=e=>{if(!A)return;A.s.classList.remove('is-dragging');
      if(e.type==='pointerup'&&Math.hypot(e.clientX-A.sx,e.clientY-A.sy)<6)show(A.s);A=null;};   /* clic sin arrastrar = ver el motivo */
    f.addEventListener('pointerup',up);f.addEventListener('pointercancel',up);
    /* Con teclado: Enter enseña el motivo y las flechas mueven la pegatina */
    f.addEventListener('keydown',e=>{
      const s=e.target.closest('.stk');if(!s||s.parentElement!==f)return;
      if(e.key==='Enter'||e.key===' '){e.preventDefault();show(s);return;}
      const d={ArrowLeft:[-2,0],ArrowRight:[2,0],ArrowUp:[0,-2],ArrowDown:[0,2]}[e.key];if(!d)return;e.preventDefault();
      const b=f.getBoundingClientRect(),mx=100-s.offsetWidth/b.width*100,my=100-s.offsetHeight/b.height*100;
      put(s,Math.min(mx,Math.max(0,parseFloat(s.style.left)+d[0])),Math.min(my,Math.max(0,parseFloat(s.style.top)+d[1])));
    });
  }
  /* Ojos saltones: las pupilas siguen al cursor y al pulsarlos rebotan con gravedad */
  const box=document.getElementById('eyes');
  if(box&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
    const E=[...box.querySelectorAll('.eye')].map(e=>({e,b:e.querySelector('b'),x:0,y:0,vx:0,vy:0}));
    let mx=null,my=null,on=false,raf=0,free=0;
    /* Guarda la posición del cursor */
    addEventListener('pointermove',e=>{mx=e.clientX;my=e.clientY;},{passive:true});
    /* Bucle de animación: calcula hacia dónde mira cada pupila y la mantiene dentro del ojo */
    const loop=()=>{
      if(!on){raf=0;return;}
      const fr=performance.now()<free;
      E.forEach(p=>{
        const r=p.e.getBoundingClientRect(),R=r.width*.19;
        if(fr){p.vy+=r.width*.008;p.vx*=.993;p.x+=p.vx;p.y+=p.vy;}   /* tras el clic: gravedad y rebotes */
        else{
          let tx=0,ty=R*.78;   /* en reposo la pupila cae abajo */
          if(mx!==null){const dx=mx-(r.left+r.width/2),dy=my-(r.top+r.height/2),d=Math.hypot(dx,dy)||1,k=Math.min(1,d/(r.width*1.1));tx=dx/d*R*k;ty=dy/d*R*k;}
          p.vx=(p.vx+(tx-p.x)*.1)*.84;p.vy=(p.vy+(ty-p.y)*.1)*.84;p.x+=p.vx;p.y+=p.vy;
        }
        const d=Math.hypot(p.x,p.y);
        if(d>R){const nx=p.x/d,ny=p.y/d,vn=p.vx*nx+p.vy*ny;p.x=nx*R;p.y=ny*R;if(vn>0){const k=1+(fr?.78:.5);p.vx-=k*vn*nx;p.vy-=k*vn*ny;}}
        p.b.style.transform=`translate(${p.x}px,${p.y}px)`;
      });
      raf=requestAnimationFrame(loop);
    };
    /* La animación solo funciona cuando los ojos están en pantalla */
    new IntersectionObserver(es=>{on=es[0].isIntersecting;if(on&&!raf)raf=requestAnimationFrame(loop);}).observe(box);
    /* Al pulsar, las pupilas saltan y rebotan durante casi 2 segundos */
    box.addEventListener('click',()=>{
      const R=E[0].e.getBoundingClientRect().width*.19;
      E.forEach(p=>{p.vx=(Math.random()-.5)*R*.8;p.vy=-R*(.5+Math.random()*.25);});
      free=performance.now()+1800;
    });
  }
})();

/* ═════════ EASTER EGG · la nevera se abre y dentro está la galleta de la fortuna ═════════
   Las frases están en FORTUNES: añade, quita o cambia las que quieras. */
const FORTUNES=[
  'No es un bug, es una feature.',
  'Ha compilado a la primera. Sospechoso.',
  'El bug está en la línea que juraría que está bien.',
  'En mi ordenador funciona.',
  'Guarda a menudo. Haz commit todavía más a menudo.',
  'Solo una partida de prueba más.',
  'Ctrl+Z no va a arreglar esto, pero un picoteo sí.',
  'Lee el mensaje de error. Y luego léelo otra vez.',
  'Mi yo del futuro entenderá este código.',
  'Nunca hagas push un viernes.',
  '¿Has probado a apagarlo y volverlo a encender?',
  'Una funcionalidad más y lo dejo. Prometido.',
  'Si es absurdo pero funciona, se publica.'
];
/* Nevera (puerta de abajo) y galleta de la fortuna */
(()=>{
  const f=document.getElementById('fridge'),door=document.getElementById('fr-door'),front=document.getElementById('fr-front');
  const handle=document.getElementById('fr-handle'),back=document.getElementById('fr-back'),take=document.getElementById('fr-cookie');
  const dlg=document.getElementById('fortune-box'),ck=document.getElementById('fb-cookie'),txt=document.getElementById('fb-text'),track=document.getElementById('fb-track');
  if(!f||!door||!dlg)return;
  const TOP=42,H=58;   /* la puerta de abajo ocupa del 42% al 100% de la nevera */
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  let open=false;
  /* Abre o cierra la puerta de abajo */
  const setOpen=v=>{
    if(v===open)return;open=v;
    if(v){   /* las pegatinas que están sobre la puerta se van con ella */
      f.querySelectorAll(':scope > .stk').forEach(s=>{
        const y=parseFloat(s.style.top),cy=y+s.offsetHeight/f.offsetHeight*50;
        if(cy>TOP){s.style.top=(y-TOP)/H*100+'%';front.appendChild(s);}
      });
    }else{
      setTimeout(()=>{if(open)return;front.querySelectorAll('.stk').forEach(s=>{s.style.top=TOP+parseFloat(s.style.top)*H/100+'%';f.appendChild(s);});},reduce?0:850);
    }
    f.classList.toggle('is-open',v);
    handle.setAttribute('aria-expanded',v);handle.tabIndex=v?-1:0;back.tabIndex=take.tabIndex=v?0:-1;
    if(v)setTimeout(()=>take.focus({preventScroll:true}),reduce?0:500);else handle.focus({preventScroll:true});
  };
  /* Tirador: abre. Cara de dentro de la puerta: cierra. Escape: cierra */
  handle.addEventListener('click',()=>setOpen(true));
  back.addEventListener('click',()=>setOpen(false));
  f.addEventListener('keydown',e=>{if(e.key==='Escape'&&open&&!dlg.open)setOpen(false);});
  /* la primera vez que se ve la nevera, la puerta se entreabre un poquito: pista */
  if(!reduce)new IntersectionObserver((es,o)=>{if(es[0].isIntersecting){o.disconnect();setTimeout(()=>{door.classList.add('peek');door.addEventListener('animationend',()=>door.classList.remove('peek'),{once:true});},900);}},{threshold:.6}).observe(f);

  /* ── Galleta ── */
  /* Elige una frase al azar sin repetir la anterior */
  let last=-1,busy=false;
  const pick=()=>{let i;do{i=Math.floor(Math.random()*FORTUNES.length);}while(i===last&&FORTUNES.length>1);last=i;return FORTUNES[i];};
  /* El papelito es una cinta como la de CONTÁCTAME, pero solo con la frase actual repetida */
  const setPhrase=t=>{
    txt.textContent=t;
    const safe=t.replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));
    const half='<span>'+Array.from({length:4},()=>`<b>${safe}</b><i>✦</i>`).join('')+'</span>';
    track.innerHTML=half+half;
    const w=track.firstElementChild.offsetWidth;   /* velocidad constante (unos 200 px por segundo) sea cual sea la longitud de la frase */
    track.style.setProperty('--dur',(w?Math.max(8,w/200):Math.max(10,t.length*.55))+'s');
  };
  /* Abre la galleta: si ya estaba abierta, primero se cierra y luego se abre con otra frase */
  const crack=()=>{
    if(busy)return;busy=true;
    const go=()=>{setPhrase(pick());ck.classList.remove('wobble');void ck.offsetWidth;ck.classList.add('wobble');
      setTimeout(()=>{ck.classList.add('is-cracked');busy=false;},reduce?0:420);};
    if(ck.classList.contains('is-cracked')){ck.classList.remove('is-cracked');setTimeout(go,reduce?0:480);}else go();
  };
  /* Al coger la galleta de la nevera se abre la ventana; también se cierra con la X o pulsando fuera */
  take.addEventListener('click',()=>{ck.classList.remove('is-cracked');txt.textContent='';track.innerHTML='';dlg.showModal();document.documentElement.classList.add('fb-open');setTimeout(crack,reduce?0:350);});
  ck.addEventListener('click',crack);
  document.getElementById('fb-again').addEventListener('click',crack);
  document.getElementById('fb-close').addEventListener('click',()=>dlg.close());
  dlg.addEventListener('close',()=>document.documentElement.classList.remove('fb-open'));
  dlg.addEventListener('click',e=>{if(e.target===dlg)dlg.close();});
})();

/* ═════════ VARIOS: barra con desenfoque al bajar, plumbob para volver arriba, imágenes protegidas e interruptor de habilidades ═════════ */
(()=>{
  /* Al bajar: la barra se desenfoca y aparece el plumbob de volver arriba */
  const bar=document.querySelector('.topbar'),top=document.getElementById('to-top');
  const onScroll=()=>{const y=scrollY;bar.classList.toggle('is-scrolled',y>12);if(top)top.classList.toggle('is-on',y>innerHeight*.8);};
  addEventListener('scroll',onScroll,{passive:true});onScroll();
  /* Plumbob: vuelve al principio */
  if(top)top.addEventListener('click',()=>{scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});document.querySelector('.brand').focus({preventScroll:true});});
  /* nadie puede arrastrar las imágenes (a otra pestaña, a un buscador…) ni abrir su menú "buscar imagen" */
  document.addEventListener('dragstart',e=>{const t=e.target;if(t.tagName==='IMG'||(t.closest&&t.closest('a,svg,.project-cover')))e.preventDefault();});
  document.addEventListener('contextmenu',e=>{const t=e.target;if(t.tagName==='IMG'||(t.closest&&t.closest('.project-cover,.photo-img,.trailer-media')))e.preventDefault();});
  /* Interruptor de habilidades: cambia de panel y, en las personales, rellena las barras */
  const sw=document.querySelector('.sk-switch');
  if(sw){
    const tabs=[...sw.querySelectorAll('.sk-tab')],panels=tabs.map(t=>document.getElementById(t.getAttribute('aria-controls')));
    const list=document.querySelector('.sim-list');
    const fill=()=>list.querySelectorAll('.sim').forEach((s,row)=>{const lv=+getComputedStyle(s).getPropertyValue('--lv');
      s.querySelectorAll('.sim-bar i').forEach((p,n)=>{p.classList.remove('on');p.style.setProperty('--n',n);p.style.setProperty('--row',row);void p.offsetWidth;p.classList.toggle('on',n<lv);});});
    /* Muestra el panel k (0 = técnicas, 1 = personales) */
    const show=(k,focus)=>{
      tabs.forEach((t,i)=>{const on=i===k;t.classList.toggle('is-on',on);t.setAttribute('aria-selected',on);t.tabIndex=on?0:-1;
        panels[i].classList.toggle('is-on',on);panels[i].inert=!on;});
      sw.classList.toggle('is-soft',k===1);
      if(k===1)fill();
      if(focus)tabs[k].focus();
    };
    tabs.forEach((t,i)=>t.addEventListener('click',()=>show(i)));
    sw.addEventListener('keydown',e=>{const d={ArrowLeft:-1,ArrowRight:1}[e.key];if(!d)return;e.preventDefault();
      const k=(tabs.findIndex(t=>t.classList.contains('is-on'))+d+tabs.length)%tabs.length;show(k,true);});
  }
  /* sin recuadro de foco al usar ratón o dedo; con el teclado (Tab) vuelve a verse */
  const root=document.documentElement;
  addEventListener('pointerdown',()=>root.classList.add('is-pointer'),true);
  addEventListener('keydown',e=>{if(e.key==='Tab'||e.key.startsWith('Arrow'))root.classList.remove('is-pointer');},true);
})();

/* ═════════ EASTER EGG 2: el congelador, con "Funciones congeladas." y un bug congelado en un cubito ═════════ */
(()=>{
/* Mismo funcionamiento que la puerta de abajo; H es la altura del congelador en % de la nevera */
  const f=document.getElementById('fridge'),door=document.getElementById('fz-door'),front=document.getElementById('fz-front');
  const handle=document.getElementById('fz-handle'),back=document.getElementById('fz-back'),bug=document.getElementById('fz-bug'),bugs=[...document.querySelectorAll('.fz-bug')];
  if(!f||!door)return;
  const H=40.7,reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  let open=false;
  const setOpen=v=>{
    if(v===open)return;open=v;
    if(v){
      f.querySelectorAll(':scope > .stk').forEach(s=>{
        const y=parseFloat(s.style.top),cy=y+s.offsetHeight/f.offsetHeight*50;
        if(cy<H){s.style.top=y/H*100+'%';front.appendChild(s);}
      });
    }else{
      setTimeout(()=>{if(open)return;front.querySelectorAll('.stk').forEach(s=>{s.style.top=parseFloat(s.style.top)*H/100+'%';f.appendChild(s);});},reduce?0:850);
    }
    f.classList.toggle('is-frz',v);
    handle.setAttribute('aria-expanded',v);handle.tabIndex=v?-1:0;back.tabIndex=v?0:-1;bugs.forEach(b=>b.tabIndex=v?0:-1);
    if(v)setTimeout(()=>bug.focus({preventScroll:true}),reduce?0:500);else handle.focus({preventScroll:true});
  };
  handle.addEventListener('click',()=>setOpen(true));
  back.addEventListener('click',()=>setOpen(false));
  f.addEventListener('keydown',e=>{if(e.key==='Escape'&&open)setOpen(false);});
  /* Al pulsar el cubito, el bug intenta escaparse */
  bugs.forEach(b=>b.addEventListener('click',()=>{b.classList.remove('is-shaking');void b.offsetWidth;b.classList.add('is-shaking');}));
})();

/* ═════════ CONTACTO: avión de papel ═════════
   Al pulsarlo se echa hacia atrás, despega, hace un rizo y da la vuelta a toda la sección inclinándose en las curvas
   (con su sombra, que se separa del suelo al subir, y una estela que se desvanece) y aterriza donde estaba. */
(function(){
  const btn=document.getElementById('plane'),sec=document.getElementById('contact');
  if(!btn||!sec)return;
  const img=btn.querySelector('.plane-img'),RATIO=402/720,REST=-14,PI=Math.PI;
  let busy=false;
  const lerp=(a,b,t)=>a+(b-a)*t,sst=t=>t<=0?0:t>=1?1:t*t*(3-2*t),lim=(v,a,b)=>Math.min(b,Math.max(a,v));
  /* curva suave que pasa por todos los puntos (Catmull-Rom) */
  const cr=(a,b,c,d,t)=>{const t2=t*t,t3=t2*t;return [0,1].map(k=>.5*((2*b[k])+(-a[k]+c[k])*t+(2*a[k]-5*b[k]+4*c[k]-d[k])*t2+(-a[k]+3*b[k]-3*c[k]+d[k])*t3));};
  const spline=(w,out)=>{const e=[w[0],...w,w[w.length-1]];for(let i=1;i<e.length-2;i++)for(let k=0;k<26;k++)out.push(cr(e[i-1],e[i],e[i+1],e[i+2],k/26));};
  /* velocidad: arranca con calma, cruza rapido y frena al aterrizar. F(u) = parte del recorrido hecha en el instante u (0 a 1) */
  const F=(()=>{const n=400,t=[0];let s=0;for(let i=1;i<=n;i++){const u=i/n;s+=.1+.9*sst(u/.22)*(1-sst((u-.78)/.22));t.push(s);}return u=>{const x=lim(u,0,1)*n,i=Math.min(n-1,Math.floor(x));return (t[i]+(t[i+1]-t[i])*(x-i))/s;};})();
  /* Recorrido solo por la parte blanca visible (por debajo del letrero CONTÁCTAME): curvas amplias en S y, si hay sitio, dos rizos suaves.
     Todo se mide con el tamaño del avión en vuelo, para que en pantallas pequeñas no se vuelva loco. */
  const path=(sx,sy,L,R,T,B,fs)=>{
    const Hw=B-T,r=Math.max(fs*.7,Math.min(R-L,Hw)*.1),c=r*.6,loops=Hw>r*5.2&&R-L>r*7,by=Math.max(B-sy,fs*.6);
    const X=f=>L+f*(R-L),Y=f=>T+f*(B-T),ctr=[(L+R)/2,(T+B)/2],f2=lim((sx-L)/(R-L)-.34,.16,.5),lp=loops?1:0;
    /* [x, y, rizo] */
    const wp=[[sx,sy],[X(.9),Y(.2)],[X(.72),Y(.08)],[X(.52),Y(.2),lp],[X(.27),Y(.36)],[X(.1),Y(.58)],[X(.17),Y(.8)],[X(f2),Y(.9),lp],[X(f2+.16),Y(.86)],[sx-(R-L)*.1,sy+by*.5],[sx-(R-L)*.04,sy+by*.18],[sx,sy]];
    const p=[];let acc=[];
    const flush=()=>{if(acc.length>1)spline(acc,p);acc=[];};
    for(let i=0;i<wp.length;i++){
      const w=wp[i];
      if(!w[2]){acc.push([w[0],w[1]]);continue;}
      /* rizo: sigue la direccion del vuelo en ese punto y se curva hacia el centro de la zona */
      const a=wp[i-1],b=wp[i+1],dx=b[0]-a[0],dy=b[1]-a[1],dl=Math.hypot(dx,dy)||1,d=[dx/dl,dy/dl],n=[-d[1],d[0]];
      const apex=k=>Math.hypot(w[0]+n[0]*k*r*2-ctr[0],w[1]+n[1]*k*r*2-ctr[1]),sd=apex(1)<apex(-1)?1:-1,e=c*PI,g=e+r*1.6;
      acc.push([w[0]-d[0]*g,w[1]-d[1]*g],[w[0]-d[0]*e,w[1]-d[1]*e]);flush();
      for(let k=0;k<=90;k++){const t=-PI+2*PI*k/90,u=c*t-r*Math.sin(t),v=r*(1+Math.cos(t))*sd;p.push([w[0]+d[0]*u+n[0]*v,w[1]+d[1]*u+n[1]*v]);}
      acc.push([w[0]+d[0]*e,w[1]+d[1]*e],[w[0]+d[0]*g,w[1]+d[1]*g]);
    }
    flush();
    p.forEach(q=>{q[0]=lim(q[0],L,R);q[1]=lim(q[1],T,B);});   /* nunca se sale de la zona */
    return p;
  };
  btn.addEventListener('click',()=>{
    if(busy)return;busy=true;
    if(matchMedia('(prefers-reduced-motion:reduce)').matches){btn.classList.add('is-land');setTimeout(()=>{btn.classList.remove('is-land');busy=false;},800);return;}
    const s=sec.getBoundingClientRect(),r=img.getBoundingClientRect(),W=sec.clientWidth,H=sec.clientHeight,vh=window.innerHeight,vw0=window.innerWidth;
    const size0=Math.round(parseFloat(getComputedStyle(img).width)),sx=r.left-s.left+r.width/2,sy=r.top-s.top+r.height/2;
    /* en pantallas pequeñas vuela más pequeño (y vuelve a su tamaño al aterrizar) */
    const fs=Math.round(lim(Math.min(size0,W*.17,vh*.2),52,size0)),h=fs*RATIO,k0=size0/fs,m=Math.max(fs*.8,30);
    /* zona de vuelo: la parte blanca que se ve en pantalla; si es demasiado pequeña, toda la parte blanca */
    const mq=document.querySelector('#contact .marquee').getBoundingClientRect(),topMin=mq.bottom-s.top+fs*.55+6;
    let T=Math.max(topMin,-s.top+fs*.6),B=Math.min(H-m,vh-s.top-fs*.6);
    if(B-T<fs*2.6){T=topMin;B=H-m;}
    const pts=path(sx,sy,m,W-m,T,B,fs),N=pts.length,cum=[0];
    for(let i=1;i<N;i++)cum.push(cum[i-1]+Math.hypot(pts[i][0]-pts[i-1][0],pts[i][1]-pts[i-1][1]));
    const total=cum[N-1],dur=lim(total/.55,5400,9500),TA=380;
    /* rumbo y alabeo en cada punto (el avion se inclina hacia dentro de la curva) */
    const th=[];for(let i=0;i<N;i++){const a=pts[Math.max(0,i-1)],b=pts[Math.min(N-1,i+1)];let t=Math.atan2(b[1]-a[1],b[0]-a[0]);if(i)while(t-th[i-1]>PI)t-=2*PI;if(i)while(t-th[i-1]<-PI)t+=2*PI;th.push(t);}
    const kap=th.map((_,i)=>{const a=Math.max(0,i-4),b=Math.min(N-1,i+4);return (th[b]-th[a])/((cum[b]-cum[a])||1);});
    const roll=kap.map((_,i)=>{let sum=0,n=0;for(let j=Math.max(0,i-12);j<=Math.min(N-1,i+12);j++){sum+=kap[j];n++;}return lim(sum/n*fs*16,-38,38);});
    /* como un planeador: sube con esfuerzo (mas despacio) y gana velocidad al bajar */
    const tau=[0];for(let i=1;i<N;i++)tau.push(tau[i-1]+(cum[i]-cum[i-1])/(1+.3*Math.sin((th[i]+th[i-1])/2)));
    const tauT=tau[N-1],h0=th[4],rest=REST*PI/180;
    /* avion que vuela (dentro, la imagen se gira; fuera, la posicion y el tamano), su sombra en el suelo y el lienzo de la estela */
    const fly=document.createElement('div'),pic=document.createElement('img'),sh=document.createElement('div'),cv=document.createElement('canvas');
    const q=Math.max(.5,Math.min(window.devicePixelRatio||1,1400/Math.max(W,H),2));
    fly.className='plane-fly';fly.style.width=fs+'px';fly.style.height=h+'px';pic.src=img.currentSrc||img.src;pic.alt='';pic.draggable=false;fly.appendChild(pic);
    sh.className='plane-shadow';sh.style.width=fs*.9+'px';sh.style.height=fs*.2+'px';
    cv.className='plane-trail';cv.width=Math.round(W*q);cv.height=Math.round(H*q);cv.style.width=W+'px';cv.style.height=H+'px';
    const cx=cv.getContext('2d');cx.scale(q,q);
    sec.append(cv,sh,fly);btn.classList.add('is-flying');
    const ripple=()=>{const e=document.createElement('span');e.className='plane-ripple';btn.appendChild(e);e.addEventListener('animationend',()=>e.remove());};
    ripple();
    const put=(x,y,ang,rl,sc,alt)=>{
      fly.style.transform='translate('+(x-fs/2).toFixed(1)+'px,'+(y-h/2).toFixed(1)+'px) scale('+sc.toFixed(3)+')';
      pic.style.transform='rotate('+ang.toFixed(3)+'rad) scaleY('+Math.cos(rl*PI/180).toFixed(3)+')';   /* inclinarse = aplastarse un poco (sin 3D, para que se vea igual en todos los navegadores) */
      sh.style.transform='translate('+(x-fs*.45).toFixed(1)+'px,'+(y+fs*(.32+.7*alt)*sc-fs*.1).toFixed(1)+'px) scale('+(sc*(.9+.4*alt)).toFixed(3)+')';
      sh.style.opacity=(.55-.3*alt).toFixed(2);
    };
    /* reloj propio: si el movil se queda un momento sin respirar, la animacion no pega un salto */
    let el=0,last=performance.now(),idx=0,done=false;
    const end=()=>{if(done)return;done=true;window.removeEventListener('resize',onResize);fly.remove();sh.remove();cv.remove();btn.classList.remove('is-flying');btn.classList.add('is-land');ripple();setTimeout(()=>{btn.classList.remove('is-land');busy=false;},850);};
    const onResize=()=>{if(window.innerWidth!==vw0)end();};   /* si giras el movil o cambias el tamano de la ventana, aterriza sin mas */
    window.addEventListener('resize',onResize);
    const frame=()=>{
      if(done)return;
      const t=performance.now();el+=Math.min(t-last,50);last=t;
      const fl=Math.sin(el*.021)*.03+Math.sin(el*.0057)*.035;   /* aleteo del papel */
      if(el<TA){   /* se echa hacia atras para coger impulso */
        const e=1-Math.pow(1-el/TA,3);
        put(sx-18*e*Math.cos(h0),sy-18*e*Math.sin(h0),rest+(.35*e)+fl*.4,0,k0*(1-.1*e),0);
        requestAnimationFrame(frame);return;
      }
      const u=Math.min(1,(el-TA)/dur),tt=F(u)*tauT;
      while(idx<N-2&&tau[idx+1]<tt)idx++;
      const f=lim((tt-tau[idx])/((tau[idx+1]-tau[idx])||1),0,1),dist=lerp(cum[idx],cum[idx+1],f);
      let x=lerp(pts[idx][0],pts[idx+1][0],f),y=lerp(pts[idx][1],pts[idx+1][1],f);
      const kick=1-sst(u/.14);x-=18*kick*Math.cos(h0);y-=18*kick*Math.sin(h0);   /* el impulso del lanzamiento */
      let ang=lerp(th[idx],th[idx+1],f);
      const dA=(t)=>{let d=t-ang;while(d>PI)d-=2*PI;while(d<-PI)d+=2*PI;return d;};
      ang+=dA(rest)*((1-sst(u/.1))+sst((u-.9)/.1));   /* sale desde su postura de reposo y vuelve a ella al aterrizar */
      const alt=Math.pow(Math.sin(PI*u),.7),big=1-sst(u/.16)*(1-sst((u-.84)/.16)),sc=(1+(k0-1)*big)*(1+.3*alt);
      const rl=lerp(roll[idx],roll[idx+1],f)*(1-sst((u-.88)/.12))*sst(u/.08);
      put(x,y,ang+fl,rl,sc,alt);
      /* estela: puntitos que se desvanecen y se hacen mas pequenos hacia atras */
      cx.clearRect(0,0,W,H);const Lt=Math.min(560,total*.24),d0=Math.max(0,dist-Lt),dot=Math.max(.6,fs/60);
      for(let i=idx;i>=0&&cum[i]>=d0;i-=2){const a=1-(dist-cum[i])/Lt;if(a<=0)break;cx.globalAlpha=Math.pow(a,1.5)*.85;cx.fillStyle='#E57DB5';cx.beginPath();cx.arc(pts[i][0],pts[i][1],(.5+2.6*a)*dot,0,2*PI);cx.fill();}
      if(u<1){requestAnimationFrame(frame);return;}
      end();
    };
    requestAnimationFrame(frame);
  });
})();
