export class StateMachine {

    private states: State[];
    private currentState: State;

    constructor(availableStates: State[], startingState: State) {
        // TODO apply validation
        this.states = availableStates ?? [];
        this.currentState = startingState ?? null;
    }

    get(): State {
        return this.currentState;
    }

    update(state: State) {
        if (state?.id !== this.currentState?.id) {
            this.currentState = state;
        }
    }

}

export interface State {
    id: string;
}
