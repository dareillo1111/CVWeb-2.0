export class CardAnimator {
      constructor (){
            this.DISCARDDISTANCE = 300;
            this.selectedCard = null;
            this.mouseClickPosition = { x: 0, y: 0 };
            this.mouseActualPosition = { x: 0, y: 0 };
            this.movedDistance = { x: 0, y: 0 };
            this.zIndexCounter = 1;
      }

      async moveCard(clientX, clientY){
            this.mouseActualPosition.x = clientX;
            this.mouseActualPosition.y = clientY;

            this.movedDistance.x = 
                  (this.mouseClickPosition.x - this.mouseActualPosition.x)* -1;
            this.movedDistance.y = 
                  (this.mouseClickPosition.y - this.mouseActualPosition.y) * -1;
            console.log(this.movedDistance)

            this.selectedCard.setAnimationSpeed(0.1);
            this.selectedCard.setTranslate(this.movedDistance);
            this.selectedCard.loadNewProperties();
            this.selectedCard.setAnimationSpeed(this.selectedCard.BASEANIMATIONSPEED);
      }

      async dropCard(){
            this.selectedCard.dropCard();

            if (Math.abs(this.selectedCard.lastTranslate.x) > this.DISCARDDISTANCE 
                  || Math.abs(this.selectedCard.lastTranslate.y) > this.DISCARDDISTANCE){
                  let zIndex = (10000 - this.zIndexCounter++) * -1;
                  this.transformCard(0.5,50,0.4,zIndex);
            } else {
                  this.selectedCard.center();
                  this.transformCard(1,100,0.4,this.zIndexCounter++);
            }

            this.selectedCard = null;
      }

      async cardClicked(clientX, clientY, card){
            this.selectedCard = card;
            console.log(clientX, " !!")
            this.mouseClickPosition.x = clientX;
            this.mouseClickPosition.y = clientY;
            console.log(this.mouseClickPosition);
            this.transformCard(1,100,0.4,this.zIndexCounter++);
      }

      async transformCard(scale, brightness, animationSpeed, zIndex){
            this.selectedCard.setScale(scale);
            this.selectedCard.setBrightness(brightness);
            this.selectedCard.setAnimationSpeed(animationSpeed);
            this.selectedCard.setZIndex(zIndex);
            this.selectedCard.loadNewProperties();
            this.selectedCard.setAnimationSpeed(this.selectedCard.BASEANIMATIONSPEED);
            console.log(this.selectedCard.zIndex)
      }
}
