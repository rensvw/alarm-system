import {Component, OnInit} from '@angular/core';
import { StateService } from './../services/state-machine/state.service';


@Component({
  selector: 'home',
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  

  private home:boolean = false;
  private timer:number = 3;

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
    
      if(this.stateService.GetCurrentState()=='arm'){
        console.log("You have 3 seconds to turn off the alarm!")
        let x = 3;
        while(x>0){
          console.log(x);
         x=x-1;

            
          }
        }
    
    
  
  OpenWindow(){
    if(this.home==true){

    }
    else{

    }
  }
  Movement(){
    if(this.home==true){

    }
    else{

    }
  }
  }
