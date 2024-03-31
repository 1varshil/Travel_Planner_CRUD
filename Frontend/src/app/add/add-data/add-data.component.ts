import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { UsersDataService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.css']
})
export class AddDataComponent implements OnInit {

  loading: boolean = false; 
  file: any = null; 

  data: any;
  id:any;
  filename: any;
  previousDestinationType: any;

  loginForm = new FormGroup({
    source: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]+')]),
    destination: new FormControl('', [Validators.required,Validators.pattern('[^0-9$]+')]),
    duration: new FormControl('', [Validators.required]),
    dtype: new FormControl([]), 
    tmode: new FormControl('', Validators.required),
    fdestination: new FormControl('', Validators.required),
    hotel: new FormControl('', Validators.required),
    // filename : new FormControl('',Validators.required)
  });
  router: any;

  get source(){
    return this.loginForm.get('source');

  }
  get destination(){
    return this.loginForm.get('destination');
  }
  
  get duration(){
    return this.loginForm.get('duration');
  }
   
  get fdestination(){
    return this.loginForm.get('fdestination');
  }

  get hotel(){
    return this.loginForm.get('hotel');
  }

  onDropdownChange(event: any) {
    const selectedOptions = Array.from(event.target.selectedOptions, (option: any) => option.value);
    console.log("Selected Options:", selectedOptions); // Log selected options for debugging
    const dtypeControl = this.loginForm.get('dtype') as FormArray;
    // dtypeControl.clear(); 
    
    selectedOptions.forEach(optionValue => {
      if (optionValue !== '') {
        dtypeControl.push(new FormControl(optionValue));
      }
    });
  }
  constructor(private route: ActivatedRoute, private userdata: UsersDataService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      if (history.state && history.state.data) {
        this.data = history.state.data;
        this.previousDestinationType = this.data.dtype; // Store previous destination type
        this.populateFormWithData(this.data);
      }
    });
  }
 
loginUser() {
  const formData1 = this.loginForm.value;
  const formData = {...formData1,filename:this.filename}
  console.log('ff',formData)
  const selectedDestinationTypes = this.loginForm.get('dtype')?.value;
  
  console.log("Selected Destination Types:", selectedDestinationTypes); // Log selected destination types
  formData.dtype = selectedDestinationTypes;

  if (this.data) {
    this.updateUserData(formData);
  } else {
    this.getUserData(formData);
  }
  this.loginForm.reset();
  window.location.reload();
  window.location.href="/home";
}

updateUserData(formData: any) {
  console.log("updated id is",formData);
  formData.previousDestinationType = this.previousDestinationType; 
  this.userdata.updateData(this.data._id, formData).subscribe(
    (res) => {
      console.warn('Data updated successfully:', res);
    },
    (error) => {
      console.error('Error updating data:', error);
    }
  );
}
  getUserData(data:any){
    this.userdata.saveUsers(data).subscribe((res)=>{
     console.warn(res);
   });
 }
 populateFormWithData(data: any) {
  this.loginForm.patchValue({
    source: data.source,
    destination: data.destination,
    duration: data.duration,
    tmode: data.tmode,
    dtype : data.dtype,
    fdestination: data.fdestination,
    hotel: data.hotel,
    // filename: data.filename
  });
  }

 
} 


