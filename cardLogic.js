import { CardController } from "./cardController.js";
import { CardAnimator } from "./cardAnimator.js";

class CardLogic {
      constructor(){
            this.controller = new CardController(
                  document.getElementById("deck")
            );

            this.cardAnimator = new CardAnimator ()
      }

      async loadCardElement(cardFile){
            const response = await fetch(cardFile);
            const responseHTML = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(responseHTML, "text/html");
            const card  = doc.querySelector("div");
            this.controller.loadCard(card);
      }

      async cardClicked(event, card){
            this.cardAnimator.cardClicked(event, card);
      }

      async initialize(){
            await this.controller.loadLogic(this);
            await this.loadCardElement("./emptyCard.html");
            await this.loadCardElement("./emptyCard.html");
            await this.loadCardElement("./presentationCard.html");
            await this.loadCardElement("./emptyCard.html");
      }
}

const logic = new CardLogic();
logic.initialize();



