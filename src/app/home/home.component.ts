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
  private door:boolean = false;
  private movement:boolean = false;
  private windowHouse:boolean = false;

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
  Intrusion(door,windowHouse,movement,home){
      // Deur is open
        if(door == true){
          console.log("door is open");
          console.log(this.stateService.GetCurrentState());
          let object = this;
          (function myLoop (i) {    
            setTimeout(function () {   
            console.log("Timer:",i)  
                if(i==1){
                    object.stateService.FireAction("intrusion");
                    console.log("alarm is ringing!!!!")
                    object.Timeout();

                }        //  your code here                
            if (--i) myLoop(i);      //  decrement i and call myLoop again if i > 0
            }, 1000)
          })(5);            
        }
        // Raam is open
        if(windowHouse == true){
                if(home == true){
                        // raam is open en je bent thuis
                        this.stateService.FireAction("intrusion")
                        console.log(this.stateService.GetCurrentState());
                        console.log("raam open en je bent thuis");
                        console.log("Alarm is ringing");
                        this.Timeout();
                        }
                if(home == false){
                        // raam is open en je bent niet thuis
                        this.stateService.FireAction("intrusion")
                        console.log(this.stateService.GetCurrentState());
                        console.log("raam open en je bent niet thuis");
                        console.log("Alarm is ringing");      
                        this.Timeout();
            }    
        }
        // Er is beweging in het huis
        if(movement == true){
                if(home == false){
                      // raam is open en je bent niet thuis
                      this.stateService.FireAction("intrusion")
                      console.log(this.stateService.GetCurrentState());
                      console.log("beweging en je bent niet thuis");
                      console.log("Alarm is ringing");
                      this.Timeout();
                }
        }
    }
  Timeout(){
    if(this.stateService.GetCurrentState() != 'sleep' && this.stateService.GetCurrentState() != 'arm'){
        var object = this;   
        (function myLoop (i) {    
            setTimeout(function () {   
                console.log("Timer:",i)
                 if(i==1 && object.stateService.GetCurrentState() == 'alarm'){
                    console.log("alarm timed out");
                    object.stateService.FireAction("timeout");
                }  
                if(object.stateService.GetCurrentState() == 'sleep'){
                  i=1;
                }
                          
            if (--i) myLoop(i);      //  decrement i and call myLoop again if i > 0
            }, 1000)
            
        })(5); 

    }
    else{
      console.log('Alarm is already timed out');
    }
  }
  IntrusionDelay(){
        this.stateService.FireAction('intrusiondelay');
        console.log("5 seconds until alarm rings!!");
        let object = this;
         (function myLoop (i) {    
            setTimeout(function () {   
            console.log("Timer:",i)                  
                if(i==1){
                    object.stateService.FireAction("intrusion");
                    console.log("alarm is ringing!!!!")
                }
                if(object.stateService.GetCurrentState() == 'sleep'){
                  i=1;
                }                
            if (--i) myLoop(i);      //  decrement i and call myLoop again if i > 0
            }, 1000)
        })(5);
  }
  GetCurrentState(){
    console.log(this.stateService.GetCurrentState());
  }
  OpenDoor(){
    if(this.stateService.GetCurrentState()=='arm'){
          this.door = true;
          this.Intrusion(this.door,this.windowHouse,this.movement,this.home)
          this.door = false;            
          }
        }
  OpenWindow(){
    if(this.stateService.GetCurrentState()=='arm'){
          this.windowHouse = true;
          this.Intrusion(this.door,this.windowHouse,this.movement,this.home)
          this.windowHouse = false;            
          }
  }
  Movement(){
    if(this.stateService.GetCurrentState()=='arm'){
          this.movement = true;
          this.Intrusion(this.door,this.windowHouse,this.movement,this.home)
          this.movement = false;            
          }
  }
  }
