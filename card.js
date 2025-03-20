export class Card {
      constructor(cardElement){
            this.cardElement = cardElement;
            this.lastTranslate = { x: 0, y: 0 };
            this.translate = { x: 0, y: 0};
            this.scale = 1;
            this.brightness = 100;
            this.BASEANIMATIONSPEED = 0.2;
            this.animationSpeed = 0;
            this.zIndex = 0;
      }

      async center(){
            this.lastTranslate = { x: 0, y: 0 };
            this.translate = { x: 0, y: 0};
      }

      async loadNewProperties(){
            let newTranslateX = this.lastTranslate.x + this.translate.x;
            let newTranslateY = this.lastTranslate.y + this.translate.y;

            this.cardElement.style.zIndex = this.zIndex;
            this.cardElement.style.transition = "transform "+ this.animationSpeed + "s ease";
            this.cardElement.style.transform =
                  "translate("+newTranslateX+"px, "+newTranslateY+"px) scale("+this.scale+")";
            this.cardElement.style.filter = "brightness("+this.brightness+"%)";
      }

      async setBrightness(newBrightness){
            this.brightness = newBrightness;
      }

      async setScale(newScale){
            this.scale = newScale;
      }

      async setTranslate(vector2D){
            this.translate.x = vector2D.x;
            this.translate.y = vector2D.y;
      }

      async setAnimationSpeed(newSpeed){
            this.animationSpeed = newSpeed;
      }

      async setZIndex(index){
            this.zIndex = index;
      }

      async dropCard(){
            this.lastTranslate.x += this.translate.x;
            this.lastTranslate.y += this.translate.y;
            this.translate = { x: 0, y: 0};
      }
}
