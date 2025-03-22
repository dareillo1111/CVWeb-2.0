import { Card } from "./card.js";
import { StateMachine } from "./StateMachine.js";

export class CardController {
      constructor (deck){
            this.deck = deck;
            this.cardMediator = null;
            this.stateMachine = new StateMachine();
            this.loadButtons();
      }

      async loadCard(cardElement){
            try{
                  const card = new Card(cardElement);
                  //el show lo hace cardAnimator
                  card.hide(true);
                  this.deck.appendChild(card.cardElement);
                  this.stateMachine.setCardListeners(
                        card, 
                        this.cardMediator
                  );
                  return card;
            }catch(err){
                 console.error(err); 
            }
      }

      async loadButtons(){
            document.getElementById("about-me-button").addEventListener("click", () =>{
                  this.cardMediator.aboutMeClicked();
            })
            document.getElementById("projects-button").addEventListener("click", () =>{
                  this.cardMediator.projectsClicked();
            })
            document.getElementById("contact-button").addEventListener("click", () =>{
                  this.cardMediator.contactClicked();
            })
      }

      async loadMediator(logic){
            this.cardMediator = logic;
      }
}
