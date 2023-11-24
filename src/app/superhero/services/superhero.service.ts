import { Injectable } from '@angular/core';
import { Superhero } from '../domain/superhero';
import { SuperheroCreate } from '../domain/superhero-create.interface';
import { SuperheroUpdate } from '../domain/superhero-update.interface';

@Injectable({
  providedIn: 'root'
})
export class SuperheroService {
  private readonly INITIAL_SUPERHEROS = [
    { id: crypto.randomUUID(), name: 'Spiderman', },
    { id: crypto.randomUUID(), name: 'Superman', },
    { id: crypto.randomUUID(), name: 'Manolito el fuerte', },
    { id: crypto.randomUUID(), name: 'Hulk', },
  ];

  constructor() {
    if (localStorage.getItem('superheros') === null) {
      localStorage.setItem('superheros', JSON.stringify(this.INITIAL_SUPERHEROS));
    }
  }

  private getSuperheros(): Superhero[] {
    return JSON.parse(localStorage.getItem('superheros')!);
  }

  private setSuperheros(superheros: Superhero[]): void {
    localStorage.setItem('superheros', JSON.stringify(superheros));
  }

  async findAll(): Promise<Superhero[]> {
    return this.getSuperheros();
  }

  async findAllByName(name: string): Promise<Superhero[]> {
    const superheros = this.getSuperheros();
    return superheros.filter(superhero => superhero.name.toLowerCase().includes(name.toLowerCase()));
  }

  async findOneById(id: string): Promise<Superhero> {
    const superheros = this.getSuperheros();
    const superhero = superheros.find(superhero => superhero.id === id);

    if (!superhero) {
      throw new Error('There are no superheros with this id');
    }

    return superhero;
  }

  async create(superheroCreate: SuperheroCreate): Promise<void> {
    this.setSuperheros([
      ...this.getSuperheros(),
      {
        ...superheroCreate,
        id: crypto.randomUUID(),
      },
    ]);
  }

  async update(id: string, superheroUpdate: SuperheroUpdate): Promise<void> {
    const superheros = this.getSuperheros();
    const index = superheros.findIndex(superhero => superhero.id === id);

    if (index === -1) {
      throw new Error('There are no superheros with this id');
    }

    superheros[index] = Object.assign(superheros[index], superheroUpdate);

    this.setSuperheros(superheros);
  }

  async delete(id: string): Promise<void> {
    const superheros = this.getSuperheros();
    const index = superheros.findIndex(superhero => superhero.id === id);

    if (index === -1) {
      throw new Error('There are no superheros with this id');
    }

    superheros.splice(index, 1);

    this.setSuperheros(superheros);
  }
}
