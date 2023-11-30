import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';  // Import Router for navigation
import { AlertController } from '@ionic/angular'; // Import AlertController

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})

export class LoginPage {
  // Variables to store username and password
  username: string = '';
  password: string = '';

  // Inject ApiService and Router in the constructor
  constructor(private apiService: ApiService, private router: Router, private alertController: AlertController) {}

  // Method to handle login
  async handleLogin() {
    // Check if username and password are provided
    if (this.username && this.password) {
      // Your login logic using ApiService
      this.apiService.login({ username: this.username, password: this.password })
        .subscribe(
          (response) => {
            // Check the response status or data
            if (response.status === 'sukses') {
              // Redirect to another page after successful login
              this.router.navigate(['/lihatCatatan']);
            } else {
              // Handle login failure, show an error message, etc.
              this.presentAlert('Login failed:', 'Password salah');
            }
          },
          (error) => {
            console.error('Error during login:', error);
          }
        );
    } else {
      // Handle case where username or password is not provided
      console.error('Please provide both username and password.');
    }
  }
async presentAlert(header: string, message: string) {
  const alert = await this.alertController.create({
    header: header,
    message: message,
    buttons: ['OK']
  });

  await alert.present();
}
}
