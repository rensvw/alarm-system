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
                    name: 'disarm', from: ['alarm', 'arm'], to: 'sleep'
                }),
                new StateEvent({
                    name: 'intrusion', from: ['arm'], to: 'alarm'
                }),
                new StateEvent({
                    name: 'timeout', from: ['alarm'], to: 'arm'
                })                          
            ]});

    Arm() {
        this.stateMachine.fireAction('arm');
        console.log('alarm armed');
    }
    Disarm(){
        this.stateMachine.fireAction('disarm');
        console.log('Alarm Disarmed!');
    }
    Intrusion(){
        this.stateMachine.fireAction('intrusion');
        console.log('Intrusion Detected');
    }
    Timeout(){
        this.stateMachine.fireAction('timeout');
        console.log('Alarm Timed Out');
    }
    GetCurrentState(){
        return this.stateMachine.getCurrent();
    }

}
