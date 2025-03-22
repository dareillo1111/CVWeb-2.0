export class CardAnimator {
      constructor (isShortDiscardDistance){
            this.LARGEDISCARDDISTANCE = 300;
            this.SHORTDISCARDDISTANCE = 125;

            this.discardDistance = isShortDiscardDistance ? 
                  this.SHORTDISCARDDISTANCE : this.LARGEDISCARDDISTANCE
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
                  - (this.mouseClickPosition.x - this.mouseActualPosition.x);
            this.movedDistance.y = 
                  - (this.mouseClickPosition.y - this.mouseActualPosition.y);

            this.selectedCard.setAnimationSpeed(0.1);
            this.selectedCard.setTranslate(this.movedDistance);
            this.selectedCard.loadNewProperties();
            this.selectedCard.setAnimationSpeed(this.selectedCard.BASEANIMATIONSPEED);
      }

      async cardClicked(clientX, clientY, card){
            this.selectedCard = card;
            this.mouseClickPosition.x = clientX;
            this.mouseClickPosition.y = clientY;
            this.transformCard(1,100,0.4,this.zIndexCounter++);
      }

      async transformCard(scale, brightness, animationSpeed, zIndex){
            this.selectedCard.setScale(scale);
            this.selectedCard.setBrightness(brightness);
            this.selectedCard.setAnimationSpeed(animationSpeed);
            this.selectedCard.setZIndex(zIndex);
            this.selectedCard.loadNewProperties();
            this.selectedCard.setAnimationSpeed(this.selectedCard.BASEANIMATIONSPEED);
      }      

      isInDiscardDistance(){
            let x = this.selectedCard.lastTranslate.x;
            return Math.abs(x) > this.discardDistance;
      }

      async dropCard(){
            if (this.selectedCard == null){
                  return;
            }

            this.selectedCard.dropCard();

            if (this.isInDiscardDistance()){
                  let negativeZIndex = - (20 - this.zIndexCounter++);

                  if (this.discardDistance == this.SHORTDISCARDDISTANCE){
                        this.transformAndRemoveCard(this.zIndexCounter);
                  }else {
                        this.transformCard(0.5,50,0.4,negativeZIndex);
                  }

            } else {
                  this.selectedCard.center();
                  this.transformCard(1,100,0.4,this.zIndexCounter++);
            }

            this.selectedCard = null;
      }

      async transformAndRemoveCard(zIndex){
            const cardElement = this.selectedCard.cardElement;

            //Si cuando la carta se suelta está a la izquierda o a la derecha
            if (this.selectedCard.lastTranslate.x < 0){
                  this.selectedCard.setTranslate({x:-2000, y:0})
            }else {
                  this.selectedCard.setTranslate({x:2000, y:0});
            }

            this.transformCard(0.5,50,1.5,zIndex);

            this.selectedCard.cardElement.addEventListener("transitionend", () =>{
                  cardElement.remove();
            });
      }

      async animateNewCard(card){
            //que se salga de la pantalla
            card.setTranslate({x:-2500,y:0});
            card.hide(false);
            card.setZIndex(this.zIndexCounter);
            card.loadNewProperties();
            //darle tiempo a cargar las propiedades anteriores
            await new Promise(resolve => setTimeout(resolve,20));
            card.setAnimationType = "ease-out";
            card.setAnimationSpeed(0.5)
            card.center();
            card.loadNewProperties();
            card.setAnimationType = card.BASEANIMATIONTYPE;
            card = null;
      }
}
