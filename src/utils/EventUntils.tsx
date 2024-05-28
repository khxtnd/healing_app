import { EventScreenType } from "@app/types/EventTypes";

let eventManager: EventManager | null;

export const EventUtils = {
    getInstance: () => {
        if (!eventManager) {
          eventManager = new EventManager();
        }
    
        return eventManager;
      },
}

class EventManager  {
    private listEventListener: EventScreenType[];
    constructor() {
        this.listEventListener = [];
       
      }
    addEventListener(event: EventScreenType) {
        this.listEventListener.push(event);
    }

    removeEventListener(event: EventScreenType) {
        this.listEventListener.splice(this.listEventListener.findIndex(it => it.key === event.key), 1);
    }

    sendEvent(count: number){
        this.listEventListener.forEach(it => it.onEvent(1, 'khanh', count));
    }

}