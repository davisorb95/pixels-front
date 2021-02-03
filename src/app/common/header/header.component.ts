import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {RouteName} from '../../../utils/route-name';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public activeLang = 'es';
  public menu: HTMLElement;
  public routeName = RouteName;

  constructor(private translate: TranslateService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.menu = document.querySelector('#navBar');
  }

  public showHideMenu(): void {
    if (this.menu) {
      this.menu.classList.toggle('is-active');
    }
  }

  public changeLanguage(lang: string): void {
    this.activeLang = lang;
    this.translate.use(lang);
  }

  public async redirectTo(route: string): Promise<void> {
    await this.router.navigate([route]);
  }

  public signOut(): void {
  }

}
