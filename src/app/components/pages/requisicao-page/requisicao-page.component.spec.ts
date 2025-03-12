import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequisicaoPageComponent } from './requisicao-page.component';

describe('RequisicaoPageComponent', () => {
  let component: RequisicaoPageComponent;
  let fixture: ComponentFixture<RequisicaoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequisicaoPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequisicaoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
