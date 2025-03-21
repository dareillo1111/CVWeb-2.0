import { CardController } from "./cardController.js";
import { CardAnimator } from "./cardAnimator.js";

class CardMediator {
      constructor(){
            this.controller = new CardController(
                  document.getElementById("deck")
            );

            let shortDiscardDistance = document.body.clientWidth < 1100;
            console.log(shortDiscardDistance, " meidator")
            this.cardAnimator = new CardAnimator (shortDiscardDistance);
      }

      async loadCardElement(cardFile){
            const response = await fetch(cardFile);
            const responseHTML = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(responseHTML, "text/html");
            const card  = doc.querySelector("div");
            const loadedCard = await this.controller.loadCard(card);
            this.cardAnimator.animateNewCard(loadedCard);
            await new Promise(resolve => setTimeout(resolve,50));
      }

      async cardClicked(clientX, clientY, card){
            this.cardAnimator.cardClicked(clientX, clientY, card);
      }

      async cardDraged(clientX, clientY){
            this.cardAnimator.moveCard(clientX, clientY);
      }

      async cardDroped(){
            this.cardAnimator.dropCard();
      }

      async initialize(){
            await this.controller.loadMediator(this);
      }

      async aboutMeClicked(){
            await this.loadCardElement("./emptyCard.html");
            await this.loadCardElement("./presentationCard.html");
            await this.loadCardElement("./emptyCard.html");
            await this.loadCardElement("./presentationCard.html");
      }

      async projectsClicked(){
            await this.loadCardElement("./presentationCard.html");
            await this.loadCardElement("./presentationCard.html");
            await this.loadCardElement("./presentationCard.html");
            await this.loadCardElement("./presentationCard.html");
      }

      async contactClicked(){
            await this.loadCardElement("./emptyCard.html");
            await this.loadCardElement("./emptyCard.html");
            await this.loadCardElement("./emptyCard.html");
            await this.loadCardElement("./emptyCard.html");
      }
}

const logic = new CardMediator();
logic.initialize();
