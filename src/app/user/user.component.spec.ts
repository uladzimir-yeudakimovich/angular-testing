import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { UserComponent } from './user.component';
import { UserService } from './user.service';
import { DataService } from '../shared/data.service';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let userService: UserService;
  let userServiceStub: Partial<UserService>;
  let dataService: DataService;
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
      providers: [ 
        {provide: UserService, useValue: userServiceStub },
        DataService
      ]
    });

    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;

    userService = TestBed.get(UserService);
    dataService = TestBed.get(DataService);

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
    fixture.detectChanges();
    const content = el.textContent;
    expect(content).toContain('Welcome', '"Welcome ..."');
    expect(content).toContain('Uladzimir');
  });

  it('should request login if not logged in', () => {
    userService.isLoggedIn = false;
    fixture.detectChanges();
    const content = el.textContent;
    expect(content).not.toContain('Welcome', 'not welcomed');
    expect(content).toMatch(/log in/i, '"log in"');
  });

  it('should not fetch data successfully if not called asynchronously', () => {
    spyOn(dataService, 'getDetales').and.returnValue(Promise.resolve('Data'));
    fixture.detectChanges();
    expect(component.data).toBe(undefined);
  });

  it('should fetch data successfully if called asynchronously', async(() => {
    let testPromise = new Promise((resolve) => {
      setTimeout(() => {
        resolve('Data');
      }, 1500);
    });
    testPromise.then((result: string) => {
      component.data = result;
    });
    expect(component.data).toBe(undefined);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.data).toBe('Data');
    });
  }));

  it('should fetch data successfully if called asynchronously', fakeAsync(() => {
    let testPromise = new Promise((resolve) => {
      setTimeout(() => {
        resolve('Data');
      }, 1500);
    });
    testPromise.then((result: string) => {
      component.data = result;
    });
    expect(component.data).toBe(undefined);
    tick(1500);
    expect(component.data).toBe('Data');
  }));
});
