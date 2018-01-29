import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  adminList = [];
  file : File;
  username;
  adminList2 = [];
  namaAdmin;
  fotoAdmin;  

  constructor(private http : Http, private route : Router) { }

  ngOnInit() {
    this.loadAdminList();
    this.loadSessionAdmin();
  }

  fileChange($event){
    this.file = $event.target.files[0];
  }

  loadSessionAdmin(){
    this.username = sessionStorage.getItem("username");
    // console.log(this.username);
    this.http.get("http://localhost:3000/api/admin/")
    .subscribe(
      result => {
        this.adminList2 = result.json();
        for(let i=0; i<this.adminList2.length; i++){
          if(this.adminList2[i].username==this.username){
            this.namaAdmin = this.adminList2[i].nama;
            this.fotoAdmin = this.adminList2[i].foto;
          }
        }
        // console.log(this.fotoAdmin);
        
      },
      error => {

      }
    );
  }

  loadAdminList(){
    this.http.get("http://localhost:3000/api/admin")
    .subscribe(
      result => {
        this.adminList = result.json();
      },
      error => {

      }
    );
  }

  SaveAdminData(f : NgForm){
    if(f.value.nama != "" && f.value.nama != null && f.value.username != null && f.value.username != null && f.value.email != null && f.value.email != null && this.file != null){
      let formData = new FormData();
      formData.append("nama", f.value.nama);
      formData.append("username", f.value.username);
      formData.append("email", f.value.email);
      formData.append("password", f.value.password);
      formData.append("foto", this.file);

      let header = new Headers();
      let options = new RequestOptions({ headers : header });

      this.http.post("http://localhost:3000/api/admin", formData, options)
      .subscribe(
        result => {
          console.log(result.json());
          this.route.navigate(['/dashboard']);
          f.reset();
        },
        error => {
          console.log(error);
        }
      )
    }else{

    }
  }

  DeleteAdminData(id){
    let header = new Headers();
    let options = new RequestOptions({headers : header});

    this.http.delete("http://localhost:3000/api/admin/"+id, options)
    .subscribe(
      result => {
        this.loadAdminList();
      },
      error => {
        console.log(error);
      }
    )
  }

}
