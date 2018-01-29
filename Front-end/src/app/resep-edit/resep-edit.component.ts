import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-resep-edit',
  templateUrl: './resep-edit.component.html',
  styleUrls: ['./resep-edit.component.css']
})
export class ResepEditComponent implements OnInit {

  resep = {};

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getResep(this.route.snapshot.params['id']);
  }

  getResep(id) {
    this.http.get('http://localhost:3000/api/resep/detail/'+id).subscribe(data => {
      this.resep = data;
    });
  }

  updateResep(id, data) {
    this.http.put('http://localhost:3000/api/resep/edit/'+id, data)
      .subscribe(res => {
          let id = res['_id'];
          this.router.navigate(['/edit-details', id]);
        }, (err) => {
          console.log(err);
        }
      );
  }

}
