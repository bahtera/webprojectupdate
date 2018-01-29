import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  dataresep = {};

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.getResepDetail(this.route.snapshot.params['id']);
  }

  getResepDetail(id) {
    this.http.get('http://localhost:3000/api/resep/detail/'+id).subscribe(data => {
      this.dataresep = data;
      console.log(this.dataresep);
    });
  }

}
