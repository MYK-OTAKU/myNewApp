import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesTerminalComponent } from './sales-terminal.component';

describe('SalesTerminalComponent', () => {
  let component: SalesTerminalComponent;
  let fixture: ComponentFixture<SalesTerminalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesTerminalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SalesTerminalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
