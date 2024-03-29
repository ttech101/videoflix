import { Component } from '@angular/core';
import { FooterComponent } from '../../templates/footer/footer.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { DataService } from '../../service/data.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-completely',
  standalone: true,
  templateUrl: './completely.component.html',
  styleUrl: './completely.component.scss',
  imports: [FooterComponent, MatCardModule, MatButtonModule, TranslateModule],
})
export class CompletelyComponent {
  formData: any;
  set_headline: string = '';
  set_header: string = '';
  set_text: string = '';

  constructor(
    private dataService: DataService,
    public translate: TranslateService
  ) {}

  ngOnInit() {
    const formData = this.dataService.getFormData();
    this.formData = formData;
    if (formData) {
      this.set_headline = formData.headline;
      this.set_header = formData.header;
      this.set_text = formData.text;
    }
    let language: any = localStorage.getItem('language');
    this.translate.use(language);
  }
}
