document.addEventListener("DOMContentLoaded", () => {
   console.log('js plugged');

   // import canvas to js
   const canvas = document.getElementById('canvas');

   // check if canvas is supported by the browser
   if (canvas.getContext) {
      console.log("Yay! You have canvas support :)");
      canvas.width = 220;
      canvas.height = 220;
      const ctx = canvas.getContext('2d');

      // eye brows
      ctx.beginPath();
      ctx.arc(70, 60, 4, 120, 240, false);
      ctx.arc(130, 60, 4, 120, 240, false);
      ctx.fill();

      // eyes
      ctx.beginPath();
      ctx.arc(70, 80, 10, 0, 2 * Math.PI, false);
      ctx.arc(130, 80, 10, 0, 2 * Math.PI, false);
      ctx.fill();

      // adding hit region api
      ctx.addHitRegion({
         control: document.getElementById('click_id')
      });

      // mouth
      ctx.beginPath();
      ctx.arc(100, 110, 50, 0, Math.PI, false);
      ctx.stroke();

      canvas.addEventListener('mousemove', e => {
         if (e.region) {
            console.log('hit region: ', e.region);
         }
      });
   } else {
      canvas.width = 0;
      console.log("Unfortunately your browser does not support canvas");
   }

});
