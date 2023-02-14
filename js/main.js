class main {
   constructor() {
      const stageWidth = 756;            // 756,630 vs 1200,900
      const stageHeight = 630;
      this.imageSize = 126;
      this.mArray = []
      this.values = [0,126,252,378,504]
      this.creatures = [0,126,252,378,504,630, 756, 882, 1008, 1134, 1260]

      // CANVAS INIT
      this.canvas = document.createElement('canvas');
      this.canvas.width = stageWidth;
      this.canvas.height = stageHeight;
      this.canvasCtx = this.canvas.getContext("2d");
      document.body.appendChild(this.canvas);
   }

   // create an array with random values
   createArray(){
      const sArray = []
      let cycle
      let destX
      let destY
      const forValue = 14
      while (this.mArray.length < forValue) {
         sArray.length = 0
         destX = this.values[Math.floor(Math.random() * this.values.length)]
         destY = this.values[Math.floor(Math.random() * this.values.length)]
         sArray.push(destX, destY)
         if(this.mArray.length > 0) {
            cycle = this.mArray.some((szamok) => {
                  return szamok.every((szam, index) => {
                     return szam === sArray[index]
                  })
               })
            if(cycle === false) {
               this.mArray.push([destX, destY])   
            } 
         } else {
            this.mArray.push([destX, destY])
         }
      }
   } 

   // display images
   renderMonsters() {
      let imageObj = new Image();
      imageObj.src = 'https://raw.githubusercontent.com/tamaseszenyi/playngo/main/assets/gigantoonz_symbols_and_multipliers.png';
      let $this = this
      imageObj.onload = function () {
         let number = 1386  
         let load = 0   
         let sourceY = 0
         let sourceX

         function running () {
            $this.canvasCtx.clearRect(630, 252, $this.canvas.width, $this.canvas.height); 
            sourceX = $this.creatures[Math.floor(Math.random()*$this.creatures.length)] 
            // MONSTERS 
            $this.canvasCtx.drawImage(imageObj, sourceX, sourceY, $this.imageSize, $this.imageSize, $this.mArray[load][0], $this.mArray[load][1], $this.imageSize, $this.imageSize);      
            load++
            // NUMBERS
            $this.canvasCtx.drawImage(imageObj, number, sourceY, $this.imageSize, $this.imageSize, 630, 252, $this.imageSize, $this.imageSize); 
            number = number + 126  
            if (load >= 14) {
               clearInterval(int)
               load = 0
               number = 1386
               $this.canvasCtx.clearRect(0, 0, $this.canvas.width, $this.canvas.height)
               int = setInterval(running, 1000)
            }
         }

         let int = setInterval(running, 1000)
      } 
   }
}

const elem = new main();
elem.createArray()
elem.renderMonsters()