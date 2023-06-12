import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() title?: string;
  //title = 'Votre titre';
  id_user: string | null = "";
  isRedirected = false;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.id_user = this.route.snapshot.paramMap.get('id_user');
  }

  isRedirectRequired(): boolean {
    const url = this.router.url;
    this.isRedirected = url.includes('admin') ||
      url.includes('edit-quiz') ||
      url.includes('management-users') ||
      url.includes('user-create') ||
      url.includes('edit-question');
    return this.isRedirected;
  }
}
