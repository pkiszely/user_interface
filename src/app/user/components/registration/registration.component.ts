import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserDto } from '../../dtos/user.dto';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  public form = new FormGroup(
    {
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    passwordConfirm: new FormControl('', [Validators.required, Validators.minLength(6)])
  },
  this.passwordMatchValidator
  );

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  public register(): void {
    this.userService.register(this.form.value).subscribe({
      next: (user: UserDto) => {
        console.log(user);
        window.alert('Successful registration. ');
        this.form.reset();
      },
      error: (error: any) => {
        console.log(error);
        window.alert('Registration failed.');
      }
    });
  }

  private passwordMatchValidator(g: FormGroup): {mismatch: boolean}{
    return g.get('password').value === g.get('passwordConfirm').value ? null : { mismatch: true }
  }

}
