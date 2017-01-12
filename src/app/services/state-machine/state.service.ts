import {StateMachine, StateEvent} from 'angular2-state-machine/core';
import {Injectable} from '@angular/core';
 
@Injectable()
export class StateService {
         stateMachine = new StateMachine({
            initial: 'sleep',
            events: [
                new StateEvent({
                     name: 'start', from: ['none'], to: 'sleep'
                }),
                new StateEvent({
                     name: 'arm', from: ['sleep'], to: 'arm'
                }),
                new StateEvent({
                    name: 'disarm', from: ['alarm', 'arm','alarmdelay'], to: 'sleep'
                }),
                new StateEvent({
                    name: 'intrusion', from: ['arm','alarmdelay'], to: 'alarm'
                }),
                new StateEvent({
                    name: 'timeout', from: ['alarm'], to: 'arm'
                }),                      
            ]});
    Arm() {
        this.stateMachine.fireAction('arm');
        console.log('Alarm Armed!');
        console.log("Current state = ",this.stateMachine.getCurrent()); 
    }
    Disarm(){
        this.stateMachine.fireAction('disarm');
        console.log('Alarm Disarmed!');
        console.log("Current state = ",this.stateMachine.getCurrent());
    }
    GetCurrentState(){
        return this.stateMachine.getCurrent();
    }
    FireAction(action){
        this.stateMachine.fireAction(action);
    }

}
