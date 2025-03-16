export class CardAnimator {
      constructor (){
            this.DISCARDDISTANCE = 300;
            this.selectedCard = null;
            this.mouseClickPosition = { x: 0, y: 0 };
            this.mouseActualPosition = { x: 0, y: 0 };
            this.movedDistance = { x: 0, y: 0 };
            this.zIndexCounter = 1;

            document.addEventListener("mousemove", (event) => {
                  if (this.selectedCard != null){
                        this.mouseMove(event);
                  }
            });

            document.addEventListener("mouseup", () => {
                  this.selectedCard.dropCard();
                  console.log(this.selectedCard.lastTranslate.x)
                  if (Math.abs(this.selectedCard.lastTranslate.x) > this.DISCARDDISTANCE 
                        || Math.abs(this.selectedCard.lastTranslate.y) > this.DISCARDDISTANCE){
                        let zIndex = (10000 - this.zIndexCounter++) * -1;
                        this.transformCard(0.5,50,0.4,zIndex);
                  } else {
                        this.selectedCard.center();
                        this.transformCard(1,100,0.4,this.zIndexCounter++);
                  }
                  this.selectedCard = null;
            })
      }

      async cardClicked(event, card){
            this.selectedCard = card;
            this.mouseClickPosition.x = event.clientX;
            this.mouseClickPosition.y = event.clientY;
            this.transformCard(1,100,0.4,this.zIndexCounter++);
      }

      async moveSelectedCard(){
            this.movedDistance.x = 
                  (this.mouseClickPosition.x - this.mouseActualPosition.x)* -1;
            this.movedDistance.y = 
                  (this.mouseClickPosition.y - this.mouseActualPosition.y) * -1;

            this.selectedCard.setAnimationSpeed(0.1);
            this.selectedCard.setTranslate(this.movedDistance);
            this.selectedCard.loadNewProperties();
            this.selectedCard.setAnimationSpeed(this.selectedCard.BASEANIMATIONSPEED);
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
      
      async mouseMove(event){
            this.mouseActualPosition.x = event.clientX;
            this.mouseActualPosition.y = event.clientY;
            this.moveSelectedCard();
      }
}
