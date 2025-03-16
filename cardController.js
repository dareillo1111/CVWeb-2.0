import { Card } from "./card.js";

export class CardController {
      constructor (deck){
            this.deck = deck;
            this.cardLogic = null;
            this.cardId = 0;
            this.cardsMap = new Map();
      }

      async loadCard(cardElement){
            try{
                  this.deck.appendChild(cardElement);
                  this.cardsMap.set(this.cardId, new Card(cardElement));
                  const cardCreationId = this.cardId;

                  cardElement.addEventListener("mousedown", (event) => {
                        let card = this.cardsMap.get(cardCreationId);
                        this.cardLogic.cardClicked(event, card);
                  });
                  this.cardId++;

            }catch(err){
                 console.error(err); 
            }
      }

      async loadLogic(logic){
            this.cardLogic = logic;
      }
}
