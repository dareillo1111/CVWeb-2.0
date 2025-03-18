import { Card } from "./card.js";
import { StateMachine } from "./StateMachine.js";

export class CardController {
      constructor (deck){
            this.deck = deck;
            this.cardMediator = null;
            this.stateMachine = new StateMachine();
      }

      async loadCard(cardElement){
            try{
                  this.deck.appendChild(cardElement);
                  this.stateMachine.setCardListeners(new Card(cardElement), this.cardMediator);
            }catch(err){
                 console.error(err); 
            }
      }

      async loadMediator(logic){
            this.cardMediator = logic;
      }
}
