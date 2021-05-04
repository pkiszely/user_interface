import { Component, OnInit } from '@angular/core';
import { UserDto } from 'src/app/user/dtos/user.dto';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.authService.logout();
  }

}
