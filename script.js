/* ---------------- THEME ---------------- */
const THEMES = [
  { name:'sky',    accent:'#7dd3fc' },
  { name:'mint',   accent:'#6ee7b7' },
  { name:'rose',   accent:'#fda4af' },
  { name:'amber',  accent:'#fcd34d' },
  { name:'violet', accent:'#c4b5fd' },
];
function applyTheme(t){
  document.documentElement.style.setProperty('--accent', t.accent);
  document.documentElement.style.setProperty('--accent-soft', t.accent + '24');
}
function randomTheme(){ return THEMES[Math.floor(Math.random()*THEMES.length)]; }
applyTheme(randomTheme());

/* ---------------- DYNAMIC CSS INJECTION FOR GUN ---------------- */
const weaponStyle = document.createElement('style');
weaponStyle.innerHTML = `
  .armed, .armed * { cursor: crosshair !important; }
  .ascii-gun { 
    animation: float-gun 2s ease-in-out infinite; 
    font-weight: bold; 
    text-shadow: 0 0 8px var(--accent);
  }
  @keyframes float-gun { 
    0%, 100% { transform: translateY(0); } 
    50% { transform: translateY(-10px); } 
  }
`;
document.head.appendChild(weaponStyle);

/* ---------------- PIXEL FONT HERO ---------------- */
const FONT = {
' ':["00000","00000","00000","00000","00000","00000","00000"],
'A':["01110","10001","10001","11111","10001","10001","10001"],
'B':["11110","10001","10001","11110","10001","10001","11110"],
'E':["11111","10000","10000","11110","10000","10000","11111"],
'I':["11111","00100","00100","00100","00100","00100","11111"],
'J':["00111","00010","00010","00010","00010","10010","01100"],
'R':["11110","10001","10001","11110","10100","10010","10001"],
'S':["01111","10000","10000","01110","00001","00001","11110"],
'T':["11111","00100","00100","00100","00100","00100","00100"],
'V':["10001","10001","10001","10001","10001","01010","00100"],
'N':["10001","11001","10101","10101","10011","10001","10001"],
'O':["01110","10001","10001","10001","10001","10001","01110"],
'K':["10001","10010","10100","11000","10100","10010","10001"],
'L':["10000","10000","10000","10000","10000","10000","11111"],
'M':["10001","11011","10101","10101","10001","10001","10001"],
'D':["11100","10010","10001","10001","10001","10010","11100"],
'W':["10001","10001","10001","10101","10101","11011","10001"],
'H':["10001","10001","10001","11111","10001","10001","10001"],
'P':["11110","10001","10001","11110","10000","10000","10000"],
'C':["01111","10000","10000","10000","10000","10000","01111"],
'U':["10001","10001","10001","10001","10001","10001","01110"],
'G':["01111","10000","10000","10011","10001","10001","01110"],
'F':["11111","10000","10000","11110","10000","10000","10000"],
'Y':["10001","10001","01010","00100","00100","00100","00100"]
};
function isEdge(glyph, row, col){
  if(glyph[row][col] !== '1') return false;
  const h = glyph.length, w = glyph[0].length;
  const dirs = [[-1,0],[1,0],[0,-1],[0,1]];
  for(const [dr,dc] of dirs){
    const r = row+dr, c = col+dc;
    if(r<0 || r>=h || c<0 || c>=w) return true;
    if(glyph[r][c] !== '1') return true;
  }
  return false;
}
function pickChar(variant, edge, row, col, letterIdx){
  switch(variant){
    case 'shade':  return (row+col) % 2 === 0 ? '▓' : '▒';
    case 'sparse': return (row+col) % 2 === 0 ? '#' : ' ';
    case 'mixed': {
      const chars = ['#','@','%','$'];
      return chars[(row + col + letterIdx) % chars.length];
    }
    default: return '█';
  }
}
const VARIANTS = ['solid', 'shade', 'sparse', 'mixed'];
let variantIndex = 0;

function buildHeroAscii(name, variant){
  const letters = name.toUpperCase().split('');
  const scaleX = 2, scaleY = 2;
  const rows = Array.from({ length: 7*scaleY }, () => '');
  letters.forEach((ch, li) => {
    const glyph = FONT[ch] || FONT[' '];
    const w = glyph[0].length;
    for(let row=0; row<glyph.length; row++){
      for(let sy=0; sy<scaleY; sy++){
        let line = '';
        for(let col=0; col<w; col++){
          const bit = glyph[row][col] === '1';
          const c = bit ? pickChar(variant, isEdge(glyph,row,col), row, col, li) : ' ';
          line += c.repeat(scaleX);
        }
        rows[row*scaleY+sy] += line + '  ';
      }
    }
  });
  return rows.join('\n');
}
const heroEl = document.getElementById('hero-name');
function renderHero(){
  heroEl.innerHTML = '<pre>' + buildHeroAscii('RAVI TEJA S', VARIANTS[variantIndex]) + '</pre>';
}
renderHero();
heroEl.addEventListener('click', () => {
  applyTheme(randomTheme());
  variantIndex = (variantIndex + 1) % VARIANTS.length;
  renderHero();
});

/* ---------------- SCROLL: breadcrumb + progress ---------------- */
const sections = [...document.querySelectorAll('section')];
const crumb = document.getElementById('crumbPath');
const fill = document.getElementById('progFill');
const pct = document.getElementById('progPct');

function onScroll(){
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const p = docHeight > 0 ? Math.min(100, Math.round((scrollTop/docHeight)*100)) : 0;
  fill.style.width = p + '%';
  pct.textContent = p + '%';

  let current = sections[0];
  for(const s of sections){
    if(s.getBoundingClientRect().top < 140) current = s;
  }
  crumb.textContent = '› ' + current.id;
}
window.addEventListener('scroll', onScroll, { passive:true });
onScroll();

/* ---------------- ASCII PETS, WEAPONS, & CHAOTIC BEHAVIORS ---------------- */
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
window.addEventListener('mousemove', e => { 
  mouseX = e.clientX; 
  mouseY = e.clientY; 
});

function scrambleTextNode(el) {
  const chars = ['@','#','%','*','~','/','\\','&','?','}','{',']','['];
  const textNodes = [];
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null, false);
  let n;
  while(n = walker.nextNode()) {
    if(n.textContent.trim().length > 0) {
      textNodes.push({ node: n, original: n.textContent });
    }
  }
  let intId = setInterval(() => {
    textNodes.forEach(t => {
      t.node.textContent = t.original.split('').map(c => 
        c.match(/[a-zA-Z0-9]/) ? chars[Math.floor(Math.random()*chars.length)] : c
      ).join('');
    });
  }, 60);
  return {
     stop: () => {
       clearInterval(intId);
       textNodes.forEach(t => t.node.textContent = t.original);
     }
  };
}

const PET_SPECIES = [
  { art: ["(o.o)","c(\")(\")"], tip: "chaos awaits" },
  { art: ["[o  o]","|====|"," d  b "], tip: "click me if you dare" },
  { art: ["{0,0}","/)_)","-\"-\""], tip: "do not touch" },
  { art: ["(\\_/)","(o.o)"], tip: "i am unstable" },
];
const layer = document.getElementById('petLayer');

// Global System Variables
const activePets = []; 
let isSystemOffline = false;
let rebootBuffer = "";
let eatenItems = []; 
let triggerRestore = null; 

// Weapon System Variables
let isArmed = false;
let ammoCount = 0;

function spawnGun() {
  if (document.querySelectorAll('.ascii-gun').length > 1) return; // limit gun clutter
  
  const gun = document.createElement('div');
  gun.className = 'ascii-gun pet'; 
  gun.style.color = '#7dd3fc';
  gun.innerHTML = `<span class="tip">EQUIP</span>⌐╦╦═─`;
  gun.style.left = (Math.random() * (window.innerWidth - 100)) + 'px';
  gun.style.top = (100 + Math.random() * (window.innerHeight - 200)) + 'px';
  gun.style.position = 'fixed';
  gun.style.zIndex = '90';
  layer.appendChild(gun);
  
  gun.addEventListener('click', (e) => {
      e.stopPropagation();
      gun.remove();
      isArmed = true;
      ammoCount = 6;
      document.body.classList.add('armed');
      
      let ui = document.getElementById('ammo-counter');
      if(!ui) {
         ui = document.createElement('div');
         ui.id = 'ammo-counter';
         ui.style.position = 'fixed';
         ui.style.bottom = '40px';
         ui.style.left = '20px';
         ui.style.color = '#ff5f56';
         ui.style.fontFamily = "'JetBrains Mono', monospace";
         ui.style.fontWeight = 'bold';
         ui.style.fontSize = '12px';
         ui.style.zIndex = '1000';
         ui.style.pointerEvents = 'none';
         document.body.appendChild(ui);
      }
      ui.innerHTML = `[ ARMAMENT: ⌐╦╦═─ ${ammoCount}/6 ]<br><span style="color:var(--text-dimmer); font-size:10px;">CLICK ANYWHERE TO SHOOT</span>`;
  });
}

// Global Shooting Listener (Capture phase)
window.addEventListener('click', (e) => {
  if (isArmed) {
      if (e.target.closest('.ascii-gun')) return; // let them pickup new guns
      
      // Visual Bang
      const bang = document.createElement('div');
      bang.innerHTML = '<span style="color:#ffbd2e; font-size:18px;">💥</span>';
      bang.style.position = 'fixed';
      bang.style.left = e.clientX + 'px';
      bang.style.top = e.clientY + 'px';
      bang.style.pointerEvents = 'none';
      bang.style.zIndex = 9999;
      bang.style.transform = 'translate(-50%, -50%)';
      document.body.appendChild(bang);
      setTimeout(() => bang.remove(), 200);

      ammoCount--;
      const ui = document.getElementById('ammo-counter');
      if (ammoCount <= 0) {
          isArmed = false;
          document.body.classList.remove('armed');
          if(ui) ui.remove();
      } else {
          if(ui) ui.innerHTML = `[ ARMAMENT: ⌐╦╦═─ ${ammoCount}/6 ]<br><span style="color:var(--text-dimmer); font-size:10px;">CLICK TO FIRE</span>`;
      }
  }
}, true);


function spawnPet(x, y, species){
  const el = document.createElement('div');
  el.className = 'pet';
  el.style.left = x + 'px';
  el.style.top = y + 'px';
  el.innerHTML = `<span class="tip">${species.tip}</span>${species.art.join('\n')}`;
  layer.appendChild(el);

  let vx = (Math.random()-0.5) * 0.5;
  let vy = (Math.random()-0.5) * 0.5;
  let state = 'normal'; 
  let isRemoved = false; 
  
  const petData = {
    get x() { return x; },
    get y() { return y; },
    get state() { return state; },
    remove: () => {
       isRemoved = true;
       el.remove();
    },
    explode: () => {
      if (state === 'blasted') return;
      
      // If it was an active wormhole, cancel it and drop everything back!
      if (state === 'blackhole' || state === 'choking') {
         eatenItems.forEach(item => {
           item.el.style.transition = 'transform 0.5s, opacity 0.5s, filter 0.5s';
           item.el.style.transform = `translate(0px, 0px) scale(1) rotate(0deg)`;
           item.el.style.opacity = '1';
           item.el.style.filter = 'blur(0px)';
           if(item.scrambler) item.scrambler.stop();
           setTimeout(() => item.el.style.transition = item.originalTransition, 500); 
         });
         eatenItems = [];
      }
      
      state = 'blasted';
      el.style.transition = 'transform 0.2s, color 0.2s';
      el.style.transform = 'scale(1.5) rotate(15deg)';
      el.style.color = '#ff5f56';
      el.innerHTML = '<span style="font-size:16px; font-weight:700;">💥 K.O.</span>';
      setTimeout(() => {
         isRemoved = true;
         el.remove();
      }, 600);
      
      const idx = activePets.indexOf(petData);
      if (idx > -1) activePets.splice(idx, 1);
    }
  };
  activePets.push(petData);

  function drift(){
    if(isRemoved) return; 
    
    if (state === 'normal') {
      x += vx; y += vy;
      if(x <= 0) { x = 0; vx = Math.abs(vx); }
      else if(x >= window.innerWidth - 60) { x = window.innerWidth - 60; vx = -Math.abs(vx); }
      if(y <= 80) { y = 80; vy = Math.abs(vy); }
      else if(y >= window.innerHeight - 60) { y = window.innerHeight - 60; vy = -Math.abs(vy); }
    } 
    else if (state === 'chase') {
      const dxToMouse = mouseX - x - 20;
      const dyToMouse = mouseY - y - 20;
      const distToMouse = Math.sqrt(dxToMouse*dxToMouse + dyToMouse*dyToMouse);
      
      if(distToMouse > 0) {
         x += (dxToMouse/distToMouse) * 4.5;
         y += (dyToMouse/distToMouse) * 4.5;
      }
      
      // Pet Collision Engine
      for (let other of activePets) {
         if (other !== petData) {
            const dist = Math.hypot(x - other.x, y - other.y);
            if (dist < 40) {
               if (other.state === 'chase') {
                   petData.explode();
                   other.explode();
                   break;
               } 
               else if (other.state === 'blackhole' || other.state === 'choking') {
                   petData.explode();
                   break;
               }
            }
         }
      }
    } 

    el.style.left = x + 'px';
    el.style.top = y + 'px';
    if(state !== 'blasted' && state !== 'blackhole') {
       requestAnimationFrame(drift);
    }
  }
  requestAnimationFrame(drift);

  el.addEventListener('click', (e) => {
    e.stopPropagation();
    
    // Weapon Override: If user is armed, they execute the pet instantly.
    if (isArmed) {
       petData.explode();
       return; 
    }
    
    // Flyswatter (Direct smack kill if it's chasing you, even without gun)
    if (state === 'chase') {
       petData.explode();
       return;
    }
    
    // --- SPECIAL OWL LOGIC (WORMHOLE & REBOOT) ---
    if(species.tip === "do not touch") {
      if (state === 'normal') {
        state = 'blackhole';
        
        el.style.color = '#c4b5fd';
        el.innerHTML = `<div class="tornado-vortex">  \\~~~/\n  } @ {\n  /~~~\\</div><span class="tip" style="opacity:1; color:#c4b5fd">THE VOID</span>{0,0}\n/)_)\\\n-"-"-`;
        
        const targets = document.querySelectorAll('.prompt-line, #hero-name, .hero-role, .lede p, .links a, .section-label, .job-head, .job-desc, .job-link, .divider, .row, .about-text p, #portrait, .contact-row, footer');
        
        targets.forEach(target => {
           const rect = target.getBoundingClientRect();
           const petCenterX = x + el.offsetWidth/2;
           const petCenterY = y + el.offsetHeight/2;
           const targetCenterX = rect.left + rect.width/2;
           const targetCenterY = rect.top + rect.height/2;
           const dx = petCenterX - targetCenterX;
           const dy = petCenterY - targetCenterY;

           const itemObj = {
             el: target,
             originalTransition: target.style.transition || '',
             scrambler: null
           };
           eatenItems.push(itemObj);

           setTimeout(() => {
             itemObj.scrambler = scrambleTextNode(target);
             target.style.transition = 'transform 1.5s cubic-bezier(0.55, 0.085, 0.68, 0.53), opacity 1.5s, filter 1.5s';
             target.style.transform = `translate(${dx}px, ${dy}px) scale(0) rotate(1080deg)`;
             target.style.opacity = '0';
             target.style.filter = 'blur(8px)';
           }, Math.random() * 1500);
        });

        // Trigger Reboot Terminal after eating is done
        setTimeout(() => {
           // Verify it hasn't been shot before triggering reboot terminal
           if (state !== 'blackhole') return; 
           isSystemOffline = true;
           rebootBuffer = "";
           document.getElementById('reboot-input').textContent = "";
           document.getElementById('reboot-sys-msg').textContent = "SYSTEM OFFLINE. AWAITING COMMAND.";
           document.getElementById('reboot-terminal').style.display = 'block';
        }, 3000);

        triggerRestore = () => {
           el.innerHTML = `<span class="tip" style="opacity:1; color:#27c93f">SYSTEM REBOOTING...</span>{0_0}\n/)_)\\\n-"-"-`;
           el.style.color = '#27c93f';
           
           eatenItems.forEach(item => {
              setTimeout(() => {
                item.el.style.transition = 'transform 1s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 1s, filter 1s';
                item.el.style.transform = `translate(0px, 0px) scale(1) rotate(0deg)`;
                item.el.style.opacity = '1';
                item.el.style.filter = 'blur(0px)';
                
                setTimeout(() => {
                  if(item.scrambler) item.scrambler.stop();
                  item.el.style.transition = item.originalTransition;
                }, 1000); 
              }, Math.random() * 1000);
           });
           
           setTimeout(() => {
              state = 'normal';
              el.style.color = 'var(--text-dimmer)';
              el.innerHTML = `<span class="tip">${species.tip}</span>${species.art.join('\n')}`;
              eatenItems = [];
              requestAnimationFrame(drift); 
           }, 2500);
        };
      } 
      return; 
    }

    // --- OTHER PETS RANDOM LOGIC ---
    if(state !== 'normal') return;
    
    // Increased chase probability
    const behaviors = ['blast', 'chase', 'chase', 'bloat'];
    state = behaviors[Math.floor(Math.random() * behaviors.length)];

    if (state === 'blast') {
      el.innerHTML = '<span style="color:#ffbd2e; font-size:16px;">💥 BLAM!</span>';
      setTimeout(()=> petData.remove(), 500);
    } 
    else if (state === 'bloat') {
      el.style.transition = 'transform 2s ease-in, color 1s';
      el.style.color = '#ffbd2e';
      el.style.transform = 'scale(10)';
      el.innerHTML = `<span class="tip" style="opacity:1;">too full!</span>${species.art.join('\n')}`;
      setTimeout(() => {
        el.innerHTML = '<span style="color:#ff5f56; font-size:12px;">💥</span>';
        setTimeout(()=> petData.remove(), 300);
      }, 2000);
    } 
    else if (state === 'chase') {
      el.style.color = '#ff5f56';
      let angryArt = species.art.join('\n').replace(/o\.o/g, 'ò.ó').replace(/o  o/g, 'ò  ó').replace(/0,0/g, '>,<');
      el.innerHTML = `<span class="tip" style="opacity:1; color:#ff5f56">DESTROY!</span>${angryArt}`;
      // Drop a weapon to defend yourself
      spawnGun();
    } 
  });
}

function initPets(){
  PET_SPECIES.forEach(species => {
    const x = window.innerWidth * (0.1 + Math.random()*0.8);
    const y = 100 + Math.random() * (window.innerHeight - 200); 
    spawnPet(x, y, species);
  });
  for(let i=0; i<2; i++) {
     const species = PET_SPECIES[Math.floor(Math.random()*PET_SPECIES.length)];
     const x = window.innerWidth * (0.1 + Math.random()*0.8);
     const y = 100 + Math.random() * (window.innerHeight - 200); 
     spawnPet(x, y, species);
  }
}
window.addEventListener('load', initPets);

/* ---------------- TERMINAL REBOOT LISTENER & MATRIX EFFECT ---------------- */
document.addEventListener('keydown', (e) => {
  if (!isSystemOffline) return;
  
  const inputEl = document.getElementById('reboot-input');
  const sysMsg = document.getElementById('reboot-sys-msg');

  if (e.key === 'Backspace') {
    rebootBuffer = rebootBuffer.slice(0, -1);
    inputEl.textContent = rebootBuffer;
    sysMsg.textContent = "SYSTEM OFFLINE. AWAITING COMMAND.";
    sysMsg.style.color = "var(--text-dimmer)";
  } else if (e.key === 'Enter') {
    const cmd = rebootBuffer.trim().toLowerCase();
    if (cmd === 'reboot' || cmd === 'sudo restore') {
       isSystemOffline = false;
       document.getElementById('reboot-terminal').style.display = 'none';
       startMatrixReboot();
    } else {
       sysMsg.textContent = "COMMAND NOT RECOGNIZED. TRY 'reboot'";
       sysMsg.style.color = "#ff5f56";
       rebootBuffer = "";
       inputEl.textContent = "";
    }
  } else if (e.key.length === 1) { 
    if (rebootBuffer.length < 25) {
      rebootBuffer += e.key;
      inputEl.textContent = rebootBuffer;
      sysMsg.textContent = "SYSTEM OFFLINE. AWAITING COMMAND.";
      sysMsg.style.color = "var(--text-dimmer)";
    }
  }
});

function startMatrixReboot() {
  const canvas = document.getElementById('matrix-canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.display = 'block';
  canvas.style.opacity = '1';

  // WIPE MUTATED/DEAD PETS & WEAPONS
  for (let i = activePets.length - 1; i >= 0; i--) {
    const p = activePets[i];
    if (p.state !== 'blackhole' && p.state !== 'choking') {
       p.remove();
       activePets.splice(i, 1);
    }
  }
  document.querySelectorAll('.ascii-gun').forEach(g => g.remove());
  isArmed = false; 
  document.body.classList.remove('armed');
  const uiCounter = document.getElementById('ammo-counter');
  if(uiCounter) uiCounter.remove();

  // SPAWN FRESH PETS
  const petsToSpawn = 6 - activePets.length;
  for(let i = 0; i < petsToSpawn; i++) {
     const species = PET_SPECIES[Math.floor(Math.random()*PET_SPECIES.length)];
     const x = window.innerWidth * (0.1 + Math.random()*0.8);
     const y = 100 + Math.random() * (window.innerHeight - 200); 
     spawnPet(x, y, species);
  }

  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*'.split('');
  const fontSize = 14;
  const columns = canvas.width / fontSize;
  const drops = [];
  for(let i=0; i<columns; i++) drops[i] = 1;

  const rainInterval = setInterval(() => {
    ctx.fillStyle = 'rgba(10, 10, 12, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#27c93f';
    ctx.font = fontSize + 'px "JetBrains Mono", monospace';
    for(let i=0; i<drops.length; i++) {
      const text = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);
      if(drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    }
  }, 33);

  setTimeout(() => {
    if(triggerRestore) triggerRestore();
  }, 500);

  setTimeout(() => {
    canvas.style.opacity = '0';
    setTimeout(() => {
      clearInterval(rainInterval);
      canvas.style.display = 'none';
    }, 1500);
  }, 2500);
}

/* ---------------- BMSCE CREST TOGGLE ---------------- */
const BMSCE_LOGO = `                                                              ..:::::..  ..                                                        
                                               . .+@% ....  ..@%@%%%%%..      ..%%@#...                                            
                                              *@%%%%%@ ...   .%%%%%%%@@      .%%%%%%%%@                                            
                                   ...        @%%%%%%%%..    :%%%%%%%%@-    .@%%%%%%%@@        ..                                  
                                   :%:.       @%%%%%%%%@..  .+%%%%%%%@@#    .%%%%%%%%%@.       @@%+...                             
                              . @%@%%%@@....  .@%%%%%%%%@@%@%%%%%%%%%%%@%@@@@%%%%%%%%@:     =@%%%%@%@@                             
                               %%%%%%%%%@...  .%%%%%%%%%%%@%%%@@@@@@@@@@%%%%@%%%%%%%%@. ...+%%%%%%%%%%                             
                              ..%%%%%%%%%%@+@@%%%@@%+. ...................... .. +%%@%@@%%%%%%%%%%%%@                              
                               .@%@%%%%%%%%%%@@:.    ........:=.....=#=.. ........... .@%%%%%%%%%%%% .        .....                
                  .  =@@#  .  ...@%%%%%@@%-... ......:#..*..%*#...##...=+.*.....+#+........:@@%%%%%  .   .-@%%%%@. ...             
                   .%%%%%%@%...  %%@@@%.. ......#%...#..%##.#.....:#..:%.*-.: ..#...:%......   @%%%@.. .%%%%%%%%%@....             
                  @@%%%%%%%%%%@@@%@@..... :..=*..#:...####.............. .. ...#:...%%#:#....... .%@@%%%%%%%%%%%%%....             
                   #@%%%%%%%%%%%%:........#...%.=.#*:.  ...=*%%%%%%#%%@@%+.......=.#.=##.##=*#=. . .%%%%%%%%%%%%%% ..              
                   .=%%%%%%%%%@.....##..%#.###:....+@#####*###################*##%=......#.:#...+#... .@%%%%%@%# ..                
                     .#%%%%%@.......#=...#... .-%################################*####:..:%%%#.#+..* ...:@@@%@= .                  
           .......   . @%%%....-#.....%%:..-#**###########################################...%#.##:+.=.....%%%%  ...:@%@%%. ...    
          -@%%%%@%. . %@@:. ...#....#-...+**##############-*#+*:+-#:###:#%==..+**###########:..::.#:#=.=....@@%%@@%%%%%%%%%  ..    
       ..#@%%%%%%%%%%@@@........*##+..-*##**###**#####*****#***#**##*####*#####**##########=:##...#..%#:#%. ..@@%%%%%%%%%%@%%..    
       ..@@@%%%%%%%%%%@....... .....=%***********************************************###*:#:****@:.:#-.#..#....@%%%%%%%%%@@-..     
       .. =@%%%%%%@%@....#*....#...##***************************************************#:*******##...-#=#.@... .@%%%%@@%+.        
       ......%%%%%%%. ...%%*:%#..%***************************************************#:#:***********:..#....##....@%%%@...         
        .... ..+@%%.............****************************************************=###*************#..%#:#-%:....%%%.            
         ...  .+@%....##=..:...**************************************************####:*#***************...%...+*...-%%@  ...-+:..  
  . .@%%%%%%@%@@% ......#:...%*************************************************+*##%#*******************..-#...:*.  .%%%%%%%%%%%%#.
  ..@%%%%%%%%@%%% ..+##*#%*.#*************************************************#:*##+********************#+.%##=#+....#%@%%%%%%%%%%.
   @@%%%%%%%%%%%........%..-*****************************************#********###*#***********************.  *+###....%@%%%%%%%%@@-
  .%@@%%%%%%%%%%........*..#***********#***#*+*+**********************#:****####*******+%#*%**************%.+*........*@%%%%@%@%#  
     .:#@@%@%%@.  ##=%=#..**********%*******#**%********************:#:**=####******#**#*#**%**%***********=..#...#....%%%%....    
       .. .@%@-...+#%#%#.-#+***+%#**%*******#***++*#***************:###*:###%****%%*%**#*#**%**#+**%*+*****%.:*#%.#....@%% . ..    
       ...  %@  .........@*+%+*#*#**%*****+*#**********+*%*******:###=#*###:%++%****%**#*#**%**#****%******#...%% .....*%@@..      
         .-@%@......... .***%**#+#**%+****+*#++*****+*++++*****+:%######%#**#*+%+***%+*#*#**%+*#**+*%***++++-..........:@%@%@@%@@# 
..@@%%%%@@%%%@. .    ....+++%++#+#*+%+****+*#++**++*+*++++*+*+:#########:*+*%++%+**+%+*#+#++%**#*++*%++**++*# .  .......@%%%%%%%%%%
. %%%%%%%%%%%@ .....:....+++%++#+#++%++*++++#++*++++++++++++*:#########=++++%++%+**+%+*#+#++%++#++++%++**++*%... .:.....@%%%%%%%%%%
  %%%%%%%%%%@@. .:**##=..+++%++#+#++%+**++++#++*+++++*+++++:%########.*%++++%++%+**+%++#+#++%++#++++%++*++++%...+*##%...@%%%%%%%%@%
. @@%%@%%%%%@@. ..*#%:.. ***%**#*#**%*******%*******#***#*:%########-**%****#**%#***#*##*#**%**#****%********....##*... @%%%@@@@%@.
.  ..#@@@%%%%@. .. .... .###*#####**############*#*##*##*=########*+##*###*#*#########***####*#**#*###**####-......... :@%@..  ... 
.      .  . %@. .........@+++++++++++++++++++++++++++++=%########:+++++++++++++++++++++++*++++++++++++++++++. ....... .#%@-..      
 .          %@-.  ..... .=#++++++++++++++++++++++++++++###%#####=++++++++++++++++++++++++*+++++++++++++++++% ......  ..@%%@.. .    
     ...:@%%@@@...     ...==+++++++++++++++++++++++++##%%:*#%#-++++++++++++++++++++++++++*+++++++++++++++++:.......  . %%%%%%@@%#..
    .%%%%%%%%%%%..       ..*+++++++++++++++++++++++*###-++###=+++++++++++++++++++++++++++*++++++++++++++++%......  ...*@%%%%%%%%%%#
   #%%%%%%%%%%%@ ....    ...%%%%%%%%%%%%%%%%%%%%%####*%%%#%=%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%...... ..  .%@%%%%%%%%%@:
  . @%%%%%%%%%%%%          .%=+++++++++++++++++=###%:++=-#=++===============================++++++++++++**.....      #%%%%%%%%%%%%.
   ..@%%%%@%%@%@@:          .%*++++++++++****++%%%*****.**+****++*************************************+*. ...........@%*.. =*%%#-..
   ..  ... ....#%%           ..+++++++++++++=-%%=++==+++++=++++==++++++++++++++++++++++++++++++++++++++........  . -@@%... .  .. ..
     ...    .. .@@%-...    .....+++=======+-##.==+===++++++++++++++++++++++++++++++++++++++++++++++==#. ..........:@%%@.......   ..
              -@%%%@...     .....#========.%.+====================+=============++++================:..... ....   %%%%%%%%.....    
          . %%%%%%@%@:...   .......@-==--#========================================================@...    ..... .%@%%%%%%%@@...    
         .@%@@%%%%%%%@@. ...  .. .. =#=.#:=====================================================+%-.... ........@%%%%%%%%%%%%%..    
          %@%%%%%%%%%%%%.........%%#...@=====================================================*%....#.:#.....  @%%%%%%@%%%%@%-..    
          :@@%%%%@%%#%@%@- ... +%*#+.....*===================================================.. :#..###.....@%@*.. .:@%@%@%        
        ....*%=:.   ....%%@#....-:..##*.   .#%==========================================@....=*...%:....  *%%%%.........           
        ......  ........@%%@%.  ..+.##%..%%....+%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%@=.....-=.**..+*...=@%%%%%%+.......           
         ...     .   +@%%%%%%@%#.....+.=#.##-.=#.....%#=======================+%#........%:.#=#:#%....*@%%%%%%%%%% .....           
                  ..+@%%%%%%%%%%%:.....=..#-=#..-#.........+#%%#*++++*%%%#:... . ..+:.:+.-#.-+......@%%@@@%%%%%%%@@.....           
                  .:@%%%%%%%%%%@@@@@*. .....*#.+##.-##...#...::...................+%%.:+:*.......=%%@@..+@%%%%%%%%@:               
                  ..@@%%%%%%%.... +@%%%:.. . .-+..#*##..*:.%#..#*.#-#.#-............:*.:=.... .@%%%%-..... %%%@%%%.                
                  .....%%%=..... . %@%%%%@%=.... ....*.+#+.##..##.#*..##..................-%%@@%%%%%@  ..... ..:. .                
                       ......... +@%%%%%%%%%%%@-... .........#*...%.%.%%#........  ...:@@%@@@@@@@%%@@@ ............                
                                 %%%%%%%%%%@::*%%%%%%@*. ..... .............. -*@@@%%@@%:...%%@%%%%%%%% ...........                
                                *@%%%%%%%%#.  . %%%%%%%%%@@@%%%@@@@@@@@@%%%%@@@%%%%%%@%- . ..%@%%%%%%%@............                
                                .@%%%%%%% . ... %%%%%%%%%%+ .-@@%%@%%%%%%*...@%%%%%%%%%@ .  ...@@%%@%:. .......                    
                                .  .%%@. .  ...#%%%%%%%%%-     %%%%%%%%%@...  %%%%%%%%%%.   ... .:.. . ........                    
                                   ...        .#%%%%%%%@@......%%%%%%%%%*......@@%%%%%%@..       ...                               
                                              .-%%%%%%@=. .....@@%%%%%%%..     .@%%%%%@@.                                          
                                                . . .=.. .......@%%%%%%%....       .                                               
                                                  ..          ............                                                         
                                                               .........                                                           `;

(function(){
  const cell = document.getElementById('bmsceCell');
  if(!cell) return;
  const originalHTML = cell.innerHTML;
  let showingLogo = false;
  cell.addEventListener('click', () => {
    showingLogo = !showingLogo;
    cell.innerHTML = showingLogo
      ? `<pre class="bmsce-logo">${BMSCE_LOGO}</pre>`
      : originalHTML;
  });
})();

/* ---------------- INTERACTIVE DOT MATRIX PORTRAIT ---------------- */
(function initPortrait() {
  const imagePaths = ['1.png', '2.png', '3.png', '4.png', '5.png', '6.png', '7.png'];
  const DOT_SPACING = 4;      
  const MAX_DOT_SIZE = 2.2;   
  const BRIGHTNESS_THRESHOLD = 80; 

  const canvas = document.getElementById('portraitCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });

  let allFrameCoordinates = [];
  let activeFrameIndex = 3; 

  function loadImage(url) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(`Failed to load ${url}`);
      img.src = url;
    });
  }

  function extractPoints(image) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    const points = [];

    for (let y = 0; y < canvas.height; y += DOT_SPACING) {
      for (let x = 0; x < canvas.width; x += DOT_SPACING) {
        const index = (y * canvas.width + x) * 4;
        const alpha = imgData[index + 3];
        const brightness = (imgData[index] + imgData[index + 1] + imgData[index + 2]) / 3;

        if (alpha > 40 && brightness > BRIGHTNESS_THRESHOLD) {
          const dotRadius = (brightness / 255) * MAX_DOT_SIZE;
          if (dotRadius > 0.4) {
            points.push({ x: x, y: y, size: dotRadius });
          }
        }
      }
    }
    return points;
  }

  async function setup() {
    try {
      const loadedImages = await Promise.all(imagePaths.map(loadImage));
      allFrameCoordinates = loadedImages.map(img => extractPoints(img));
      renderFrame();
    } catch (err) {
      console.error(err);
    }
  }

  function updateFrameIndex(clientX) {
    let normalizedX = (clientX / window.innerWidth - 0.1) * 1.25; 
    normalizedX = Math.max(0, Math.min(1, normalizedX));
    activeFrameIndex = Math.floor(normalizedX * imagePaths.length);
    activeFrameIndex = Math.min(imagePaths.length - 1, activeFrameIndex);
    renderFrame();
  }

  window.addEventListener('mousemove', (e) => updateFrameIndex(e.clientX));
  window.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) updateFrameIndex(e.touches[0].clientX);
  });

  function renderFrame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Use the theme accent color dynamically
    const style = getComputedStyle(document.documentElement);
    const accentColor = style.getPropertyValue('--accent').trim() || '#7dd3fc';
    ctx.fillStyle = accentColor;

    const currentTargets = allFrameCoordinates[activeFrameIndex];
    if (!currentTargets) return;

    for (let i = 0; i < currentTargets.length; i++) {
      ctx.beginPath();
      ctx.arc(currentTargets[i].x, currentTargets[i].y, currentTargets[i].size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Listen for theme changes from your existing click handler to update portrait color
  document.getElementById('hero-name').addEventListener('click', () => {
    setTimeout(renderFrame, 50); // slight delay to allow CSS variable to update
  });

  setup();
})();