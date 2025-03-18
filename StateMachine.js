import { MobileState, DesktopState } from "./State.js";

export class StateMachine {
      constructor() {
            this.loadedStates = new Map();
            this.currentState = null;
            this.findInitialState();
      }

      async setCardListeners(card, mediator){
            this.currentState.enter(card,mediator);
      }

      async findInitialState(){
            if ("ontouchstart" in window){
                  this.setInitialState(new MobileState());
            } else {
                  this.setInitialState(new DesktopState());
            }
      }

      async setInitialState(state){
            if (!this.loadedStates.has(state.stateName)){
                  this.loadedStates.set(
                        state.stateName,
                        state
                  );
            }
            this.currentState = this.loadedStates.get(state.stateName);
            console.log(this.currentState.stateName)
      }
}
