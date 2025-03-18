export class State {
      constructor(){
            this.stateName;
      }
      async enter(card, mediator){
            console.error("implement state methods")
      }
      async exit(){
            console.error("implement state methods")
      }
      async update(){
            console.error("implement state methods")
      }
}

export class MobileState extends State {
      constructor(){
            super();
            this.stateName = "MobileState"
      }

      async enter(card, mediator){
            const mouseMove = (event) => {
                  mediator.cardDraged(
                        event.touches[0].clientX,
                        event.touches[0].clientY,
                        card
                  );
            };

            card.cardElement.addEventListener("touchstart", (event) =>{
                  console.log()
                  mediator.cardClicked(
                        event.touches[0].clientX,
                        event.touches[0].clientY,
                        card
                  ); 
                  document.addEventListener("touchmove", mouseMove);
            });

            document.addEventListener("touchend", () =>{
                  document.removeEventListener("touchmove", mouseMove);
                  mediator.cardDroped(); 
            });
      }

      async exit(){
            console.log("exiting mobile")
      }
      async update(){
            console.log("updating mobile")
      }
}

export class DesktopState extends State {
      constructor(){
            super();
            this.stateName = "DesktopState"
      }

      async enter(card, mediator){
            const mouseMove = (event) => {
                  mediator.cardDraged(
                        event.clientX,
                        event.clientY,
                        card
                  );
            };

            card.cardElement.addEventListener("mousedown", (event) =>{
                  mediator.cardClicked(
                        event.clientX,
                        event.clientY,
                        card
                  ); 
                  document.addEventListener("mousemove", mouseMove);
            });

            document.addEventListener("mouseup", () =>{
                  document.removeEventListener("mousemove", mouseMove);
                  mediator.cardDroped(); 
            });
      }
      async exit(){
            console.log("exiting desktop")
      }
      async update(){
            console.log("updating desktop")
      }
}
