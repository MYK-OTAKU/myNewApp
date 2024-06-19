import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarTopComponent } from './sidebar-top.component';

describe('SidebarTopComponent', () => {
  let component: SidebarTopComponent;
  let fixture: ComponentFixture<SidebarTopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarTopComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SidebarTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
