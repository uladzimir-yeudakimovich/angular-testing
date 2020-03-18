import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserComponent } from './user.component';
import { UserService } from './user.service';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let userService: UserService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserComponent],
      providers: [UserService]
    });
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    userService = TestBed.get(UserService);
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('it should use the user name from the service', () => {
    expect(userService.user.name).toEqual(component.user.name);
  });

  // it('should display the user name is user is logged in', () => {
  //   let compiled = fixture.debugElement.nativeElement;
  //   component.isLoggedIn = true;
  //   expect(compiled.querySelector('p').textContent).toContain(component.user.name);
  // });

  // it('should\'t display the user name is user is not logged in', () => {
  //   let compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('p').textContent).not.toContain(component.user.name);
  // });
});
