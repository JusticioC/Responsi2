// login.page.spec.ts
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginPage } from './login.page';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LoginPage],
      imports: [IonicModule.forRoot(), RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to dashboard page on successful login', () => {
    spyOn(component['router'], 'navigate');
    component.username = 'username';
    component.password = 'password';
    component.handleLogin(); // Change here to call handleLogin instead of login
    expect(component['router'].navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('should show alert on unsuccessful login', () => {
    spyOn(window, 'alert');
    component.username = 'invalidUser';
    component.password = 'invalidPassword';
    component.handleLogin(); // Change here to call handleLogin instead of login
    expect(window.alert).toHaveBeenCalledWith('Login failed: undefined'); // Adjust the expectation as needed
  });
});
