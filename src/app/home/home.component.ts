import {Component,OnInit} from '@angular/core';
import {StateService} from './../services/state-machine/state.service';

@Component({
  selector: 'home',
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit {

  private home: boolean = false;
  private timerDelay: number = 5;
  private timerAlarm: number = 5;
  private door: boolean = false;
  private movement: boolean = false;
  private windowHouse: boolean = false;
  private state: string = "sleep";
  private colour: string = "white";

  constructor(private stateService: StateService) {}

  ngOnInit(): void {
  }
  Arm() {
    if (this.stateService.GetCurrentState() != 'arm' && this.stateService.GetCurrentState() != 'alarm') {
      this.stateService.Arm();
      this.state = this.stateService.GetCurrentState();
    } else {
      console.log('Alarm is already armed');
    }
  }
  Disarm() {
    if (this.stateService.GetCurrentState() != 'sleep') {
      this.stateService.Disarm();
      this.colour = "white";
      this.state = this.stateService.GetCurrentState();
    } else {
      console.log('Alarm is already sleeping');
    }
  }
  Intrusion(door, windowHouse, movement, home) {
    // Deur is open
    if (door == true) {
      this.DelayedAlarm();
    }
    // Raam is open
    if (windowHouse == true) {
      if (home == true) {
        // raam is open en je bent thuis
        this.IntrusionDetected();
      }
      if (home == false) {
        // raam is open en je bent niet thuis
        this.IntrusionDetected();
      }
    }
    // Er is beweging in het huis
    if (movement == true) {
      if (home == false) {
        // raam is open en je bent niet thuis
        this.IntrusionDetected();
      }
      if (home == true) {
        this.DelayedAlarm();
      }
    }
  }
  Timeout() {
    if (this.stateService.GetCurrentState() != 'sleep' && this.stateService.GetCurrentState() != 'arm') {
      let object = this;
      object.timerAlarm = 5;
      object.AlarmSirene(50, 100);
      (function myLoop(timer) {
        setTimeout(function () {
          object.state = object.stateService.GetCurrentState();
          if (object.timerAlarm == 1 && object.stateService.GetCurrentState() == 'alarm') {
            object.stateService.FireAction("timeout");
            object.colour = "white";
            object.state = object.stateService.GetCurrentState();
            object.GetCurrentState();
          }
          if (object.stateService.GetCurrentState() == 'sleep') {
            object.timerAlarm = 1;
            object.state = object.stateService.GetCurrentState();
            object.colour = "white";
          }

          if (--object.timerAlarm) myLoop(object.timerAlarm); //  decrement i and call myLoop again if i > 0
        }, 1000)
      })(object.timerAlarm)

    } else {
      console.log('Alarm is already timed out');
    }
  }

  GetCurrentState() {
    this.state = this.stateService.GetCurrentState();
    console.log("Current state = ", this.stateService.GetCurrentState());
  }
  OpenDoor() {
    if (this.stateService.GetCurrentState() == 'arm') {
      this.door = true;
      this.Intrusion(this.door, this.windowHouse, this.movement, this.home)
      this.door = false;
    }
  }
  OpenWindow() {
    if (this.stateService.GetCurrentState() == 'arm') {
      this.windowHouse = true;
      this.Intrusion(this.door, this.windowHouse, this.movement, this.home)
      this.windowHouse = false;
    }
  }
  Movement() {
    if (this.stateService.GetCurrentState() == 'arm') {
      this.movement = true;
      this.Intrusion(this.door, this.windowHouse, this.movement, this.home)
      this.movement = false;
    }
  }
  AlarmSound(timer, speed) {
    let audio = new Audio();
    let object = this;
    audio.src = "http://www.soundjay.com/button/beep-07.wav";
    audio.load();
    (function myLoop(timer) {
      setTimeout(function () {
        audio.play();
        if (object.stateService.GetCurrentState() == 'sleep') {
          timer = 1;
        }
        if (--timer) myLoop(timer); //  decrement i and call myLoop again if i > 0
      }, speed)
    })(timer);
  }
  AlarmSirene(timer, speed) {
    let audio = new Audio();
    let object = this;
    audio.src = "http://www.soundjay.com/button/beep-02.wav";
    audio.load();
    (function myLoop(timer) {
      setTimeout(function () {
        audio.play();
        if (object.stateService.GetCurrentState() == 'sleep') {
          timer = 1;
        }
        if (--timer) myLoop(timer); //  decrement i and call myLoop again if i > 0
      }, speed)
    })(timer);
  }
  DelayedAlarm() {
    this.state = this.stateService.GetCurrentState();
    let object = this;
    object.timerDelay = 5;
    object.AlarmSound(5, 1000);
    (function myLoop(timer) {
      setTimeout(function () {
        object.state = object.stateService.GetCurrentState();
        console.log("Timer:", object.timerDelay)
        if (object.timerDelay == 1) {
          object.stateService.FireAction("intrusion");
          object.colour = "red"
          object.state = object.stateService.GetCurrentState();
          object.Timeout();
        }
        if (object.stateService.GetCurrentState() == 'sleep') {
          object.timerDelay = 1;
          object.colour = "white";
          object.state = object.stateService.GetCurrentState();
        } //  your code here                
        if (--object.timerDelay) myLoop(object.timerDelay); //  decrement i and call myLoop again if i > 0
      }, 1000)
    })(object.timerDelay),
    function () {object.timerAlarm = 5};
  }
  IntrusionDetected() {
    this.stateService.FireAction("intrusion")
    this.colour = "red";
    this.state = this.stateService.GetCurrentState();
    this.Timeout();
  };
};