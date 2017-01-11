import {Component, OnInit} from '@angular/core';
import { StateService } from './../services/state-machine/state.service';


@Component({
  selector: 'home',
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  

  private thuis:boolean = false;
  private timer:number;

  constructor(private stateService: StateService) { }

  ngOnInit(): void {
    
  }
  Arm(){
    if(this.stateService.GetCurrentState() != 'arm' && this.stateService.GetCurrentState() != 'alarm'){
      this.stateService.Arm();
    }
    else{
      console.log('Alarm is already armed');
    }
  }
  Disarm(){
    if(this.stateService.GetCurrentState() != 'sleep'){
      this.stateService.Disarm();
    }
    else{
      console.log('Alarm is already sleeping');
    }
  }
  Intrusion(){
    if(this.stateService.GetCurrentState() != 'alarm' && this.stateService.GetCurrentState() != 'sleep') {
      this.stateService.Intrusion();
    }
    else{
      console.log('Alarm is already in intrusion state');
    }
  }
  Timeout(){
    if(this.stateService.GetCurrentState() != 'sleep' && this.stateService.GetCurrentState() != 'arm'){
      this.stateService.Timeout();
    }
    else{
      console.log('Alarm is already timed out');
    }
  }
  GetCurrentState(){
    console.log(this.stateService.GetCurrentState());
  }
  OpenDoor(){
    if(this.thuis==true){
      if(this.stateService.GetCurrentState()=='arm'){
        setTimeout(this.stateService.Intrusion(),10000);
      }
    }
    else{

    }
  }
  OpenWindow(){
    if(this.thuis==true){

    }
    else{

    }
  }
  Movement(){
    if(this.thuis==true){

    }
    else{

    }
  }
  }
