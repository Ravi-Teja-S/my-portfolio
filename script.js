// /* ---------------- THEME ---------------- */
// const THEMES = [
//   { name:'sky',    accent:'#7dd3fc' },
//   { name:'mint',   accent:'#6ee7b7' },
//   { name:'rose',   accent:'#fda4af' },
//   { name:'amber',  accent:'#fcd34d' },
//   { name:'violet', accent:'#c4b5fd' },
// ];
// function applyTheme(t){
//   document.documentElement.style.setProperty('--accent', t.accent);
//   document.documentElement.style.setProperty('--accent-soft', t.accent + '24');
// }
// function randomTheme(){ return THEMES[Math.floor(Math.random()*THEMES.length)]; }
// applyTheme(randomTheme());

// /* ---------------- DYNAMIC CSS INJECTION FOR GUN ---------------- */
// const weaponStyle = document.createElement('style');
// weaponStyle.innerHTML = `
//   .armed, .armed * { cursor: crosshair !important; }
//   .ascii-gun { 
//     animation: float-gun 2s ease-in-out infinite; 
//     font-weight: bold; 
//     text-shadow: 0 0 8px var(--accent);
//   }
//   @keyframes float-gun { 
//     0%, 100% { transform: translateY(0); } 
//     50% { transform: translateY(-10px); } 
//   }
// `;
// document.head.appendChild(weaponStyle);

// /* ---------------- PIXEL FONT HERO ---------------- */
// const FONT = {
// ' ':["00000","00000","00000","00000","00000","00000","00000"],
// 'A':["01110","10001","10001","11111","10001","10001","10001"],
// 'B':["11110","10001","10001","11110","10001","10001","11110"],
// 'E':["11111","10000","10000","11110","10000","10000","11111"],
// 'I':["11111","00100","00100","00100","00100","00100","11111"],
// 'J':["00111","00010","00010","00010","00010","10010","01100"],
// 'R':["11110","10001","10001","11110","10100","10010","10001"],
// 'S':["01111","10000","10000","01110","00001","00001","11110"],
// 'T':["11111","00100","00100","00100","00100","00100","00100"],
// 'V':["10001","10001","10001","10001","10001","01010","00100"],
// 'N':["10001","11001","10101","10101","10011","10001","10001"],
// 'O':["01110","10001","10001","10001","10001","10001","01110"],
// 'K':["10001","10010","10100","11000","10100","10010","10001"],
// 'L':["10000","10000","10000","10000","10000","10000","11111"],
// 'M':["10001","11011","10101","10101","10001","10001","10001"],
// 'D':["11100","10010","10001","10001","10001","10010","11100"],
// 'W':["10001","10001","10001","10101","10101","11011","10001"],
// 'H':["10001","10001","10001","11111","10001","10001","10001"],
// 'P':["11110","10001","10001","11110","10000","10000","10000"],
// 'C':["01111","10000","10000","10000","10000","10000","01111"],
// 'U':["10001","10001","10001","10001","10001","10001","01110"],
// 'G':["01111","10000","10000","10011","10001","10001","01110"],
// 'F':["11111","10000","10000","11110","10000","10000","10000"],
// 'Y':["10001","10001","01010","00100","00100","00100","00100"]
// };
// function isEdge(glyph, row, col){
//   if(glyph[row][col] !== '1') return false;
//   const h = glyph.length, w = glyph[0].length;
//   const dirs = [[-1,0],[1,0],[0,-1],[0,1]];
//   for(const [dr,dc] of dirs){
//     const r = row+dr, c = col+dc;
//     if(r<0 || r>=h || c<0 || c>=w) return true;
//     if(glyph[r][c] !== '1') return true;
//   }
//   return false;
// }
// function pickChar(variant, edge, row, col, letterIdx){
//   switch(variant){
//     case 'shade':  return (row+col) % 2 === 0 ? '▓' : '▒';
//     case 'sparse': return (row+col) % 2 === 0 ? '#' : ' ';
//     case 'mixed': {
//       const chars = ['#','@','%','$'];
//       return chars[(row + col + letterIdx) % chars.length];
//     }
//     default: return '█';
//   }
// }
// const VARIANTS = ['solid', 'shade', 'sparse', 'mixed'];
// let variantIndex = 0;

// function buildHeroAscii(name, variant){
//   const letters = name.toUpperCase().split('');
//   const scaleX = 2, scaleY = 2;
//   const rows = Array.from({ length: 7*scaleY }, () => '');
//   letters.forEach((ch, li) => {
//     const glyph = FONT[ch] || FONT[' '];
//     const w = glyph[0].length;
//     for(let row=0; row<glyph.length; row++){
//       for(let sy=0; sy<scaleY; sy++){
//         let line = '';
//         for(let col=0; col<w; col++){
//           const bit = glyph[row][col] === '1';
//           const c = bit ? pickChar(variant, isEdge(glyph,row,col), row, col, li) : ' ';
//           line += c.repeat(scaleX);
//         }
//         rows[row*scaleY+sy] += line + '  ';
//       }
//     }
//   });
//   return rows.join('\n');
// }
// const heroEl = document.getElementById('hero-name');
// function renderHero(){
//   heroEl.innerHTML = '<pre>' + buildHeroAscii('RAVI TEJA S', VARIANTS[variantIndex]) + '</pre>';
// }
// renderHero();
// heroEl.addEventListener('click', () => {
//   applyTheme(randomTheme());
//   variantIndex = (variantIndex + 1) % VARIANTS.length;
//   renderHero();
// });

// /* ---------------- SCROLL: breadcrumb + progress ---------------- */
// const sections = [...document.querySelectorAll('section')];
// const crumb = document.getElementById('crumbPath');
// const fill = document.getElementById('progFill');
// const pct = document.getElementById('progPct');

// function onScroll(){
//   const scrollTop = window.scrollY;
//   const docHeight = document.documentElement.scrollHeight - window.innerHeight;
//   const p = docHeight > 0 ? Math.min(100, Math.round((scrollTop/docHeight)*100)) : 0;
//   fill.style.width = p + '%';
//   pct.textContent = p + '%';

//   let current = sections[0];
//   for(const s of sections){
//     if(s.getBoundingClientRect().top < 140) current = s;
//   }
//   crumb.textContent = '› ' + current.id;
// }
// window.addEventListener('scroll', onScroll, { passive:true });
// onScroll();

// /* ---------------- ASCII PETS, WEAPONS, & CHAOTIC BEHAVIORS ---------------- */
// let mouseX = window.innerWidth / 2;
// let mouseY = window.innerHeight / 2;
// window.addEventListener('mousemove', e => { 
//   mouseX = e.clientX; 
//   mouseY = e.clientY; 
// });

// function scrambleTextNode(el) {
//   const chars = ['@','#','%','*','~','/','\\','&','?','}','{',']','['];
//   const textNodes = [];
//   const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null, false);
//   let n;
//   while(n = walker.nextNode()) {
//     if(n.textContent.trim().length > 0) {
//       textNodes.push({ node: n, original: n.textContent });
//     }
//   }
//   let intId = setInterval(() => {
//     textNodes.forEach(t => {
//       t.node.textContent = t.original.split('').map(c => 
//         c.match(/[a-zA-Z0-9]/) ? chars[Math.floor(Math.random()*chars.length)] : c
//       ).join('');
//     });
//   }, 60);
//   return {
//      stop: () => {
//        clearInterval(intId);
//        textNodes.forEach(t => t.node.textContent = t.original);
//      }
//   };
// }

// const PET_SPECIES = [
//   { art: ["(o.o)","c(\")(\")"], tip: "chaos awaits" },
//   { art: ["[o  o]","|====|"," d  b "], tip: "click me if you dare" },
//   { art: ["{0,0}","/)_)","-\"-\""], tip: "do not touch" },
//   { art: ["(\\_/)","(o.o)"], tip: "i am unstable" },
// ];
// const layer = document.getElementById('petLayer');

// // Global System Variables
// const activePets = []; 
// let isSystemOffline = false;
// let rebootBuffer = "";
// let eatenItems = []; 
// let triggerRestore = null; 

// // Weapon System Variables
// let isArmed = false;
// let ammoCount = 0;

// function spawnGun() {
//   if (document.querySelectorAll('.ascii-gun').length > 1) return; // limit gun clutter
  
//   const gun = document.createElement('div');
//   gun.className = 'ascii-gun pet'; 
//   gun.style.color = '#7dd3fc';
//   gun.innerHTML = `<span class="tip">EQUIP</span>⌐╦╦═─`;
//   gun.style.left = (Math.random() * (window.innerWidth - 100)) + 'px';
//   gun.style.top = (100 + Math.random() * (window.innerHeight - 200)) + 'px';
//   gun.style.position = 'fixed';
//   gun.style.zIndex = '90';
//   layer.appendChild(gun);
  
//   gun.addEventListener('click', (e) => {
//       e.stopPropagation();
//       gun.remove();
//       isArmed = true;
//       ammoCount = 6;
//       document.body.classList.add('armed');
      
//       let ui = document.getElementById('ammo-counter');
//       if(!ui) {
//          ui = document.createElement('div');
//          ui.id = 'ammo-counter';
//          ui.style.position = 'fixed';
//          ui.style.bottom = '40px';
//          ui.style.left = '20px';
//          ui.style.color = '#ff5f56';
//          ui.style.fontFamily = "'JetBrains Mono', monospace";
//          ui.style.fontWeight = 'bold';
//          ui.style.fontSize = '12px';
//          ui.style.zIndex = '1000';
//          ui.style.pointerEvents = 'none';
//          document.body.appendChild(ui);
//       }
//       ui.innerHTML = `[ ARMAMENT: ⌐╦╦═─ ${ammoCount}/6 ]<br><span style="color:var(--text-dimmer); font-size:10px;">CLICK ANYWHERE TO SHOOT</span>`;
//   });
// }

// // Global Shooting Listener (Capture phase)
// window.addEventListener('click', (e) => {
//   if (isArmed) {
//       if (e.target.closest('.ascii-gun')) return; // let them pickup new guns
      
//       // Visual Bang
//       const bang = document.createElement('div');
//       bang.innerHTML = '<span style="color:#ffbd2e; font-size:18px;">💥</span>';
//       bang.style.position = 'fixed';
//       bang.style.left = e.clientX + 'px';
//       bang.style.top = e.clientY + 'px';
//       bang.style.pointerEvents = 'none';
//       bang.style.zIndex = 9999;
//       bang.style.transform = 'translate(-50%, -50%)';
//       document.body.appendChild(bang);
//       setTimeout(() => bang.remove(), 200);

//       ammoCount--;
//       const ui = document.getElementById('ammo-counter');
//       if (ammoCount <= 0) {
//           isArmed = false;
//           document.body.classList.remove('armed');
//           if(ui) ui.remove();
//       } else {
//           if(ui) ui.innerHTML = `[ ARMAMENT: ⌐╦╦═─ ${ammoCount}/6 ]<br><span style="color:var(--text-dimmer); font-size:10px;">CLICK TO FIRE</span>`;
//       }
//   }
// }, true);


// function spawnPet(x, y, species){
//   const el = document.createElement('div');
//   el.className = 'pet';
//   el.style.left = x + 'px';
//   el.style.top = y + 'px';
//   el.innerHTML = `<span class="tip">${species.tip}</span>${species.art.join('\n')}`;
//   layer.appendChild(el);

//   let vx = (Math.random()-0.5) * 0.5;
//   let vy = (Math.random()-0.5) * 0.5;
//   let state = 'normal'; 
//   let isRemoved = false; 
  
//   const petData = {
//     get x() { return x; },
//     get y() { return y; },
//     get state() { return state; },
//     remove: () => {
//        isRemoved = true;
//        el.remove();
//     },
//     explode: () => {
//       if (state === 'blasted') return;
      
//       // If it was an active wormhole, cancel it and drop everything back!
//       if (state === 'blackhole' || state === 'choking') {
//          eatenItems.forEach(item => {
//            item.el.style.transition = 'transform 0.5s, opacity 0.5s, filter 0.5s';
//            item.el.style.transform = `translate(0px, 0px) scale(1) rotate(0deg)`;
//            item.el.style.opacity = '1';
//            item.el.style.filter = 'blur(0px)';
//            if(item.scrambler) item.scrambler.stop();
//            setTimeout(() => item.el.style.transition = item.originalTransition, 500); 
//          });
//          eatenItems = [];
//       }
      
//       state = 'blasted';
//       el.style.transition = 'transform 0.2s, color 0.2s';
//       el.style.transform = 'scale(1.5) rotate(15deg)';
//       el.style.color = '#ff5f56';
//       el.innerHTML = '<span style="font-size:16px; font-weight:700;">💥 K.O.</span>';
//       setTimeout(() => {
//          isRemoved = true;
//          el.remove();
//       }, 600);
      
//       const idx = activePets.indexOf(petData);
//       if (idx > -1) activePets.splice(idx, 1);
//     }
//   };
//   activePets.push(petData);

//   function drift(){
//     if(isRemoved) return; 
    
//     if (state === 'normal') {
//       x += vx; y += vy;
//       if(x <= 0) { x = 0; vx = Math.abs(vx); }
//       else if(x >= window.innerWidth - 60) { x = window.innerWidth - 60; vx = -Math.abs(vx); }
//       if(y <= 80) { y = 80; vy = Math.abs(vy); }
//       else if(y >= window.innerHeight - 60) { y = window.innerHeight - 60; vy = -Math.abs(vy); }
//     } 
//     else if (state === 'chase') {
//       const dxToMouse = mouseX - x - 20;
//       const dyToMouse = mouseY - y - 20;
//       const distToMouse = Math.sqrt(dxToMouse*dxToMouse + dyToMouse*dyToMouse);
      
//       if(distToMouse > 0) {
//          x += (dxToMouse/distToMouse) * 4.5;
//          y += (dyToMouse/distToMouse) * 4.5;
//       }
      
//       // Pet Collision Engine
//       for (let other of activePets) {
//          if (other !== petData) {
//             const dist = Math.hypot(x - other.x, y - other.y);
//             if (dist < 40) {
//                if (other.state === 'chase') {
//                    petData.explode();
//                    other.explode();
//                    break;
//                } 
//                else if (other.state === 'blackhole' || other.state === 'choking') {
//                    petData.explode();
//                    break;
//                }
//             }
//          }
//       }
//     } 

//     el.style.left = x + 'px';
//     el.style.top = y + 'px';
//     if(state !== 'blasted' && state !== 'blackhole') {
//        requestAnimationFrame(drift);
//     }
//   }
//   requestAnimationFrame(drift);

//   el.addEventListener('click', (e) => {
//     e.stopPropagation();
    
//     // Weapon Override: If user is armed, they execute the pet instantly.
//     if (isArmed) {
//        petData.explode();
//        return; 
//     }
    
//     // Flyswatter (Direct smack kill if it's chasing you, even without gun)
//     if (state === 'chase') {
//        petData.explode();
//        return;
//     }
    
//     // --- SPECIAL OWL LOGIC (WORMHOLE & REBOOT) ---
//     if(species.tip === "do not touch") {
//       if (state === 'normal') {
//         state = 'blackhole';
        
//         el.style.color = '#c4b5fd';
//         el.innerHTML = `<div class="tornado-vortex">  \\~~~/\n  } @ {\n  /~~~\\</div><span class="tip" style="opacity:1; color:#c4b5fd">THE VOID</span>{0,0}\n/)_)\\\n-"-"-`;
        
//         const targets = document.querySelectorAll('.prompt-line, #hero-name, .hero-role, .lede p, .links a, .section-label, .job-head, .job-desc, .job-link, .divider, .row, .about-text p, #portrait, .contact-row, footer');
        
//         targets.forEach(target => {
//            const rect = target.getBoundingClientRect();
//            const petCenterX = x + el.offsetWidth/2;
//            const petCenterY = y + el.offsetHeight/2;
//            const targetCenterX = rect.left + rect.width/2;
//            const targetCenterY = rect.top + rect.height/2;
//            const dx = petCenterX - targetCenterX;
//            const dy = petCenterY - targetCenterY;

//            const itemObj = {
//              el: target,
//              originalTransition: target.style.transition || '',
//              scrambler: null
//            };
//            eatenItems.push(itemObj);

//            setTimeout(() => {
//              itemObj.scrambler = scrambleTextNode(target);
//              target.style.transition = 'transform 1.5s cubic-bezier(0.55, 0.085, 0.68, 0.53), opacity 1.5s, filter 1.5s';
//              target.style.transform = `translate(${dx}px, ${dy}px) scale(0) rotate(1080deg)`;
//              target.style.opacity = '0';
//              target.style.filter = 'blur(8px)';
//            }, Math.random() * 1500);
//         });

//         // Trigger Reboot Terminal after eating is done
//         setTimeout(() => {
//            // Verify it hasn't been shot before triggering reboot terminal
//            if (state !== 'blackhole') return; 
//            isSystemOffline = true;
//            rebootBuffer = "";
//            document.getElementById('reboot-input').textContent = "";
//            document.getElementById('reboot-sys-msg').textContent = "SYSTEM OFFLINE. AWAITING COMMAND.";
//            document.getElementById('reboot-terminal').style.display = 'block';
//         }, 3000);

//         triggerRestore = () => {
//            el.innerHTML = `<span class="tip" style="opacity:1; color:#27c93f">SYSTEM REBOOTING...</span>{0_0}\n/)_)\\\n-"-"-`;
//            el.style.color = '#27c93f';
           
//            eatenItems.forEach(item => {
//               setTimeout(() => {
//                 item.el.style.transition = 'transform 1s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 1s, filter 1s';
//                 item.el.style.transform = `translate(0px, 0px) scale(1) rotate(0deg)`;
//                 item.el.style.opacity = '1';
//                 item.el.style.filter = 'blur(0px)';
                
//                 setTimeout(() => {
//                   if(item.scrambler) item.scrambler.stop();
//                   item.el.style.transition = item.originalTransition;
//                 }, 1000); 
//               }, Math.random() * 1000);
//            });
           
//            setTimeout(() => {
//               state = 'normal';
//               el.style.color = 'var(--text-dimmer)';
//               el.innerHTML = `<span class="tip">${species.tip}</span>${species.art.join('\n')}`;
//               eatenItems = [];
//               requestAnimationFrame(drift); 
//            }, 2500);
//         };
//       } 
//       return; 
//     }

//     // --- OTHER PETS RANDOM LOGIC ---
//     if(state !== 'normal') return;
    
//     // Increased chase probability
//     const behaviors = ['blast', 'chase', 'chase', 'bloat'];
//     state = behaviors[Math.floor(Math.random() * behaviors.length)];

//     if (state === 'blast') {
//       el.innerHTML = '<span style="color:#ffbd2e; font-size:16px;">💥 BLAM!</span>';
//       setTimeout(()=> petData.remove(), 500);
//     } 
//     else if (state === 'bloat') {
//       el.style.transition = 'transform 2s ease-in, color 1s';
//       el.style.color = '#ffbd2e';
//       el.style.transform = 'scale(10)';
//       el.innerHTML = `<span class="tip" style="opacity:1;">too full!</span>${species.art.join('\n')}`;
//       setTimeout(() => {
//         el.innerHTML = '<span style="color:#ff5f56; font-size:12px;">💥</span>';
//         setTimeout(()=> petData.remove(), 300);
//       }, 2000);
//     } 
//     else if (state === 'chase') {
//       el.style.color = '#ff5f56';
//       let angryArt = species.art.join('\n').replace(/o\.o/g, 'ò.ó').replace(/o  o/g, 'ò  ó').replace(/0,0/g, '>,<');
//       el.innerHTML = `<span class="tip" style="opacity:1; color:#ff5f56">DESTROY!</span>${angryArt}`;
//       // Drop a weapon to defend yourself
//       spawnGun();
//     } 
//   });
// }

// function initPets(){
//   PET_SPECIES.forEach(species => {
//     const x = window.innerWidth * (0.1 + Math.random()*0.8);
//     const y = 100 + Math.random() * (window.innerHeight - 200); 
//     spawnPet(x, y, species);
//   });
//   for(let i=0; i<2; i++) {
//      const species = PET_SPECIES[Math.floor(Math.random()*PET_SPECIES.length)];
//      const x = window.innerWidth * (0.1 + Math.random()*0.8);
//      const y = 100 + Math.random() * (window.innerHeight - 200); 
//      spawnPet(x, y, species);
//   }
// }
// window.addEventListener('load', initPets);

// /* ---------------- TERMINAL REBOOT LISTENER & MATRIX EFFECT ---------------- */
// document.addEventListener('keydown', (e) => {
//   if (!isSystemOffline) return;
  
//   const inputEl = document.getElementById('reboot-input');
//   const sysMsg = document.getElementById('reboot-sys-msg');

//   if (e.key === 'Backspace') {
//     rebootBuffer = rebootBuffer.slice(0, -1);
//     inputEl.textContent = rebootBuffer;
//     sysMsg.textContent = "SYSTEM OFFLINE. AWAITING COMMAND.";
//     sysMsg.style.color = "var(--text-dimmer)";
//   } else if (e.key === 'Enter') {
//     const cmd = rebootBuffer.trim().toLowerCase();
//     if (cmd === 'reboot' || cmd === 'sudo restore') {
//        isSystemOffline = false;
//        document.getElementById('reboot-terminal').style.display = 'none';
//        startMatrixReboot();
//     } else {
//        sysMsg.textContent = "COMMAND NOT RECOGNIZED. TRY 'reboot'";
//        sysMsg.style.color = "#ff5f56";
//        rebootBuffer = "";
//        inputEl.textContent = "";
//     }
//   } else if (e.key.length === 1) { 
//     if (rebootBuffer.length < 25) {
//       rebootBuffer += e.key;
//       inputEl.textContent = rebootBuffer;
//       sysMsg.textContent = "SYSTEM OFFLINE. AWAITING COMMAND.";
//       sysMsg.style.color = "var(--text-dimmer)";
//     }
//   }
// });

// function startMatrixReboot() {
//   const canvas = document.getElementById('matrix-canvas');
//   const ctx = canvas.getContext('2d');
//   canvas.width = window.innerWidth;
//   canvas.height = window.innerHeight;
//   canvas.style.display = 'block';
//   canvas.style.opacity = '1';

//   // WIPE MUTATED/DEAD PETS & WEAPONS
//   for (let i = activePets.length - 1; i >= 0; i--) {
//     const p = activePets[i];
//     if (p.state !== 'blackhole' && p.state !== 'choking') {
//        p.remove();
//        activePets.splice(i, 1);
//     }
//   }
//   document.querySelectorAll('.ascii-gun').forEach(g => g.remove());
//   isArmed = false; 
//   document.body.classList.remove('armed');
//   const uiCounter = document.getElementById('ammo-counter');
//   if(uiCounter) uiCounter.remove();

//   // SPAWN FRESH PETS
//   const petsToSpawn = 6 - activePets.length;
//   for(let i = 0; i < petsToSpawn; i++) {
//      const species = PET_SPECIES[Math.floor(Math.random()*PET_SPECIES.length)];
//      const x = window.innerWidth * (0.1 + Math.random()*0.8);
//      const y = 100 + Math.random() * (window.innerHeight - 200); 
//      spawnPet(x, y, species);
//   }

//   const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*'.split('');
//   const fontSize = 14;
//   const columns = canvas.width / fontSize;
//   const drops = [];
//   for(let i=0; i<columns; i++) drops[i] = 1;

//   const rainInterval = setInterval(() => {
//     ctx.fillStyle = 'rgba(10, 10, 12, 0.1)';
//     ctx.fillRect(0, 0, canvas.width, canvas.height);
//     ctx.fillStyle = '#27c93f';
//     ctx.font = fontSize + 'px "JetBrains Mono", monospace';
//     for(let i=0; i<drops.length; i++) {
//       const text = chars[Math.floor(Math.random() * chars.length)];
//       ctx.fillText(text, i * fontSize, drops[i] * fontSize);
//       if(drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
//       drops[i]++;
//     }
//   }, 33);

//   setTimeout(() => {
//     if(triggerRestore) triggerRestore();
//   }, 500);

//   setTimeout(() => {
//     canvas.style.opacity = '0';
//     setTimeout(() => {
//       clearInterval(rainInterval);
//       canvas.style.display = 'none';
//     }, 1500);
//   }, 2500);
// }

// /* ---------------- BMSCE CREST TOGGLE ---------------- */
// const BMSCE_LOGO = `                                                              ..:::::..  ..                                                        
//                                                . .+@% ....  ..@%@%%%%%..      ..%%@#...                                            
//                                               *@%%%%%@ ...   .%%%%%%%@@      .%%%%%%%%@                                            
//                                    ...        @%%%%%%%%..    :%%%%%%%%@-    .@%%%%%%%@@        ..                                  
//                                    :%:.       @%%%%%%%%@..  .+%%%%%%%@@#    .%%%%%%%%%@.       @@%+...                             
//                               . @%@%%%@@....  .@%%%%%%%%@@%@%%%%%%%%%%%@%@@@@%%%%%%%%@:     =@%%%%@%@@                             
//                                %%%%%%%%%@...  .%%%%%%%%%%%@%%%@@@@@@@@@@%%%%@%%%%%%%%@. ...+%%%%%%%%%%                             
//                               ..%%%%%%%%%%@+@@%%%@@%+. ...................... .. +%%@%@@%%%%%%%%%%%%@                              
//                                .@%@%%%%%%%%%%@@:.    ........:=.....=#=.. ........... .@%%%%%%%%%%%% .        .....                
//                   .  =@@#  .  ...@%%%%%@@%-... ......:#..*..%*#...##...=+.*.....+#+........:@@%%%%%  .   .-@%%%%@. ...             
//                    .%%%%%%@%...  %%@@@%.. ......#%...#..%##.#.....:#..:%.*-.: ..#...:%......   @%%%@.. .%%%%%%%%%@....             
//                   @@%%%%%%%%%%@@@%@@..... :..=*..#:...####.............. .. ...#:...%%#:#....... .%@@%%%%%%%%%%%%%....             
//                    #@%%%%%%%%%%%%:........#...%.=.#*:.  ...=*%%%%%%#%%@@%+.......=.#.=##.##=*#=. . .%%%%%%%%%%%%%% ..              
//                    .=%%%%%%%%%@.....##..%#.###:....+@#####*###################*##%=......#.:#...+#... .@%%%%%@%# ..                
//                      .#%%%%%@.......#=...#... .-%################################*####:..:%%%#.#+..* ...:@@@%@= .                  
//            .......   . @%%%....-#.....%%:..-#**###########################################...%#.##:+.=.....%%%%  ...:@%@%%. ...    
//           -@%%%%@%. . %@@:. ...#....#-...+**##############-*#+*:+-#:###:#%==..+**###########:..::.#:#=.=....@@%%@@%%%%%%%%%  ..    
//        ..#@%%%%%%%%%%@@@........*##+..-*##**###**#####*****#***#**##*####*#####**##########=:##...#..%#:#%. ..@@%%%%%%%%%%@%%..    
//        ..@@@%%%%%%%%%%@....... .....=%***********************************************###*:#:****@:.:#-.#..#....@%%%%%%%%%@@-..     
//        .. =@%%%%%%@%@....#*....#...##***************************************************#:*******##...-#=#.@... .@%%%%@@%+.        
//        ......%%%%%%%. ...%%*:%#..%***************************************************#:#:***********:..#....##....@%%%@...         
//         .... ..+@%%.............****************************************************=###*************#..%#:#-%:....%%%.            
//          ...  .+@%....##=..:...**************************************************####:*#***************...%...+*...-%%@  ...-+:..  
//   . .@%%%%%%@%@@% ......#:...%*************************************************+*##%#*******************..-#...:*.  .%%%%%%%%%%%%#.
//   ..@%%%%%%%%@%%% ..+##*#%*.#*************************************************#:*##+********************#+.%##=#+....#%@%%%%%%%%%%.
//    @@%%%%%%%%%%%........%..-*****************************************#********###*#***********************.  *+###....%@%%%%%%%%@@-
//   .%@@%%%%%%%%%%........*..#***********#***#*+*+**********************#:****####*******+%#*%**************%.+*........*@%%%%@%@%#  
//      .:#@@%@%%@.  ##=%=#..**********%*******#**%********************:#:**=####******#**#*#**%**%***********=..#...#....%%%%....    
//        .. .@%@-...+#%#%#.-#+***+%#**%*******#***++*#***************:###*:###%****%%*%**#*#**%**#+**%*+*****%.:*#%.#....@%% . ..    
//        ...  %@  .........@*+%+*#*#**%*****+*#**********+*%*******:###=#*###:%++%****%**#*#**%**#****%******#...%% .....*%@@..      
//          .-@%@......... .***%**#+#**%+****+*#++*****+*++++*****+:%######%#**#*+%+***%+*#*#**%+*#**+*%***++++-..........:@%@%@@%@@# 
// ..@@%%%%@@%%%@. .    ....+++%++#+#*+%+****+*#++**++*+*++++*+*+:#########:*+*%++%+**+%+*#+#++%**#*++*%++**++*# .  .......@%%%%%%%%%%
// . %%%%%%%%%%%@ .....:....+++%++#+#++%++*++++#++*++++++++++++*:#########=++++%++%+**+%+*#+#++%++#++++%++**++*%... .:.....@%%%%%%%%%%
//   %%%%%%%%%%@@. .:**##=..+++%++#+#++%+**++++#++*+++++*+++++:%########.*%++++%++%+**+%++#+#++%++#++++%++*++++%...+*##%...@%%%%%%%%@%
// . @@%%@%%%%%@@. ..*#%:.. ***%**#*#**%*******%*******#***#*:%########-**%****#**%#***#*##*#**%**#****%********....##*... @%%%@@@@%@.
// .  ..#@@@%%%%@. .. .... .###*#####**############*#*##*##*=########*+##*###*#*#########***####*#**#*###**####-......... :@%@..  ... 
// .      .  . %@. .........@+++++++++++++++++++++++++++++=%########:+++++++++++++++++++++++*++++++++++++++++++. ....... .#%@-..      
//  .          %@-.  ..... .=#++++++++++++++++++++++++++++###%#####=++++++++++++++++++++++++*+++++++++++++++++% ......  ..@%%@.. .    
//      ...:@%%@@@...     ...==+++++++++++++++++++++++++##%%:*#%#-++++++++++++++++++++++++++*+++++++++++++++++:.......  . %%%%%%@@%#..
//     .%%%%%%%%%%%..       ..*+++++++++++++++++++++++*###-++###=+++++++++++++++++++++++++++*++++++++++++++++%......  ...*@%%%%%%%%%%#
//    #%%%%%%%%%%%@ ....    ...%%%%%%%%%%%%%%%%%%%%%####*%%%#%=%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%...... ..  .%@%%%%%%%%%@:
//   . @%%%%%%%%%%%%          .%=+++++++++++++++++=###%:++=-#=++===============================++++++++++++**.....      #%%%%%%%%%%%%.
//    ..@%%%%@%%@%@@:          .%*++++++++++****++%%%*****.**+****++*************************************+*. ...........@%*.. =*%%#-..
//    ..  ... ....#%%           ..+++++++++++++=-%%=++==+++++=++++==++++++++++++++++++++++++++++++++++++++........  . -@@%... .  .. ..
//      ...    .. .@@%-...    .....+++=======+-##.==+===++++++++++++++++++++++++++++++++++++++++++++++==#. ..........:@%%@.......   ..
//               -@%%%@...     .....#========.%.+====================+=============++++================:..... ....   %%%%%%%%.....    
//           . %%%%%%@%@:...   .......@-==--#========================================================@...    ..... .%@%%%%%%%@@...    
//          .@%@@%%%%%%%@@. ...  .. .. =#=.#:=====================================================+%-.... ........@%%%%%%%%%%%%%..    
//           %@%%%%%%%%%%%%.........%%#...@=====================================================*%....#.:#.....  @%%%%%%@%%%%@%-..    
//           :@@%%%%@%%#%@%@- ... +%*#+.....*===================================================.. :#..###.....@%@*.. .:@%@%@%        
//         ....*%=:.   ....%%@#....-:..##*.   .#%==========================================@....=*...%:....  *%%%%.........           
//         ......  ........@%%@%.  ..+.##%..%%....+%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%@=.....-=.**..+*...=@%%%%%%+.......           
//          ...     .   +@%%%%%%@%#.....+.=#.##-.=#.....%#=======================+%#........%:.#=#:#%....*@%%%%%%%%%% .....           
//                   ..+@%%%%%%%%%%%:.....=..#-=#..-#.........+#%%#*++++*%%%#:... . ..+:.:+.-#.-+......@%%@@@%%%%%%%@@.....           
//                   .:@%%%%%%%%%%@@@@@*. .....*#.+##.-##...#...::...................+%%.:+:*.......=%%@@..+@%%%%%%%%@:               
//                   ..@@%%%%%%%.... +@%%%:.. . .-+..#*##..*:.%#..#*.#-#.#-............:*.:=.... .@%%%%-..... %%%@%%%.                
//                   .....%%%=..... . %@%%%%@%=.... ....*.+#+.##..##.#*..##..................-%%@@%%%%%@  ..... ..:. .                
//                        ......... +@%%%%%%%%%%%@-... .........#*...%.%.%%#........  ...:@@%@@@@@@@%%@@@ ............                
//                                  %%%%%%%%%%@::*%%%%%%@*. ..... .............. -*@@@%%@@%:...%%@%%%%%%%% ...........                
//                                 *@%%%%%%%%#.  . %%%%%%%%%@@@%%%@@@@@@@@@%%%%@@@%%%%%%@%- . ..%@%%%%%%%@............                
//                                 .@%%%%%%% . ... %%%%%%%%%%+ .-@@%%@%%%%%%*...@%%%%%%%%%@ .  ...@@%%@%:. .......                    
//                                 .  .%%@. .  ...#%%%%%%%%%-     %%%%%%%%%@...  %%%%%%%%%%.   ... .:.. . ........                    
//                                    ...        .#%%%%%%%@@......%%%%%%%%%*......@@%%%%%%@..       ...                               
//                                               .-%%%%%%@=. .....@@%%%%%%%..     .@%%%%%@@.                                          
//                                                 . . .=.. .......@%%%%%%%....       .                                               
//                                                   ..          ............                                                         
//                                                                .........                                                           `;

// (function(){
//   const cell = document.getElementById('bmsceCell');
//   if(!cell) return;
//   const originalHTML = cell.innerHTML;
//   let showingLogo = false;
//   cell.addEventListener('click', () => {
//     showingLogo = !showingLogo;
//     cell.innerHTML = showingLogo
//       ? `<pre class="bmsce-logo">${BMSCE_LOGO}</pre>`
//       : originalHTML;
//   });
// })();

// /* ---------------- INTERACTIVE DOT MATRIX PORTRAIT ---------------- */
// (function initPortrait() {
//   const imagePaths = ['1.png', '2.png', '3.png', '4.png', '5.png', '6.png', '7.png'];
//   const DOT_SPACING = 4;      
//   const MAX_DOT_SIZE = 2.2;   
//   const BRIGHTNESS_THRESHOLD = 80; 

//   const canvas = document.getElementById('portraitCanvas');
//   if (!canvas) return;
//   const ctx = canvas.getContext('2d', { willReadFrequently: true });

//   let allFrameCoordinates = [];
//   let activeFrameIndex = 3; 

//   function loadImage(url) {
//     return new Promise((resolve, reject) => {
//       const img = new Image();
//       img.onload = () => resolve(img);
//       img.onerror = () => reject(`Failed to load ${url}`);
//       img.src = url;
//     });
//   }

//   function extractPoints(image) {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    
//     const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
//     const points = [];

//     for (let y = 0; y < canvas.height; y += DOT_SPACING) {
//       for (let x = 0; x < canvas.width; x += DOT_SPACING) {
//         const index = (y * canvas.width + x) * 4;
//         const alpha = imgData[index + 3];
//         const brightness = (imgData[index] + imgData[index + 1] + imgData[index + 2]) / 3;

//         if (alpha > 40 && brightness > BRIGHTNESS_THRESHOLD) {
//           const dotRadius = (brightness / 255) * MAX_DOT_SIZE;
//           if (dotRadius > 0.4) {
//             points.push({ x: x, y: y, size: dotRadius });
//           }
//         }
//       }
//     }
//     return points;
//   }

//   async function setup() {
//     try {
//       const loadedImages = await Promise.all(imagePaths.map(loadImage));
//       allFrameCoordinates = loadedImages.map(img => extractPoints(img));
//       renderFrame();
//     } catch (err) {
//       console.error(err);
//     }
//   }

//   function updateFrameIndex(clientX) {
//     let normalizedX = (clientX / window.innerWidth - 0.1) * 1.25; 
//     normalizedX = Math.max(0, Math.min(1, normalizedX));
//     activeFrameIndex = Math.floor(normalizedX * imagePaths.length);
//     activeFrameIndex = Math.min(imagePaths.length - 1, activeFrameIndex);
//     renderFrame();
//   }

//   window.addEventListener('mousemove', (e) => updateFrameIndex(e.clientX));
//   window.addEventListener('touchmove', (e) => {
//     if (e.touches.length > 0) updateFrameIndex(e.touches[0].clientX);
//   });

//   function renderFrame() {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
    
//     // Use the theme accent color dynamically
//     const style = getComputedStyle(document.documentElement);
//     const accentColor = style.getPropertyValue('--accent').trim() || '#7dd3fc';
//     ctx.fillStyle = accentColor;

//     const currentTargets = allFrameCoordinates[activeFrameIndex];
//     if (!currentTargets) return;

//     for (let i = 0; i < currentTargets.length; i++) {
//       ctx.beginPath();
//       ctx.arc(currentTargets[i].x, currentTargets[i].y, currentTargets[i].size, 0, Math.PI * 2);
//       ctx.fill();
//     }
//   }

//   // Listen for theme changes from your existing click handler to update portrait color
//   document.getElementById('hero-name').addEventListener('click', () => {
//     setTimeout(renderFrame, 50); // slight delay to allow CSS variable to update
//   });

//   setup();
// })();

// /* ---------------- RTOS BOOT SEQUENCE ---------------- */
// (function initBootSequence() {
//   const bootScreen = document.getElementById('rtos-boot');
  
//   if (!bootScreen || sessionStorage.getItem('rtos_booted')) {
//     if (bootScreen) bootScreen.remove();
//     return;
//   }

//   document.body.classList.add('booting');
  
//   const logsContainer = document.getElementById('rtos-logs');
//   const mainScreen = document.getElementById('rtos-main');
//   const loadingWrapper = document.getElementById('rtos-loading-wrapper');

//   // Generator for fake memory addresses (e.g., 0xFA4B2C)
//   const generateHex = () => '0x' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0').toUpperCase();
  
//   const fastLogs = Array.from({length: 15}, () => `${generateHex()} ALLOCATING MEMORY SECTORS... OK`);
//   const slowLogs = [
//     "MOUNTING KERNEL... [SUCCESS]",
//     "ESTABLISHING NEURAL LINK... [SUCCESS]",
//     "DECRYPTING PAYLOAD...",
//     "LOADING RTOS CORE..."
//   ];

//   let logIndex = 0;
//   let isFastPhase = true;

//   function renderLog(text, color = "var(--text-dimmer)") {
//     const p = document.createElement('div');
//     p.style.color = color;
//     p.textContent = `[${generateHex()}] > ${text}`;
//     logsContainer.appendChild(p);
    
//     // Keep logs from running off the bottom of the screen
//     if (logsContainer.children.length > 20) {
//       logsContainer.removeChild(logsContainer.firstChild);
//     }
//   }

//   function bootLoop() {
//     if (isFastPhase) {
//       if (logIndex < fastLogs.length) {
//         renderLog(fastLogs[logIndex]);
//         logIndex++;
//         setTimeout(bootLoop, 30); // Very fast glitchy speed
//       } else {
//         isFastPhase = false;
//         logIndex = 0;
//         renderLog("--------------------------------", "var(--accent)");
//         setTimeout(bootLoop, 300);
//       }
//     } else {
//       if (logIndex < slowLogs.length) {
//         renderLog(slowLogs[logIndex], "var(--text-dim)");
//         logIndex++;
//         setTimeout(bootLoop, 200 + Math.random() * 400); // Slower, uneven speed
//       } else {
//         renderProgressBar();
//       }
//     }
//   }

//   // Draw the [████░░░░] ASCII progress bar
//   function renderProgressBar() {
//     let progress = 0;
//     const pBar = document.createElement('div');
//     pBar.style.color = "#27c93f";
//     pBar.style.marginTop = "15px";
//     logsContainer.appendChild(pBar);

//     const interval = setInterval(() => {
//       progress += Math.floor(Math.random() * 12) + 4;
//       if (progress > 100) progress = 100;
      
//       const filled = Math.floor(progress / 5); // 20 blocks total
//       const bar = '█'.repeat(filled) + '░'.repeat(20 - filled);
//       pBar.textContent = `SYSTEM BOOT: [${bar}] ${progress}%`;

//       if (progress === 100) {
//         clearInterval(interval);
//         setTimeout(() => {
//           loadingWrapper.style.display = 'none';
//           mainScreen.style.display = 'block';
//         }, 500);
//       }
//     }, 70);
//   }

//   // Start the animation
//   setTimeout(bootLoop, 400);

//   // Transition to main site
//   function exitBoot() {
//     bootScreen.style.opacity = '0';
//     document.body.classList.remove('booting');
//     sessionStorage.setItem('rtos_booted', 'true');
//     setTimeout(() => bootScreen.remove(), 800);
//   }

//   // Triggers for exit
//   document.addEventListener('keydown', (e) => {
//     if (e.key === 'Enter' && mainScreen.style.display === 'block') exitBoot();
//   });
//   bootScreen.addEventListener('click', () => {
//     if (mainScreen.style.display === 'block') exitBoot();
//   });
// })();


// /* ---------------- CUSTOM CURSOR TRACKING ---------------- */
// (function initCustomCursor() {
//   const cursor = document.getElementById('custom-cursor');
//   const cursorTrail = document.getElementById('custom-cursor-trail');

//   // Prevent errors if running on mobile where we hide it
//   if (!cursor || !cursorTrail) return;

//   // Track mouse movement
//   window.addEventListener('mousemove', (e) => {
//     // Inner dot follows instantly
//     cursor.style.left = `${e.clientX}px`;
//     cursor.style.top = `${e.clientY}px`;
    
//     // Outer ring follows with the CSS transition delay
//     cursorTrail.style.left = `${e.clientX}px`;
//     cursorTrail.style.top = `${e.clientY}px`;
//   });

//   // Array of selectors that should trigger the hover animation
//   const interactiveSelectors = [
//     'a', 
//     'mark', 
//     '#hero-name', 
//     '.job-cell', 
//     '.edu-cell', 
//     '.reload', 
//     '.rtos-char', 
//     '.boot-prompt',
//     '.pet',
//     '.ascii-gun'
//   ];

//   // Add the hovering class to the body when over interactives
//   const interactives = document.querySelectorAll(interactiveSelectors.join(', '));
  
//   interactives.forEach(el => {
//     el.addEventListener('mouseenter', () => {
//       document.body.classList.add('hovering');
//     });
//     el.addEventListener('mouseleave', () => {
//       document.body.classList.remove('hovering');
//     });
//   });
// })();



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
  
  /* --- CHALK TARGET BLOCK --- */
  .armed .pet {
    transition: outline 0.1s, background 0.1s, box-shadow 0.1s;
  }
  .armed .pet:hover {
    outline: 2px dashed #ff5f56;
    outline-offset: 6px;
    background-color: rgba(255, 95, 86, 0.15);
    border-radius: 2px;
    box-shadow: inset 0 0 10px rgba(255, 95, 86, 0.3), 0 0 15px rgba(255, 95, 86, 0.5);
  }
  .armed .pet:hover::after {
    content: '[ LOCKED ]';
    position: absolute;
    bottom: -22px;
    left: 50%;
    transform: translateX(-50%);
    color: #ff5f56;
    font-size: 10px;
    font-weight: bold;
    letter-spacing: 2px;
    white-space: nowrap;
    animation: boot-blink 0.5s step-end infinite;
  }

  /* --- RECOIL VIBRATION FORCE --- */
  @keyframes screen-recoil {
    0% { transform: translate(0, 0) rotate(0deg); filter: contrast(100%) brightness(1); }
    20% { transform: translate(-12px, 12px) rotate(-1.5deg); filter: contrast(140%) brightness(1.2); }
    40% { transform: translate(12px, -12px) rotate(1.5deg); filter: contrast(100%) brightness(1); }
    60% { transform: translate(-6px, 6px) rotate(-0.5deg); }
    80% { transform: translate(6px, -6px) rotate(0.5deg); }
    100% { transform: translate(0, 0) rotate(0deg); filter: contrast(100%) brightness(1); }
  }
  
  body.recoil .wrap, 
  body.recoil .topbar,
  body.recoil .pet-layer {
    animation: screen-recoil 0.25s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
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
'J':["00111","00010","00010","00100","00010","10010","01100"],
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
      
      // --- TRIGGER RECOIL VIBRATION ---
      document.body.classList.remove('recoil');
      void document.body.offsetWidth; // Force CSS reflow to restart animation instantly on rapid clicks
      document.body.classList.add('recoil');
      setTimeout(() => document.body.classList.remove('recoil'), 250);
      
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
      state = 'blasted';
      
      // Stop moving
      vx = 0; vy = 0;
      el.style.transition = 'none'; // Sharp, glitchy frame changes
      
      const asciiBlast = [
        `\n  *  \n`,
        `\\ | /\n- O -\n/ | \\`,
        `* # *\n# @ #\n* # *`,
        ` . . \n.   .\n . . `
      ];
      
      let frame = 0;
      el.style.color = '#ffbd2e'; // Start explosion yellow
      
      const blastInterval = setInterval(() => {
        if (frame < asciiBlast.length) {
          if (frame === 1) el.style.color = '#ff5f56'; // Turn red
          if (frame === 3) el.style.color = 'var(--text-dimmer)'; // Fade out to grey
          
          el.innerHTML = `<span style="font-size:14px; font-weight:bold;">${asciiBlast[frame]}</span>`;
          frame++;
        } else {
          clearInterval(blastInterval);
          isRemoved = true;
          el.remove();
          const idx = activePets.indexOf(petData);
          if (idx > -1) activePets.splice(idx, 1);
        }
      }, 120); // 120ms per frame
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

    // --- UNSTABLE ANIMAL LOGIC (MELTDOWN) ---
    if (species.tip === "i am unstable") {
      if (state === 'normal') {
        state = 'meltdown';
        el.style.color = '#ffbd2e';
        
        // Pre-drawn frames to make the rabbit get bigger and wilder cleanly
        const wildFrames = [
          [ // Frame 1: Agitated & Swelling
            " (\\___/) ",
            " ( ò_ó ) ",
            " />   <\\"
          ],
          [ // Frame 2: Feral & Large
            "  |\\____/|  ",
            " / @    @ \\ ",
            " |  \\__/  | ",
            "  \\______/  "
          ],
          [ // Frame 3: Absolute Monster
            "   |\\______/|   ",
            "  / #      # \\  ",
            "  |  VVVVVV  |  ",
            "  |  ^^^^^^  |  ",
            "   \\________/   "
          ]
        ];
        
        let frameIdx = 0;
        let ticks = 0;

        const jitter = setInterval(() => {
          // Violent Jitter
          el.style.transform = `translate(${(Math.random()-0.5)*14}px, ${(Math.random()-0.5)*14}px)`;
          
          // Evolve to the next larger ASCII frame every 400ms (8 ticks)
          if (ticks % 8 === 0 && frameIdx < wildFrames.length) {
            el.innerHTML = `<span class="tip" style="opacity:1; color:#ffbd2e">MELTDOWN!</span>${wildFrames[frameIdx].join('\n')}`;
            // Turn it aggressive red on the final monstrous frame
            if (frameIdx === 2) el.style.color = '#ff5f56'; 
            frameIdx++;
          }
          ticks++;
        }, 50);

        // Trigger the ASCII explosion after 1.5 seconds
        setTimeout(() => {
          clearInterval(jitter);
          el.style.transform = 'none'; // Reset transform before exploding
          petData.explode();
        }, 1500);
      }
      return;
    }


    // --- SPECIAL OWL LOGIC (WORMHOLE & REBOOT) ---
    if(species.tip === "do not touch") {
      if (state === 'normal') {
        state = 'blackhole';
        
        el.style.color = '#c4b5fd';
        el.innerHTML = `<div class="tornado-vortex">  \\~~~/\n  } @ {\n  /~~~\\</div><span class="tip" style="opacity:1; color:#c4b5fd">THE VOID</span>{0,0}\n/)_)\\\n-"-"-`;
        
        const targets = document.querySelectorAll('.prompt-line, .history-line, .history-output, #hero-name, .hero-role, .lede p, .links a, .section-label, .job-head, .job-desc, .job-link, .divider, .row, .about-text p, #portrait, .contact-row, footer');        
       
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
           // We removed the 'if (state !== blackhole)' check so the terminal always opens!
           isSystemOffline = true;
           rebootBuffer = "";
           document.getElementById('reboot-input').textContent = "";
           document.getElementById('reboot-sys-msg').textContent = "SYSTEM OFFLINE. AWAITING COMMAND.";
           document.getElementById('reboot-terminal').style.display = 'block';
        }, 3000);

        triggerRestore = () => {
           // Only show reviving text on the owl if it hasn't been shot/removed
           if (!isRemoved) {
             el.innerHTML = `<span class="tip" style="opacity:1; color:#27c93f">SYSTEM REBOOTING...</span>{0_0}\n/)_)\\\n-"-"-`;
             el.style.color = '#27c93f';
           }
           
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
              // Only put the owl back to normal state if it wasn't shot
              if (!isRemoved) {
                state = 'normal';
                el.style.color = 'var(--text-dimmer)';
                el.innerHTML = `<span class="tip">${species.tip}</span>${species.art.join('\n')}`;
                requestAnimationFrame(drift); 
              }
              eatenItems = [];
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
      petData.explode();
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

/* ---------------- INSTITUTION CREST TOGGLES (FETCH API) ---------------- */
(function() {
  function initAsciiToggle(cellId, textFilePath, logoClassName) {
    const cell = document.getElementById(cellId);
    if (!cell) return;
    
    // Find the exact text element we want to hide/show
    const titleDiv = cell.querySelector('.what');
    if (!titleDiv) return;

    // Create the logo container dynamically
    const logoEl = document.createElement('pre');
    logoEl.className = logoClassName;
    logoEl.style.display = 'none'; // Hidden by default
    logoEl.textContent = '[ DOWNLOADING PROTOCOL... ]'; // Retro loading message
    
    // Insert the logo right before the title text inside the cell
    cell.insertBefore(logoEl, titleDiv);
    
    let showingLogo = false;
    let isLoaded = false;

    cell.addEventListener('click', async () => {
      showingLogo = !showingLogo;
      
      // Cleanly swap visibility
      if (showingLogo) {
        titleDiv.style.display = 'none';
        logoEl.style.display = 'block';

        // Fetch the ASCII art ONLY the first time they click
        if (!isLoaded) {
          try {
            // Add a tiny artificial delay for that "hacker loading" feel (optional)
            await new Promise(resolve => setTimeout(resolve, 300)); 
            
            const response = await fetch(textFilePath);
            if (!response.ok) throw new Error('File missing');
            
            const asciiText = await response.text();
            logoEl.textContent = asciiText;
            isLoaded = true;
          } catch (error) {
            logoEl.textContent = '[ ERROR: DATA CORRUPTED OR MISSING ]';
            console.error('Failed to load ASCII art:', error);
          }
        }
      } else {
        // Switch back to normal text
        titleDiv.style.display = 'block';
        logoEl.style.display = 'none';
      }
    });
  }

  // Initialize toggles (Ensure the file paths match your actual .txt filenames)
  initAsciiToggle('bmsceCell', 'bmsce.txt', 'bmsce-logo'); 
  initAsciiToggle('rvceCell', 'rvpu.txt', 'rvce-logo');    
  initAsciiToggle('rkvCell', 'rkv.txt', 'rkv-logo');       
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

/* ---------------- RTOS BOOT SEQUENCE ---------------- */
(function initBootSequence() {
  const bootScreen = document.getElementById('rtos-boot');
  
  if (!bootScreen || sessionStorage.getItem('rtos_booted')) {
    if (bootScreen) bootScreen.remove();
    return;
  }

  document.body.classList.add('booting');
  
  const logsContainer = document.getElementById('rtos-logs');
  const mainScreen = document.getElementById('rtos-main');
  const loadingWrapper = document.getElementById('rtos-loading-wrapper');

  // Generator for fake memory addresses (e.g., 0xFA4B2C)
  const generateHex = () => '0x' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0').toUpperCase();
  
  const fastLogs = Array.from({length: 15}, () => `${generateHex()} ALLOCATING MEMORY SECTORS... OK`);
  const slowLogs = [
    "MOUNTING KERNEL... [SUCCESS]",
    "ESTABLISHING NEURAL LINK... [SUCCESS]",
    "DECRYPTING PAYLOAD...",
    "LOADING RTOS CORE..."
  ];

  let logIndex = 0;
  let isFastPhase = true;

  function renderLog(text, color = "var(--text-dimmer)") {
    const p = document.createElement('div');
    p.style.color = color;
    p.textContent = `[${generateHex()}] > ${text}`;
    logsContainer.appendChild(p);
    
    // Keep logs from running off the bottom of the screen
    if (logsContainer.children.length > 20) {
      logsContainer.removeChild(logsContainer.firstChild);
    }
  }

  function bootLoop() {
    if (isFastPhase) {
      if (logIndex < fastLogs.length) {
        renderLog(fastLogs[logIndex]);
        logIndex++;
        setTimeout(bootLoop, 30); // Very fast glitchy speed
      } else {
        isFastPhase = false;
        logIndex = 0;
        renderLog("--------------------------------", "var(--accent)");
        setTimeout(bootLoop, 300);
      }
    } else {
      if (logIndex < slowLogs.length) {
        renderLog(slowLogs[logIndex], "var(--text-dim)");
        logIndex++;
        setTimeout(bootLoop, 200 + Math.random() * 400); // Slower, uneven speed
      } else {
        renderProgressBar();
      }
    }
  }

  // Draw the [████░░░░] ASCII progress bar
  function renderProgressBar() {
    let progress = 0;
    const pBar = document.createElement('div');
    pBar.style.color = "#27c93f";
    pBar.style.marginTop = "15px";
    logsContainer.appendChild(pBar);

    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 12) + 4;
      if (progress > 100) progress = 100;
      
      const filled = Math.floor(progress / 5); // 20 blocks total
      const bar = '█'.repeat(filled) + '░'.repeat(20 - filled);
      pBar.textContent = `SYSTEM BOOT: [${bar}] ${progress}%`;

      if (progress === 100) {
        clearInterval(interval);
        setTimeout(() => {
          loadingWrapper.style.display = 'none';
          mainScreen.style.display = 'flex';
          document.body.classList.add('show-aura'); // TURN AURA ON
        }, 500);
      }
    }, 70);
  }

  // Start the animation
  setTimeout(bootLoop, 400);

  // Transition to main site
  function exitBoot() {
    bootScreen.style.opacity = '0';
    document.body.classList.remove('booting');
    document.body.classList.remove('show-aura'); // TURN AURA OFF
    sessionStorage.setItem('rtos_booted', 'true');
    setTimeout(() => bootScreen.remove(), 800);
  }

  // Triggers for exit
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && mainScreen.style.display === 'flex') exitBoot();
  });
  bootScreen.addEventListener('click', () => {
    if (mainScreen.style.display === 'flex') exitBoot();
  });
})();


/* ---------------- CUSTOM CURSOR TRACKING ---------------- */
(function initCustomCursor() {
  const cursor = document.getElementById('custom-cursor');
  const cursorTrail = document.getElementById('custom-cursor-trail');

  // Prevent errors if running on mobile where we hide it
  if (!cursor || !cursorTrail) return;

  const auraChars = ['@', '#', '$', '%', '*', '+', '=', '!', '?', '&', '1', '0'];

  // Track mouse movement and generate aura
  window.addEventListener('mousemove', (e) => {
    // Inner dot follows instantly
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
    
    // Outer ring follows with the CSS transition delay
    cursorTrail.style.left = `${e.clientX}px`;
    cursorTrail.style.top = `${e.clientY}px`;

    // AURA GENERATOR
    if (document.body.classList.contains('show-aura')) {
      // Throttle particle generation slightly so it doesn't overwhelm the browser
      if (Math.random() > 0.5) { 
        const particle = document.createElement('div');
        particle.className = 'cursor-aura-particle';
        particle.textContent = auraChars[Math.floor(Math.random() * auraChars.length)];
        particle.style.left = `${e.clientX}px`;
        particle.style.top = `${e.clientY}px`;
        
        // Calculate random drift direction for the CSS animation
        const dx = (Math.random() - 0.5) * 80; // Drift between -40px and 40px
        const dy = (Math.random() - 0.5) * 80;
        particle.style.setProperty('--dx', `${dx}px`);
        particle.style.setProperty('--dy', `${dy}px`);
        
        document.body.appendChild(particle);
        
        // Cleanup after animation completes
        setTimeout(() => particle.remove(), 1000);
      }
    }

  });

  // Array of selectors that should trigger the hover animation
  const interactiveSelectors = [
    'a', 
    'mark', 
    '#hero-name', 
    '.job-cell', 
    '.edu-cell', 
    '.reload', 
    '.rtos-char', 
    '.boot-prompt',
    '.pet',
    '.ascii-gun'
  ];

  // Add the hovering class to the body when over interactives
  const interactives = document.querySelectorAll(interactiveSelectors.join(', '));
  
  interactives.forEach(el => {
    el.addEventListener('mouseenter', () => {
      document.body.classList.add('hovering');
    });
    el.addEventListener('mouseleave', () => {
      document.body.classList.remove('hovering');
    });
  });

  const heroName = document.getElementById('hero-name');
  if (heroName) {
    heroName.addEventListener('mouseenter', () => document.body.classList.add('show-aura'));
    heroName.addEventListener('mouseleave', () => document.body.classList.remove('show-aura'));
  }
})();


/* ---------------- INTERACTIVE TERMINAL ---------------- */
(function initTerminal() {
  const terminalContainer = document.getElementById('interactive-terminal');
  const input = document.getElementById('cmd-input');
  const display = document.getElementById('cmd-text');
  
  // Notice this is now a 'let' so we can change where history prints later!
  let historyContainer = document.getElementById('terminal-history');
  
  const activeLine = document.getElementById('active-prompt-line');
  const wrap = document.querySelector('.wrap'); 
  
  if (!input || !display || !terminalContainer || !wrap) return;
  
  let isRevealed = sessionStorage.getItem('portfolio_revealed') === 'true';
  
  if (!isRevealed) {
    document.body.classList.add('terminal-locked');
  } else {
    // If they reload the page and it's already unlocked, spawn the bottom terminal immediately
    const bottomTerminal = document.createElement('div');
    bottomTerminal.id = 'interactive-terminal-bottom';
    bottomTerminal.style.marginTop = '40px'; 
    bottomTerminal.style.marginBottom = '26px';
    bottomTerminal.style.fontFamily = "'JetBrains Mono', monospace";
    bottomTerminal.style.fontSize = '13px';
    
    const newHistory = document.createElement('div');
    newHistory.id = 'terminal-history-bottom';
    newHistory.style.color = 'var(--text-dim)';
    newHistory.style.whiteSpace = 'pre-wrap';
    newHistory.style.lineHeight = '1.5';
    
    bottomTerminal.appendChild(newHistory);
    bottomTerminal.appendChild(activeLine);
    wrap.appendChild(bottomTerminal);
    
    historyContainer = newHistory; 
  }
  
  let commandHistory = [];
  let historyPos = 0;
  
  const validCommands = ['help', 'ls', 'whoami', 'clear', './portfolio', './hobbies'];
  
   // Keep input focused if they click on the terminal or background
  document.addEventListener('click', (e) => {
    // 1. Don't steal focus if the user is highlighting text to copy/paste
    if (window.getSelection().toString().length > 0) return;
    
    // 2. Don't steal focus if they are clicking a link, a pet, a cell, or the hero name!
    if (e.target.closest('a, button, .pet, .edu-cell, .reload, .ascii-gun, #hero-name')) return;
    
    // 3. Refocus the invisible input WITHOUT scrolling the page
    input.focus({ preventScroll: true });
  });
  
  input.addEventListener('input', () => {
    display.textContent = input.value;
  });
  
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      e.preventDefault(); 
      const currentText = input.value.toLowerCase();
      const matches = validCommands.filter(cmd => cmd.startsWith(currentText));
      
      if (matches.length === 1) {
        input.value = matches[0];
        display.textContent = input.value;
      } else if (matches.length > 1) {
        const cmdLine = document.createElement('div');
        cmdLine.className = 'history-line';
        cmdLine.innerHTML = `<span class="user">ravi@teja</span> ~ % <span style="color: var(--text)">${currentText}</span>`;
        historyContainer.appendChild(cmdLine);
        
        const matchLine = document.createElement('div');
        matchLine.className = 'history-output';
        matchLine.textContent = matches.join('    ');
        historyContainer.appendChild(matchLine);
        
        setTimeout(() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }), 50);
      }
      return;
    }

    if (e.key === 'Enter') {
      const cmd = input.value.trim();
      if (cmd) {
        commandHistory.push(cmd);
        historyPos = commandHistory.length;
        processCommand(cmd);
      } else {
        const emptyLine = document.createElement('div');
        emptyLine.className = 'history-line';
        emptyLine.innerHTML = `<span class="user">ravi@teja</span> ~ % `;
        historyContainer.appendChild(emptyLine);
        setTimeout(() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }), 50);
      }
      
      input.value = '';
      display.textContent = '';
      
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyPos > 0) {
        historyPos--;
        input.value = commandHistory[historyPos];
        display.textContent = input.value;
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyPos < commandHistory.length - 1) {
        historyPos++;
        input.value = commandHistory[historyPos];
        display.textContent = input.value;
      } else {
        historyPos = commandHistory.length;
        input.value = '';
        display.textContent = '';
      }
    }
  });
  
  function processCommand(cmd) {
    // 1. Print the typed command to the current history
    const cmdLine = document.createElement('div');
    cmdLine.className = 'history-line';
    cmdLine.innerHTML = `<span class="user">ravi@teja</span> ~ % <span style="color: var(--text)">${cmd}</span>`;
    historyContainer.appendChild(cmdLine);
    
    let output = '';
    const lowerCmd = cmd.toLowerCase();
    
    const helpText = "AVAILABLE COMMANDS:\n  help        - Show this menu\n  ls          - List directory contents\n  ./portfolio - Execute portfolio protocol\n  ./hobbies   - Display personal interests\n  whoami      - Print current user\n  clear       - Clear terminal output";

    switch (lowerCmd) {
      case 'help':
        output = helpText;
        break;
      case 'ls':
        output = "drwxr-xr-x  projects/\ndrwxr-xr-x  experience/\ndrwxr-xr-x  education/\n-rwxr-xr-x  portfolio.sh\n-rw-r--r--  hobbies.txt\n-rw-r--r--  contact.asc";
        break;
      case './portfolio':
        if (isRevealed) {
            output = "[ PORTFOLIO PROTOCOL ALREADY ACTIVE ]";
        } else {
            output = "[INITIALIZING PORTFOLIO PROTOCOLS...]\nLoading components...\nBypassing security protocols...\nAccess granted.";
        }
        break;
      case './hobbies':
        output = "HOBBIES.TXT:\n> Tinkering with distributed systems\n> Reverse-engineering encryption algorithms\n> [Add your other hobbies here!]\n> [And here!]";
        break;
      case 'whoami':
        output = "Ravi Teja S\nFinal-year ISE student @ BMSCE\nSystems & Infrastructure Engineer";
        break;
      case 'clear':
        // WIPE EVERYTHING AND RESET TO THE TOP
        const topHistory = document.getElementById('terminal-history');
        if (topHistory) topHistory.innerHTML = '';
        
        if (isRevealed) {
            isRevealed = false;
            sessionStorage.setItem('portfolio_revealed', 'false');
            document.body.classList.add('terminal-locked');
            
            // Move the prompt back to the top terminal
            const topTerminal = document.getElementById('interactive-terminal');
            if (topTerminal) topTerminal.appendChild(activeLine);
            
            // Destroy the bottom terminal
            const bottomTerminal = document.getElementById('interactive-terminal-bottom');
            if (bottomTerminal) bottomTerminal.remove();
            
            // Reset the history pointer
            historyContainer = topHistory;
            
            // Clear the inline animation styles so they can be re-triggered later
            const elementsToReset = [
                document.getElementById('hero-name'),
                document.querySelector('.hero-role'),
                document.querySelector('.lede'),
                document.querySelector('.links'),
                ...document.querySelectorAll('section:not(#intro)'),
                document.querySelector('footer')
            ];
            elementsToReset.forEach(el => {
                if(el) {
                    el.style.opacity = '';
                    el.style.animation = '';
                }
            });
        } else {
            historyContainer.innerHTML = '';
        }
        break;
      default:
        const closestMatch = validCommands.find(c => c.includes(lowerCmd) || lowerCmd.includes(c));
        if (closestMatch && lowerCmd.length > 1) {
            output = `zsh: correct '${cmd}' to '${closestMatch}' [nyae]? \nType 'help' to see available commands.`;
        } else {
            output = `zsh: command not found: ${cmd}\n\n${helpText}`;
        }
    }
    
    // 2. Print output to the current history
    if (output && lowerCmd !== 'clear') {
      const outLine = document.createElement('div');
      outLine.className = 'history-output';
      outLine.textContent = output;
      historyContainer.appendChild(outLine);
    }
    
    // 3. If executing the portfolio for the first time, split the terminal
    if (!isRevealed && lowerCmd === './portfolio') {
      isRevealed = true;
      sessionStorage.setItem('portfolio_revealed', 'true');
      document.body.classList.remove('terminal-locked');
      
      const bottomTerminal = document.createElement('div');
      bottomTerminal.id = 'interactive-terminal-bottom';
      bottomTerminal.style.marginTop = '40px';
      bottomTerminal.style.marginBottom = '26px';
      bottomTerminal.style.fontFamily = "'JetBrains Mono', monospace";
      bottomTerminal.style.fontSize = '13px';
      
      const newHistory = document.createElement('div');
      newHistory.id = 'terminal-history-bottom';
      newHistory.style.color = 'var(--text-dim)';
      newHistory.style.whiteSpace = 'pre-wrap';
      newHistory.style.lineHeight = '1.5';
      
      bottomTerminal.appendChild(newHistory);
      bottomTerminal.appendChild(activeLine);
      wrap.appendChild(bottomTerminal);
      
      historyContainer = newHistory;
      
      const elementsToReveal = [
        document.getElementById('hero-name'),
        document.querySelector('.hero-role'),
        document.querySelector('.lede'),
        document.querySelector('.links'),
        ...document.querySelectorAll('section:not(#intro)'),
        document.querySelector('footer')
      ];
      
      elementsToReveal.forEach((el, index) => {
        if(el) {
          el.style.opacity = '0';
          el.style.animation = `terminalReveal 0.6s cubic-bezier(0.25, 0.8, 0.25, 1) forwards ${index * 0.1}s`;
        }
      });
    }
    
    // 4. Scroll Logic
    setTimeout(() => {
      if (lowerCmd === 'clear') {
        window.scrollTo(0, 0); // Snap back to top instantly
      } else {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: 'smooth'
        });
      }
    }, 50);
  }
})();