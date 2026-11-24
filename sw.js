const CACHE='chunk-english-v4-0-120';const CACHE_PREFIX='chunk-english-v4-';const ASSETS=['./','./index.html','./home-mountain.png','./home-airport-banner.webp','./home-airport-clean.webp','./chunk-guide.webp','./home-guide-m20.webp','./home-guide-m30.webp','./home-guide-m50.webp','./home-guide-m60.webp','./home-guide-f20.webp','./home-guide-f30.webp','./home-guide-f50.webp','./home-guide-f60.webp','./home-user-icon.png','./manifest.webmanifest','./icon.svg','./app-icon-192.png','./app-icon-512.png','./apple-touch-icon.png','./person-ai1-v425.png','./person-ai2-v425.png','./avatar-ai.png','./avatar-you.png','./avatar-style-4.svg','./avatar-style-5.svg','./avatar-style-1.svg','./person-ai1.svg','./person-ai2.svg','./person-male1.svg','./person-male2.svg','./person-male3.svg','./person-male4.svg','./person-female1.svg','./person-female2.svg','./person-female3.svg','./person-female4.svg','./portrait-v416-ai-female.webp','./portrait-v416-ai-male.webp','./portrait-v416-japanese-male.webp','./portrait-v416-japanese-female.webp','./portrait-v416-foreign-male.webp','./portrait-v416-foreign-female.webp','./jp-male-teen.svg','./jp-male-teen.webp','./jp-male-30.svg','./jp-male-50.webp','./jp-male-70.svg','./jp-male-70.webp','./jp-female-teen.svg','./jp-female-teen.webp','./jp-female-30.svg','./jp-female-50.webp','./jp-female-70.svg','./jp-female-70.webp'];self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));self.skipWaiting()});self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(x=>x.startsWith(CACHE_PREFIX)&&x!==CACHE).map(x=>caches.delete(x)))));self.clients.claim()});self.addEventListener('fetch',event=>{
 const req=event.request,u=new URL(req.url);
 if(req.method!=='GET'||u.origin!==self.location.origin||u.pathname.includes('/api/'))return;
 if(req.mode==='navigate'){
   event.respondWith((async()=>{
     try{
       const r=await fetch(req,{cache:'no-store'});
       if(r.ok){const c=await caches.open(CACHE);await c.put('./index.html',r.clone());}
       return r;
     }catch(_){
       return await caches.match('./index.html')||await caches.match('./')||Response.error();
     }
   })());
 }else{
   event.respondWith(fetch(req).then(r=>{
     if(r.ok){const copy=r.clone();event.waitUntil(caches.open(CACHE).then(c=>c.put(req,copy)));}
     return r;
   }).catch(()=>caches.match(req)));
 }
});
