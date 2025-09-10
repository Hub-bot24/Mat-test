(function(){
  function $(id){return document.getElementById(id);}
  function toNum(v){if(v===null||v===undefined||v==="")return null;v=(""+v).replace(",",".");var x=parseFloat(v);return isNaN(x)?null:x;}
  function fmt(v){if(!isFinite(v))return "";return (Math.round(v*1e6)/1e6).toString();}
  function todayISO(){var d=new Date(),m=("0"+(d.getMonth()+1)).slice(-2),dy=("0"+d.getDate()).slice(-2);return d.getFullYear()+"-"+m+"-"+dy;}

  function calcOne(s){
    var M1=toNum($("M1"+s).value), M2=toNum($("M2"+s).value), A=toNum($("A"+s).value), DL=toNum($("DL"+s).value);
    var R1=null, R2=null;
    if(M1!==null && M2!==null && A!==null && A!==0){ R1=(M1-M2)/A; }
    if(DL!==null && R1!==null && R1!==0){ R2=1000*DL/R1; }
    $("R1"+s).value = (R1===null?"":fmt(R1));
    $("R2"+s).value = (R2===null?"":fmt(R2));
  }

  function wirePanel(s){
    var ids=["M1","M2","A","DL","PRJ","LOC","JOB","QRY","AGS","TRK","TB","DT"];
    var evs=["input","change","keyup","blur"];
    for(var i=0;i<ids.length;i++){
      var el=$(ids[i]+s); if(!el) continue;
      for(var j=0;j<evs.length;j++){
        if(el.addEventListener){ el.addEventListener(evs[j], function(ss){ return function(){ calcOne(ss); }; }(s), false); }
        else { el.attachEvent("on"+evs[j], function(ss){ return function(){ calcOne(ss); }; }(s)); }
      }
    }
    var d=$("DT"+s); if(d && !d.value) d.value = todayISO();
    calcOne(s);
  }

  window.resetPanel = function(s){
    var ids=["M1","M2","A","DL","R1","R2","PRJ","LOC","JOB","QRY","AGS","TRK","TB"];
    for(var i=0;i<ids.length;i++){ var el=$(ids[i]+s); if(el) el.value=""; }
    $("M2"+s).value="0.85"; $("A"+s).value="0.97"; $("DL"+s).value="1.45";
    var d=$("DT"+s); if(d) d.value=todayISO();
    var f=$("M1"+s); if(f) f.focus();
    calcOne(s);
  };

  function resetAll(){ resetPanel(1); resetPanel(2); resetPanel(3); }

  function wire(){
    wirePanel(1); wirePanel(2); wirePanel(3);
    var pdf=$("pdf"); if(pdf){ if(pdf.addEventListener){ pdf.addEventListener("click", function(){ window.print(); }, false); } else { pdf.attachEvent("onclick", function(){ window.print(); }); } }
    var r=$("resetAll"); if(r){ if(r.addEventListener){ r.addEventListener("click", resetAll, false);} else { r.attachEvent("onclick", resetAll);} }
  }
  if(window.addEventListener){ window.addEventListener("load", wire, false); } else { window.attachEvent("onload", wire); }

  if("serviceWorker" in navigator){ try{ navigator.serviceWorker.register("./service-worker.js?v=18"); }catch(e){} }
})();