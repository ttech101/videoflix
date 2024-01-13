import { Component } from '@angular/core';
import { FooterComponent } from "../../templates/footer/footer.component";

@Component({
    selector: 'app-imprint',
    standalone: true,
    templateUrl: './imprint.component.html',
    styleUrl: './imprint.component.scss',
    imports: [FooterComponent]
})
export class ImprintComponent {

}
