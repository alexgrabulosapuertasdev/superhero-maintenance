import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperheroListComponent } from './superhero-list.component';
import { SuperheroModule } from '../../superhero.module';
import { SuperheroService } from '../../services/superhero.service';
import { MatTable } from '@angular/material/table';

describe('SuperheroComponent', () => {
  let component: SuperheroListComponent;
  let fixture: ComponentFixture<SuperheroListComponent>;
  let superheroServiceMock: jasmine.SpyObj<SuperheroService>;

  beforeEach(() => {
    superheroServiceMock = jasmine.createSpyObj('SuperheroService', ['findAll', 'findAllByName', 'delete']);
    TestBed.configureTestingModule({
      declarations: [SuperheroListComponent],
      imports: [SuperheroModule],
      providers: [
        { provide: SuperheroService, useValue: superheroServiceMock },
      ],
    });
    fixture = TestBed.createComponent(SuperheroListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('fetchSuperheros', () => {
    it('should save the superheros on the array', async () => {
      const superheros = [
        { id: crypto.randomUUID(), name: 'Spiderman' },
        { id: crypto.randomUUID(), name: 'Superman' },
      ];
      superheroServiceMock.findAll.and.resolveTo(superheros);

      await component.fetchSuperheros();

      expect(component.superheros).toEqual(superheros);
    });
  });

  describe('delete', () => {
    it('should delete a superhero and refresh the array if accept', async () => {
      spyOn(window, 'confirm').and.returnValue(true);
      const superheros = [
        { id: crypto.randomUUID(), name: 'Spiderman' },
        { id: crypto.randomUUID(), name: 'Superman' },
      ];

      await component.delete(superheros[0].id);

      expect(superheroServiceMock.delete).toHaveBeenCalledTimes(1);
      expect(superheroServiceMock.delete).toHaveBeenCalledWith(superheros[0].id);
    });

    it('should don\'t do anything if cancels', async () => {
      spyOn(window, 'confirm').and.returnValue(false);

      await component.delete('');

      expect(superheroServiceMock.delete).not.toHaveBeenCalled()
    })
  });

  describe('filterByName', () => {
    it('should save the superheros on the array when contains the text in their name', async () => {
      const superheros = [
        { id: crypto.randomUUID(), name: 'Spiderman' },
        { id: crypto.randomUUID(), name: 'Superman' },
      ];
      superheroServiceMock.findAllByName.and.resolveTo(superheros);

      await component.filterByName('Man');

      expect(component.superheros).toEqual(superheros);
    });
  });
});
