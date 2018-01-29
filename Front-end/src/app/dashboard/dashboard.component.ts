import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  file : File;
  resepList = [];
  kategori;
  username;
  adminList = [];
  namaAdmin;
  fotoAdmin;

  constructor(private http : Http, private route : Router) { }

  ngOnInit() {
    this.loadResepList();
    this.loadSessionAdmin();
  }

  loadSessionAdmin(){
    this.username = sessionStorage.getItem("username");
    // console.log(this.username);
    this.http.get("http://localhost:3000/api/admin/")
    .subscribe(
      result => {
        this.adminList = result.json();
        for(let i=0; i<this.adminList.length; i++){
          if(this.adminList[i].username==this.username){
            this.namaAdmin = this.adminList[i].nama;
            this.fotoAdmin = this.adminList[i].foto;
          }
        }
        console.log(this.fotoAdmin);
        
      },
      error => {

      }
    );
  }

  loadResepList(){
    this.http.get("http://localhost:3000/api/resep")
    .subscribe(
      result => {
        this.resepList = result.json();
      },
      error => {

      }
    );
  }

  DeleteResepData(id){
    let header = new Headers();
    let options = new RequestOptions({headers : header});

    this.http.delete("http://localhost:3000/api/resep/"+id, options)
    .subscribe(
      result => {
        this.loadResepList();
      },
      error => {
        console.log(error);
      }
    )
  }

  CariResep(){
    // console.log(this.kategori);
    if(this.kategori == "Semua"){
      this.route.navigate(['/dashboard']);
    }else if(this.kategori == "Jawa"){
      this.route.navigate(['/resep-masakan-jawa']);
    }
  }
}
