import { Injectable } from '@angular/core';
import { Superhero } from '../domain/superhero';
import { SuperheroCreate } from '../domain/superhero-create.interface';
import { SuperheroUpdate } from '../domain/superhero-update.interface';

@Injectable({
  providedIn: 'root'
})
export class SuperheroService {
  private readonly INITIAL_SUPERHEROS = [
    { id: '1', name: 'Spiderman', },
    { id: '2', name: 'Superman', },
    { id: '3', name: 'Manolito el fuerte', },
    { id: '4', name: 'Hulk', },
  ];

  superheros: Superhero[] = [...this.INITIAL_SUPERHEROS];

  constructor() {}

  async findAll(): Promise<Superhero[]> {
    return this.superheros;
  }

  async findAllByName(name: string): Promise<Superhero[]> {
    return this.superheros.filter(superhero => superhero.name.toLowerCase().includes(name.toLowerCase()));
  }

  async findOneById(id: string): Promise<Superhero> {
    const superhero = this.superheros.find(superhero => superhero.id === id);

    if (!superhero) {
      throw new Error('There are no superheros with this id');
    }

    return superhero;
  }

  async create(superheroCreate: SuperheroCreate): Promise<void> {
    this.superheros.push({
      ...superheroCreate,
      id: crypto.randomUUID(),
    });
  }

  async update(id: string, superheroUpdate: SuperheroUpdate): Promise<void> {
    const index = this.superheros.findIndex(superhero => superhero.id === id);

    if (index === -1) {
      throw new Error('There are no superheros with this id');
    }

    this.superheros[index] = Object.assign(this.superheros[index], superheroUpdate);
  }

  async delete(id: string): Promise<void> {
    const index = this.superheros.findIndex(superhero => superhero.id === id);

    if (index === -1) {
      throw new Error('There are no superheros with this id');
    }

    this.superheros.splice(index, 1);
  }
}
