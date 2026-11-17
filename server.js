const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const WebSocket = require('ws');
const PORT = process.env.PORT || 3000;
const root = path.join(__dirname, 'public');
const types = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml'};
const server = http.createServer((req,res)=>{
  const pathname = decodeURIComponent(new URL(req.url,'http://localhost').pathname);
  const file = path.resolve(root, '.' + (pathname === '/' ? '/index.html' : pathname));
  if(!file.startsWith(root + path.sep)) {res.writeHead(403);return res.end('Forbidden');}
  fs.readFile(file,(err,data)=>{if(err){res.writeHead(404);return res.end('Not found');}res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream','X-Content-Type-Options':'nosniff','Cache-Control':'no-store','Content-Security-Policy':"default-src 'self'; connect-src 'self' ws: wss:; style-src 'self'; script-src 'self'; img-src 'self' data:; base-uri 'none'; frame-ancestors 'none'"});res.end(data);});
});
const wss = new WebSocket.Server({server,maxPayload:4096});
const clients = new Map();
const waiting = [];
const reports = [];
const send = (ws,obj)=>{if(ws.readyState===WebSocket.OPEN)ws.send(JSON.stringify(obj));};
function removeQueue(ws){let i;while((i=waiting.indexOf(ws))!==-1)waiting.splice(i,1);}
function disconnect(ws,notify=true){const c=clients.get(ws);if(!c)return;removeQueue(ws);if(c.partner){const p=c.partner;c.partner=null;const pc=clients.get(p);if(pc&&pc.partner===ws){pc.partner=null;if(notify)send(p,{type:'left'});}}}
function match(ws){const c=clients.get(ws);if(!c)return;disconnect(ws);while(waiting.length){const other=waiting.shift();const oc=clients.get(other);if(other!==ws&&other.readyState===WebSocket.OPEN&&oc&&!oc.partner&&oc.searching){c.partner=other;oc.partner=ws;c.searching=false;oc.searching=false;send(ws,{type:'matched'});send(other,{type:'matched'});return;}}c.searching=true;waiting.push(ws);send(ws,{type:'waiting',online:wss.clients.size});}
const blocked = /\b(?:https?:\/\/|www\.)\S+/i;
wss.on('connection',(ws)=>{clients.set(ws,{id:crypto.randomUUID(),partner:null,searching:false,times:[],strikes:0});send(ws,{type:'ready'});ws.on('message',(raw)=>{let msg;try{msg=JSON.parse(raw.toString())}catch{return;}const c=clients.get(ws);if(!c||typeof msg.type!=='string')return;
 if(msg.type==='find'){match(ws);return;}
 if(msg.type==='stop'){disconnect(ws);c.searching=false;removeQueue(ws);send(ws,{type:'stopped'});return;}
 if(msg.type==='next'){match(ws);return;}
 if(msg.type==='report'){if(c.partner){const pc=clients.get(c.partner);reports.push({time:new Date().toISOString(),reporter:c.id,reported:pc?.id||'unknown',reason:String(msg.reason||'unspecified').slice(0,100)});if(reports.length>1000)reports.shift();}match(ws);send(ws,{type:'reported'});return;}
 if(msg.type==='message'&&c.partner){const value=typeof msg.text==='string'?msg.text.trim():'';if(!value||value.length>1000)return;const now=Date.now();c.times=c.times.filter(t=>now-t<10000);if(c.times.length>=8){send(ws,{type:'error',message:'Please slow down.'});return;}c.times.push(now);if(blocked.test(value)){send(ws,{type:'error',message:'Links are not allowed in this chat.'});return;}send(c.partner,{type:'message',text:value});send(ws,{type:'sent',text:value});}
 });ws.on('close',()=>{disconnect(ws);removeQueue(ws);clients.delete(ws);});ws.on('error',()=>{});});
server.listen(PORT,()=>console.log(`Stranger Chat running on http://localhost:${PORT}`));
