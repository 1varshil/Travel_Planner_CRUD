import { Component, OnInit } from '@angular/core';
import { UsersDataService } from 'src/app/services/user.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  displayuser: any = [];

  constructor(private router: Router,private userdata: UsersDataService) {}

  ngOnInit(): void {
    this.displayUserData();
  }

  displayUserData() {
    this.userdata.displayUsers().subscribe(
      (data) => {
        this.displayuser = data;  
        console.log(data);
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );
  }

  deleteUserData(id : number)
  {
    const res = confirm(`Are You sure Want to Delete the Data of id : ${id}`)
    if(res== true)
    {
    this.userdata.deleteUsers(id).subscribe((res)=>{
        console.warn(res);
        this.displayUserData();

      });
    }
    else
    {
      this.displayUserData();
    }
  }

  onEditButtonClick(id: number) {
    this.userdata.getDataById(id).subscribe(
      (data) => {
        this.router.navigate(['/add'], { state: { data } }); 
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

}