import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'task-list';
  constructor(private translate: TranslateService) {}

  changeLanguage(lang: 'pt' | 'ro') {
    this.translate.use(lang);
  }
}
