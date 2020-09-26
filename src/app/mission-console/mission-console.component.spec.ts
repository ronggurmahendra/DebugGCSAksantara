import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionConsoleComponent } from './mission-console.component';

describe('MissionConsoleComponent', () => {
  let component: MissionConsoleComponent;
  let fixture: ComponentFixture<MissionConsoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MissionConsoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MissionConsoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
