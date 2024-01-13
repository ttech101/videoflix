import { Component } from '@angular/core';
import { FooterComponent } from "../../templates/footer/footer.component";

@Component({
    selector: 'app-cookie-policy',
    standalone: true,
    templateUrl: './cookie-policy.component.html',
    styleUrl: './cookie-policy.component.scss',
    imports: [FooterComponent]
})
export class CookiePolicyComponent {

}
