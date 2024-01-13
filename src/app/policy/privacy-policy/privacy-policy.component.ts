import { Component } from '@angular/core';
import { FooterComponent } from "../../templates/footer/footer.component";

@Component({
    selector: 'app-privacy-policy',
    standalone: true,
    templateUrl: './privacy-policy.component.html',
    styleUrl: './privacy-policy.component.scss',
    imports: [FooterComponent]
})
export class PrivacyPolicyComponent {

}
