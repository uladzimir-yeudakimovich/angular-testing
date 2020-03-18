import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserComponent } from './user.component';
import { UserService } from './user.service';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let userService: UserService;
  let userServiceStub: Partial<UserService>;
  let el;

  beforeEach(async(() => {
    userServiceStub = {
      isLoggedIn: true,
      user: { 
        name: 'Uladzimir'
      }
    };

    TestBed.configureTestingModule({
      declarations: [UserComponent],
      providers: [ {provide: UserService, useValue: userServiceStub } ]
    });

    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;

    userService = TestBed.get(UserService);

    el = fixture.nativeElement.querySelector('.welcome');
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('stub object and injected UserService should not be the same', () => {
    expect(userServiceStub === userService).toBe(false);
    userServiceStub.isLoggedIn = false;
    expect(userService.isLoggedIn).toBe(true);
  });

  it('should welcome "Uladzimir"', () => {
    userService.isLoggedIn = true;
    fixture.detectChanges();
    expect(el.textContent).toContain('Uladzimir');
  });

  it('should request login if not logged in', () => {
    userService.isLoggedIn = false;
    fixture.detectChanges();
    const content = el.textContent;
    expect(content).not.toContain('Welcome', 'not welcomed');
    expect(content).toMatch(/log in/i, '"log in"');
  });
});
