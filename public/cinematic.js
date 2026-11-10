/* Native scroll drives inspected Higgsfield frames. Two decoded atlases maximum. */
(async()=>{
 const hero=document.querySelector('.hero'),motion=matchMedia('(prefers-reduced-motion: reduce)');
 if(motion.matches)return;
 let film;
 try{const r=await fetch('/watch-sequence.json');if(!r.ok)return;film=await r.json();
  if(!Number.isInteger(film.frames)||film.frames<30||film.frames>500||!Array.isArray(film.atlases)||film.atlases.length!==Math.ceil(film.frames/16)||!film.atlases.every(s=>typeof s==='string'&&/^https:\/\//.test(s)))return;
 }catch{return;}
 let disposed=false,target=0,drawn=-1,inflight=false,raf=0,lastTarget=0,direction=1;
 const cache=new Map(),failures=new Map();
 const load=async i=>{const img=new Image();img.decoding='async';img.src=film.atlases[i];await img.decode();return img;};
 // A failed or offline film must never leave an empty pinned section.
 try{cache.set(0,await load(0));}catch{return;}
 if(motion.matches)return;
 const stage=document.createElement('div');stage.className='cine-stage';
 while(hero.firstChild)stage.append(hero.firstChild);hero.append(stage);
 const canvas=document.createElement('canvas');canvas.className='cine-canvas';canvas.setAttribute('aria-hidden','true');stage.prepend(canvas);
 const ctx=canvas.getContext('2d',{alpha:false});if(!ctx)return;
 const chapters=[['01 / THE APPROACH','Time, up close.','Explore the form, the finish and the smallest details.'],['02 / THE INNER WORLD','Nothing is<br>an afterthought.','Crystal. Dial. Movement. Case. A visual study of the parts within.'],['03 / THE RETURN','Every part.<br>One purpose.','Come back to what matters. A timepiece that feels like you.']];
 const copy=chapters.map(c=>{const el=document.createElement('div');el.className='cine-copy';el.innerHTML=`<p class="eyebrow">${c[0]}</p><h2>${c[1]}</h2><p>${c[2]}</p>`;stage.append(el);return el;});
 const skip=document.createElement('a');skip.href='#catalog';skip.className='cine-skip';skip.textContent='Skip to the collection ↓';stage.append(skip);
 const rail=document.createElement('div');rail.className='cine-rail';rail.innerHTML='<span>01</span><span>02</span><span>03</span>';stage.append(rail);
 const bar=document.createElement('div');bar.className='cine-progress';stage.append(bar);
 function draw(){
  const atlas=Math.floor(target/16),img=cache.get(atlas);if(!img)return;
  const dpr=Math.min(devicePixelRatio||1,1.5),w=Math.round(stage.clientWidth*dpr),h=Math.round(stage.clientHeight*dpr);
  if(canvas.width!==w||canvas.height!==h){canvas.width=w;canvas.height=h;drawn=-1;}
  if(drawn===target)return;
  const fw=img.naturalWidth/4,fh=img.naturalHeight/4,n=target%16;
  const reveal=Math.max(0,Math.min(1,(target-95)/70)),portrait=stage.clientWidth<=700;
  const scale=portrait?Math.min(w/fw*(1.65-.65*reveal),h/fh*.65):Math.min(w/fw,h/fh)*(1-.30*reveal);
  const dw=fw*scale,dh=fh*scale,x=portrait?(w*.56-dw*.65)*(1-reveal)+(w-dw)/2*reveal:(w-dw)/2*(1-reveal)+(w-dw)*reveal,y=portrait?h*.40-dh*.5:(h-dh)/2;
  ctx.fillStyle='#101311';ctx.fillRect(0,0,w,h);ctx.drawImage(img,n%4*fw,Math.floor(n/4)*fh,fw,fh,x,y,dw,dh);drawn=target;
  hero.dataset.frame=String(target);hero.classList.add('sequence-ready');
 }
 async function pump(){
  if(inflight||disposed)return;
  const current=Math.floor(target/16),next=current+direction;
  const i=[current,next].find(n=>n>=0&&n<film.atlases.length&&!cache.has(n)&&(failures.get(n)||0)<2);
  if(i===undefined)return;
  // Evict before decoding: at most two complete 4x4 sheets live in memory.
  if(cache.size>=2){const key=[...cache.keys()].find(k=>k!==current);if(key!==undefined){cache.get(key).src='';cache.delete(key);}}
  inflight=true;
  try{const img=await load(i);if(disposed){img.src='';return;}cache.set(i,img);draw();}
  catch{failures.set(i,(failures.get(i)||0)+1);if(i===current&&(failures.get(i)||0)>=2){cleanup();return;}}
  finally{inflight=false;}
  pump();
 }
 function sample(p){
  // Opening hold, continuous push/disassembly, detail hold, exact reverse reassembly.
  const end=film.endFrame??film.frames-1;
  if(p<.10)return 0;if(p<.59)return Math.round((p-.10)/.49*end);
  if(p<.72)return end;if(p<.96)return Math.round((1-(p-.72)/.24)*end);return 0;
 }
 function update(){raf=0;if(disposed)return;const rect=hero.getBoundingClientRect(),p=Math.max(0,Math.min(1,-rect.top/Math.max(1,hero.offsetHeight-stage.offsetHeight)));
  target=Math.max(0,Math.min(film.frames-1,sample(p)));if(target!==lastTarget)direction=target>lastTarget?1:-1;lastTarget=target;
  draw();pump();hero.classList.toggle('opening',p<.13);
  copy.forEach((el,i)=>{const active=i===0?p>=.15&&p<.29:i===1?p>=.32&&p<.72:p>=.77;el.classList.toggle('active',active);el.setAttribute('aria-hidden',String(!active));});
  [...rail.children].forEach((el,i)=>el.classList.toggle('active',i===(p<.30?0:p<.73?1:2)));bar.style.width=p*100+'%';
 }
 function scroll(){if(!raf)raf=requestAnimationFrame(update);}
 function resize(){drawn=-1;scroll();}
 function cleanup(){if(disposed)return;disposed=true;cancelAnimationFrame(raf);removeEventListener('scroll',scroll);removeEventListener('resize',resize);for(const img of cache.values())img.src='';cache.clear();canvas.remove();copy.forEach(el=>el.remove());skip.remove();rail.remove();bar.remove();while(stage.firstChild)hero.append(stage.firstChild);stage.remove();hero.classList.remove('sequence','sequence-ready','opening');delete hero.dataset.frame;}
 hero.classList.add('sequence','opening');addEventListener('scroll',scroll,{passive:true});addEventListener('resize',resize);update();
 motion.addEventListener('change',e=>{if(e.matches)cleanup();});
 addEventListener('pagehide',e=>{if(!e.persisted)cleanup();});
})();
