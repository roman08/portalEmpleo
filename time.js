window.onload = () => {
   h = 0;
   m = 0;
   s = 0;
   mls = 0;
   timeStarted = 0;
   time = document.getElementById("time");
   btnStart = document.getElementById("btn-start");
   btnStop = document.getElementById("btn-stop");
   btnReset = document.getElementById("btn-reset");
   btnStart.addEventListener("click", start);
   btnStop.addEventListener("click", stop);
   btnReset.addEventListener("click", reset);
};

function write() {
   let ht, mt, st, mlst;
   mls++;

   if (mls > 99) {
      s++;
      mls = 0;
   }
   if (s > 59) {
      m++;
      s = 0;
   }
   if (m > 59) {
      h++;
      m = 0;
   }
   if (h > 24) h = 0;

   mlst = ('0' + mls).slice(-2);
   st = ('0' + s).slice(-2);
   mt = ('0' + m).slice(-2);
   ht = ('0' + h).slice(-2);

   time.innerHTML = `${ht}:${mt}:${st}.${mlst}`;
}

function start() {
   write();
   timeStarted = setInterval(write, 10);
   btnStart.removeEventListener("click", start);
}

function stop() {
   clearInterval(timeStarted);
   btnStart.addEventListener("click", start);
}

function reset() {
   clearInterval(timeStarted);
   time.innerHTML = "00:00:00.00"
   h = 0;
   m = 0;
   s = 0;
   mls = 0;
   btnStart.addEventListener("click", start);
}


document.addEventListener("DOMContentLoaded", function () {
   let tiempoInicio = 0;
   let intervalo;
   let funcionando = false;

   const cronometroElement = document.getElementById("cronometro");
   const inicioBtn = document.getElementById("inicio");
   const pararBtn = document.getElementById("parar");
   const reiniciarBtn = document.getElementById("reiniciar");

   function actualizarCronometro() {
      const tiempoActual = Date.now();
      const tiempoTranscurrido = tiempoActual - tiempoInicio;
      const segundos = Math.floor(tiempoTranscurrido / 1000) % 60;
      const minutos = Math.floor(tiempoTranscurrido / 1000 / 60) % 60;
      const horas = Math.floor(tiempoTranscurrido / 1000 / 60 / 60);

      cronometroElement.textContent = `${String(horas).padStart(2, '0')}:${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`;
   }

   inicioBtn.addEventListener("click", function () {
      console.log('holaaa');
      if (!funcionando) {
         tiempoInicio = Date.now() - (tiempoInicio > 0 ? tiempoInicio : 0);
         intervalo = setInterval(actualizarCronometro, 1000);
         funcionando = true;
      }
   });

   pararBtn.addEventListener("click", function () {
      if (funcionando) {
         clearInterval(intervalo);
         funcionando = false;
      }
   });

   reiniciarBtn.addEventListener("click", function () {
      clearInterval(intervalo);
      funcionando = false;
      tiempoInicio = 0;
      cronometroElement.textContent = "00:00:00";
   });

   // Manejar el evento de cambio de pestaña o minimización del navegador
   document.addEventListener("visibilitychange", function () {
      if (document.visibilityState === "visible" && funcionando) {
         inicioBtn.click(); // Reiniciar el cronómetro al volver a la página activa
      }
   });
});
