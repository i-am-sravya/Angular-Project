import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { from } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  repeatPass: string = 'none';
  displaying: string = "";
  isAccountCreated: boolean = false;

  constructor(private authService: AuthService) {}

  registerForm = new FormGroup({
    firstname: new FormControl("", [
      Validators.required,
      Validators.minLength(2),
      Validators.pattern('[a-zA-Z].*')
    ]),
    lastname: new FormControl("", [
      Validators.required,
      Validators.minLength(2),
      Validators.pattern('[a-zA-Z].*')
    ]),
    email: new FormControl("", [
      Validators.required,
      Validators.email
    ]),
    mobile: new FormControl("", [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
      Validators.pattern('[0-9]*')
    ]),
    gender: new FormControl("", [
      Validators.required
    ]),
    pwd: new FormControl("", [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(15)
    ]),
    rpwd: new FormControl("")
  });


  registerSubmited(){
    if(this.PWD.value == this.RPWD.value){
      this.repeatPass = 'none'

      this.authService.
        registerUser([
          this.registerForm.value.firstname,
          this.registerForm.value.lastname,
          this.registerForm.value.email,
          this.registerForm.value.mobile,
          this.registerForm.value.gender,
          this.registerForm.value.pwd
        ]).subscribe(res => {
          if (res == "Success"){
            this.displaying = "Account Created Successfully";
            this.isAccountCreated = true;
          }
          else if (res == "AlreadyExist"){
            this.displaying = "Account Already Exist. Try another Email.";
            this.isAccountCreated = false;
          }
          else {
            this.displaying = "Something went wrong";
            this.isAccountCreated = false;
          }
      })
      console.log("Submited");
    }
    else{
      this.repeatPass = 'inline'
    }
  }

  get FirstName(): FormControl {
    return this.registerForm.get("firstname") as FormControl;
  }
  get LastName(): FormControl {
    return this.registerForm.get("lastname") as FormControl;
  }
  get Email(): FormControl {
    return this.registerForm.get("email") as FormControl;
  }
  get Mobile(): FormControl {
    return this.registerForm.get("mobile") as FormControl;
  }
  get Gender(): FormControl {
    return this.registerForm.get("gender") as FormControl;
  }
  get PWD(): FormControl {
    return this.registerForm.get("pwd") as FormControl;
  }
  get RPWD(): FormControl {
    return this.registerForm.get("rpwd") as FormControl;
  }

}
