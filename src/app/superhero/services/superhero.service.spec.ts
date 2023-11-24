import { TestBed } from '@angular/core/testing';

import { SuperheroService } from './superhero.service';
import { Superhero } from '../domain/superhero';
import { SuperheroCreate } from '../domain/superhero-create.interface';

describe('SuperheroService', () => {
  let service: SuperheroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuperheroService);
    localStorage.setItem('superheros', JSON.stringify([]));
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('findAll', () => {
    it('should return an array of superheros', async () => {
      const superheros: Superhero[] = [
        { id: crypto.randomUUID(), name: 'Spiderman' },
        { id: crypto.randomUUID(), name: 'Superman' },
      ];
      localStorage.setItem('superheros', JSON.stringify(superheros));

      const response = await service.findAll();

      expect(response).toEqual(superheros);
    });

    it('should return an empty array if there are no superheros', async () => {
      expect(await service.findAll()).toEqual([]);
    });
  });

  describe('findAllByName', () => {
    it('should return an array of superheros that contain the string in their name', async () => {
      const superheros: Superhero[] = [
        { id: crypto.randomUUID(), name: 'Spiderman', },
        { id: crypto.randomUUID(), name: 'Superman', },
        { id: crypto.randomUUID(), name: 'Manolito el fuerte', },
        { id: crypto.randomUUID(), name: 'Hulk', },
      ];
      localStorage.setItem('superheros', JSON.stringify(superheros));

      const response = await service.findAllByName('man');

      expect(response).toEqual(superheros.slice(0, 3));
    });

    it('should return an empty array if there are no users that contain the string', async () => {
      const response = await service.findAllByName('invalid');

      expect(response).toEqual([]);
    });
  });

  describe('findOneById', () => {
    it('should return a superhero with same id', async () => {
      const superheros: Superhero[] = [
        { id: crypto.randomUUID(), name: 'Spiderman' },
        { id: crypto.randomUUID(), name: 'Superman' },
      ];
      localStorage.setItem('superheros', JSON.stringify(superheros));

      const response = await service.findOneById(superheros[0].id);

      expect(response).toEqual(superheros[0]);
    });
  });

  describe('create', () => {
    it('should create a new superhero', async () => {
      const superheroCreate: SuperheroCreate = { name: 'Spiderman' };

      await service.create(superheroCreate);

      const superheros = JSON.parse(localStorage.getItem('superheros')!);
      expect(superheros.length).toBe(1);
      expect(superheros[0].id).toBeDefined();
      expect(superheros[0].name).toBe(superheroCreate.name);
    });
  });

  describe('update', () => {
    it('should update a superhero by id', async () => {
      const superhero: Superhero = { id: crypto.randomUUID(), name: 'Superman' };
      localStorage.setItem('superheros', JSON.stringify([superhero]));
      const superheroUpdate = { name: 'Hulk' };

      await service.update(superhero.id, superheroUpdate);

      const superheros = JSON.parse(localStorage.getItem('superheros')!);
      expect(superheros).toEqual([{ id: superhero.id, name: superheroUpdate.name }]);
    });
  });

  describe('delete', () => {
    it('should delete a superhero by id', async () => {
      const superheros: Superhero[] = [
        { id: crypto.randomUUID(), name: 'Spiderman' },
        { id: crypto.randomUUID(), name: 'Superman' },
      ];
      localStorage.setItem('superheros', JSON.stringify(superheros));

      await service.delete(superheros[1].id);

      const superherosResponse = JSON.parse(localStorage.getItem('superheros')!);
      expect(superherosResponse).toEqual([superheros[0]]);
    });
  });
});
