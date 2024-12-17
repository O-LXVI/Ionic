import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrearNotasPage } from './crear-notas.page';

describe('CrearNotasPage', () => {
  let component: CrearNotasPage;
  let fixture: ComponentFixture<CrearNotasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearNotasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
