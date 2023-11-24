import { Component, OnInit, ViewChild  } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { SuperheroService } from '../../services/superhero.service';
import { Superhero } from '../../domain/superhero';

@Component({
  selector: 'app-superhero-list',
  templateUrl: './superhero-list.component.html',
  styleUrls: ['./superhero-list.component.scss'],
})
export class SuperheroListComponent implements OnInit {
  superheros: Superhero[] = [];
  @ViewChild(MatTable, { static: true }) table!: MatTable<any>;
  filterName: string = '';
  isLoading: boolean = true;

  constructor(private readonly superheroService: SuperheroService) {}
  
  async ngOnInit(): Promise<void> {
    await this.fetchSuperheros();
    this.isLoading = false;
  }

  async fetchSuperheros(): Promise<void> {
    this.superheros = await this.superheroService.findAll();
  }

  async delete(id: string): Promise<void> {
    const isConfirmed = confirm('Estas seguro de que lo quieres eliminar?');

    if (!isConfirmed) return;

    await this.superheroService.delete(id);
    this.isLoading = true;
    await this.fetchSuperheros();
    this.isLoading = false;

    if (this.table) {
      this.table.renderRows();
    }
  }

  async filterByName(name: string): Promise<void> {
    await this.superheroService.findAllByName(name).then(res => this.superheros = res);
  }
}
