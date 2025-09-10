(function(){
  function $(id){ return document.getElementById(id); }

  function fmt(v){
    if (!isFinite(v)) return "";
    return (Math.round(v*1e6)/1e6).toString();
  }
  function toNum(v){
    if (v===null || v===undefined || v==="") return null;
    v = String(v).replace(",", ".");
    var x = parseFloat(v);
    return isNaN(x) ? null : x;
  }

  // defaults
  if (!$("#M2").value) $("#M2").value = "0.85";
  if (!$("#A").value) $("#A").value = "0.97";
  if (!$("#DL").value) $("#DL").value = "1.45";
  $("#M1").value = "";

  function calc(){
    var M1 = toNum($("#M1").value);
    var M2 = toNum($("#M2").value);
    var A  = toNum($("#A").value);
    var DL = toNum($("#DL").value);

    var R1 = null;
    if (M1!==null && M2!==null && A!==null && A!==0){
      R1 = (M1 - M2) / A;
    }
    var R2 = null;
    if (DL!==null && R1!==null && R1!==0){
      R2 = 1000 * DL / R1;
    }

    $("#R1").value = (R1===null ? "" : fmt(R1));
    $("#R2").value = (R2===null ? "" : fmt(R2));

    $("#dbg").textContent =
      "M1=" + (M1===null?"":M1) +
      " | M2=" + (M2===null?"":M2) +
      " | A="  + (A===null?"":A)  +
      " | DL=" + (DL===null?"":DL) +
      " => R1=" + (R1===null?"":fmt(R1)) +
      ", R2=" + (R2===null?"":fmt(R2));
  }

  var ids = ["M1","M2","A","DL"];
  for (var i=0;i<ids.length;i++){
    var id = ids[i];
    ["input","change","keyup","blur"].forEach(function(ev){
      $(id).addEventListener(ev, calc, false);
    });
  }

  $("#calc").addEventListener("click", calc, false);
  $("#clear").addEventListener("click", function(){
    ["M1","M2","A","DL","R1","R2"].forEach(function(id){ $(id).value = ""; });
    $("#M2").value = "0.85"; $("#A").value = "0.97"; $("#DL").value = "1.45";
    $("#M1").focus();
    calc();
  }, false);

  setInterval(calc, 300);

  if ('serviceWorker' in navigator){
    window.addEventListener('load', function(){
      navigator.serviceWorker.register('./service-worker.js?v=4');
    });
  }

  calc();
})();