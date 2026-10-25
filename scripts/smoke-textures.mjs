// Regenera las texturas de humo de la portada (public/media/humo/humo-1..4.png) con Chrome sin interfaz.
// Uso: node scripts/smoke-textures.mjs public/media/humo   (después, npm run images crea los WebP)
import { spawn } from 'node:child_process'; import fs from 'node:fs';
const out = process.argv[2];
const p = spawn('google-chrome', ['--headless=new','--remote-debugging-port=9412',"--user-data-dir=/tmp/smoke-textures-chrome",'about:blank'],{stdio:'ignore'});
await new Promise(r=>setTimeout(r,1500));
const t = (await (await fetch('http://127.0.0.1:9412/json')).json()).find(x=>x.type==='page');
const ws = new WebSocket(t.webSocketDebuggerUrl); await new Promise(r=>ws.onopen=r);
let id=0; const pend={}; ws.onmessage=e=>{const m=JSON.parse(e.data); if(pend[m.id]){pend[m.id](m.result);delete pend[m.id];}};
const send=(method,params={})=>new Promise(r=>{pend[++id]=r; ws.send(JSON.stringify({id,method,params}));});
// Mismo algoritmo con el que se generaban antes en el navegador
const r = await send('Runtime.evaluate',{returnByValue:true,expression:`(()=>{function makePuff(size){const c=document.createElement('canvas');c.width=c.height=size;const g=c.getContext('2d');g.filter='blur('+(size*0.06)+'px)';for(let i=0;i<14;i++){const r=size*(0.12+Math.random()*0.18);const x=size/2+(Math.random()-0.5)*size*0.4;const y=size/2+(Math.random()-0.5)*size*0.3;const grad=g.createRadialGradient(x,y,0,x,y,r);grad.addColorStop(0,'rgba(200,200,200,0.14)');grad.addColorStop(1,'rgba(210,210,210,0)');g.fillStyle=grad;g.beginPath();g.arc(x,y,r,0,Math.PI*2);g.fill();}return c.toDataURL('image/png');}
return [1,2,3,4].map(()=>makePuff(512))})()`});
r.result.value.forEach((u,i)=>fs.writeFileSync(`${out}/humo-${i+1}.png`, Buffer.from(u.split(',')[1],'base64')));
p.kill();
