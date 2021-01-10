function loadScript(callback, ...urls) {
   // Adding the script tag to the head as suggested before
   const head = document.head;
   const promises = [];

   function load(url) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = url;
      return script;
   }

   for(let i = 0; i < urls.length; i++) {
      promises.push(load(urls[i]));
   }

   Promise.all(promises)
       .then(function (resolve) {
          for (let i = 0; i < resolve.length; i++) {
             head.appendChild(resolve[i]);
          }
          resolve[resolve.length - 1].onreadystatechange = callback;
          resolve[resolve.length - 1].onload = callback;
       })
       .catch(function (e) {
          console.error(e);
       })

   // Then bind the event to the callback function.
   // There are several events for cross browser compatibility.
   // script.onreadystatechange = callback;
   // script.onload = callback;
}

document.addEventListener("DOMContentLoaded", () => {
   loadScript(main, './js/Canvas.js', './js/CanvasElement.js', './js/RectangleElement.js');
});


const main = () => {
   console.log('js ps');
   // import smiley to js
   // const smiley = document.getElementById('canvas');
   //
   // // check if canvas is supported by the browser
   // if (smiley.getContext) {
   //    console.log("Yay! You have smiley support :)");
   //    smiley.width = 220;
   //    smiley.height = 220;
   //    const ctx = smiley.getContext('2d');
   //
   //    // eye brows
   //    ctx.beginPath();
   //    ctx.arc(70, 60, 4, 120, 240, false);
   //    ctx.arc(130, 60, 4, 120, 240, false);
   //    ctx.fill();
   //
   //    // eyes
   //    ctx.beginPath();
   //    ctx.arc(70, 80, 10, 0, 2 * Math.PI, false);
   //    ctx.arc(130, 80, 10, 0, 2 * Math.PI, false);
   //    ctx.fill();
   //
   //    // adding hit region api
   //    ctx.addHitRegion({
   //       control: document.getElementById('click_id')
   //    });
   //
   //    // mouth
   //    ctx.beginPath();
   //    ctx.arc(100, 110, 50, 0, Math.PI, false);
   //    ctx.stroke();
   //
   //    smiley.addEventListener('mousemove', e => {
   //       if (e.region) {
   //          console.log('hit region: ', e.region);
   //       }
   //    });
   // } else {
   //    smiley.width = 0;
   //    console.log("Unfortunately your browser does not support canvas");
   // }

   const canvas = new Canvas('testCanvas', 'Test Canvas');
   const canvasElement = new RectangleElement(canvas.getContext(), 25, 25, 100, 100);
}
