export class Card {
      constructor(cardElement){
            this.cardElement = cardElement;
            this.lastTranslate = { x: 0, y: 0 };
            this.translate = { x: 0, y: 0};
            this.scale = 1;
            this.brightness = 100;
            this.BASEANIMATIONSPEED = 0.2;
            this.animationSpeed = this.BASEANIMATIONSPEED;
            this.zIndex = 0;
            this.BASEANIMATIONTYPE = "ease";
            this.animationType = this.BASEANIMATIONTYPE;
      }

      center(){
            this.lastTranslate = { x: 0, y: 0 };
            this.translate = { x: 0, y: 0};
      }

      loadNewProperties(){
            let newTranslateX = this.lastTranslate.x + this.translate.x;
            let newTranslateY = this.lastTranslate.y + this.translate.y;

            this.cardElement.style.zIndex = this.zIndex;

            this.cardElement.style.transition = 
                  "transform "+ this.animationSpeed + "s "+this.animationType;
            this.cardElement.style.transform =
                  "translate("+newTranslateX+"px, "+newTranslateY+"px) scale("+this.scale+")";
            this.cardElement.style.filter = 
                  "brightness("+this.brightness+"%)";
      }

      setAnimationType(type){
            this.animationType = type;
      }

      setBrightness(newBrightness){
            this.brightness = newBrightness;
      }

      setScale(newScale){
            this.scale = newScale;
      }

      setTranslate(vector2D){
            this.translate.x = vector2D.x;
            this.translate.y = vector2D.y;
      }

      setAnimationSpeed(newSpeed){
            this.animationSpeed = newSpeed;
      }

      setZIndex(index){
            this.zIndex = index;
      }

      dropCard(){
            this.lastTranslate.x += this.translate.x;
            this.lastTranslate.y += this.translate.y;
            this.translate = { x: 0, y: 0};
      }

      hide(hide){
            if (hide){
                  this.cardElement.style.visibility = "hidden";
            }else {
                  this.cardElement.style.visibility = "visible";
            }
      }
}
