import { Component, OnInit } from "@angular/core";
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from "@angular/router";
import { SuperheroService } from "../../services/superhero.service";

@Component({
  selector: 'app-superhero-form',
  templateUrl: 'superhero-form.component.html',
  styleUrls: ['./superhero-form.component.scss'],
})
export class SuperheroFormComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  isEditMode: boolean = false;
  isSubmitted: boolean = false;
  superheroId?: string;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly superheroService: SuperheroService,
  ) {}

  ngOnInit(): void {
    const { id } = this.route.snapshot.params

    if (id) {
      this.isEditMode = true;
      this.superheroId = id;
      this.createFormToUpdateSuperhero(id);
    } else {
      this.createFormToCreateSuperhero();
    }
  }

  createFormToCreateSuperhero(): void {
    this.form.addControl('name', new FormControl(undefined, [Validators.required]));
  }

  async createFormToUpdateSuperhero(id: string): Promise<void> {
    this.form.addControl('name', new FormControl(undefined));

    const { name } = await this.superheroService.findOneById(id);

    this.form.controls['name'].setValue(name);
  }

  async handleSave(): Promise<void> {
    this.isSubmitted = true;

    if (!this.form.valid) {
      return;
    }

    if (this.isEditMode) {
      await this.updateSuperhero();
    } else {
      this.createSuperhero();
    }
    
    this.isSubmitted = false;
    this.goToList();

  }

  private async createSuperhero(): Promise<void> {
    await this.superheroService.create(this.form.value);
  }

  private async updateSuperhero(): Promise<void> {
    await this.superheroService.update(this.superheroId!, this.form.value);
  }

  uppercaseTheInputText(control: AbstractControl): void {
    const {name } =this.form.controls
    control.setValue(control.value.toUpperCase());
  }

  private goToList(): void {
    this.router.navigate(['/superhero/list']);
  }
}
