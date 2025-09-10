(function(){
  function $(id){return document.getElementById(id);}
  function fmt(v){if(!isFinite(v))return "";return (Math.round(v*1e6)/1e6).toString();}
  function toNum(v){if(v===null||v===undefined||v==="")return null;v=(""+v).replace(",",".");var x=parseFloat(v);return isNaN(x)?null:x;}

  function calc(){
    var M1=toNum($("M1").value),M2=toNum($("M2").value),A=toNum($("A").value),DL=toNum($("DL").value);
    var R1=null;if(M1!==null&&M2!==null&&A!==null&&A!==0){R1=(M1-M2)/A;}
    var R2=null;if(DL!==null&&R1!==null&&R1!==0){R2=1000*DL/R1;}
    $("R1").value=(R1===null?"":fmt(R1));
    $("R2").value=(R2===null?"":fmt(R2));
    $("dbg").innerText="M1="+(M1===null?"":M1)+" | M2="+(M2===null?"":M2)+" | A="+(A===null?"":A)+" | DL="+(DL===null?"":DL)+" => R1="+(R1===null?"":fmt(R1))+", R2="+(R2===null?"":fmt(R2));
  }

  var deferredPrompt=null;
  function isStandalone(){
    return (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) ||
           (window.navigator && window.navigator.standalone === true);
  }
  function showInstallTip(){
    if(isStandalone()){ return; }
    try{ if(localStorage.getItem("colas_tip_dismissed")==="1"){ return; } }catch(e){}

    var ua = navigator.userAgent || "";
    var isiOS = /iPhone|iPad|iPod/i.test(ua) && /Safari/i.test(ua) && !/CriOS|FxiOS/i.test(ua);
    var isAndroid = /Android/i.test(ua);
    var text = "Install for offline use: ";
    if(isiOS){
      text = "iPhone/iPad: Tap the Share button ↑ then 'Add to Home Screen' to install for offline use.";
    } else if(isAndroid){
      text = "Android: Tap the menu (⋮) then 'Add to Home screen' or 'Install app' to save offline.";
    } else {
      text = "Tip: After the first load, this app works offline. On phones, add it to your home screen.";
    }
    $("tipText").innerText = text;
    $("installTip").className = $("installTip").className.replace("hide","").trim();
    // Android install button
    $("installBtn").style.display = deferredPrompt ? "" : "none";

    var close = function(){
      $("installTip").className = $("installTip").className + " hide";
      try{ localStorage.setItem("colas_tip_dismissed","1"); }catch(e){}
    };
    if($("tipClose").addEventListener){ $("tipClose").addEventListener("click", close, false); }
    else { $("tipClose").attachEvent("onclick", close); }
  }
  if(window.addEventListener){ window.addEventListener('beforeinstallprompt', function(e){ e.preventDefault(); deferredPrompt=e; var b=$("installBtn"); if(b){ b.style.display=""; } }); }

  function wire(){
    var ids=["M1","M2","A","DL"];var i,j,evs=["input","change","keyup","blur"];
    for(i=0;i<ids.length;i++){ var el=$(ids[i]); for(j=0;j<evs.length;j++){ if(el.addEventListener){el.addEventListener(evs[j],calc,false);} else if(el.attachEvent){el.attachEvent("on"+evs[j],calc);} } }
    if($("calc").addEventListener){$("calc").addEventListener("click",calc,false);}else{$("calc").attachEvent("onclick",calc);}
    var clearFn=function(){ var ids2=["M1","M2","A","DL","R1","R2"]; for(var k=0;k<ids2.length;k++){ $(ids2[k]).value=""; } $("M2").value="0.85"; $("A").value="0.97"; $("DL").value="1.45"; $("M1").focus(); calc(); };
    if($("clear").addEventListener){$("clear").addEventListener("click",clearFn,false);} else {$("clear").attachEvent("onclick",clearFn);}

    if(!$("M2").value)$("M2").value="0.85"; if(!$("A").value)$("A").value="0.97"; if(!$("DL").value)$("DL").value="1.45"; $("M1").value="";
    setInterval(calc,300); calc();

    showInstallTip();
    var installClick=function(){ if(!deferredPrompt){return;} deferredPrompt.prompt(); deferredPrompt.userChoice.then(function(){ deferredPrompt=null; }); };
    if($("installBtn").addEventListener){$("installBtn").addEventListener("click",installClick,false);} else {$("installBtn").attachEvent("onclick",installClick);}
  }
  if(window.addEventListener){window.addEventListener("load",wire,false);}else{window.attachEvent("onload",wire);}

  if("serviceWorker" in navigator){ try{ navigator.serviceWorker.register("./service-worker.js?v=9"); }catch(e){} }
})();