import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions, Headers } from "@angular/http";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  file : File;
  username;
  adminList = [];
  namaAdmin;
  fotoAdmin;

  constructor(private http : Http, private route : Router) { }

  ngOnInit() {
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
        // console.log(this.fotoAdmin);
        
      },
      error => {

      }
    );
  }

  fileChange($event){
    this.file = $event.target.files[0];
  }

  SaveResepData(f : NgForm){
    if(f.value.judul != "" && f.value.judul != null && f.value.kategori != null && f.value.resep && f.value.resep != "" != null && this.file != null && f.value.kategori == "Kalimantan dan Sekitarnya"){
      let formData = new FormData();
      formData.append("judul", f.value.judul);
      formData.append("kategori", f.value.kategori);
      formData.append("resep", f.value.resep);
      formData.append("gambar", this.file);
      formData.append("penulis", this.namaAdmin);

      let header = new Headers();
      let options = new RequestOptions({ headers : header });

      this.http.post("http://localhost:3000/api/resep", formData, options)
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
    }else if(f.value.judul != "" && f.value.judul != null && f.value.kategori != null && f.value.resep != null && f.value.resep != "" && this.file != null && f.value.kategori == "Jawa, Madura dan Sekitarnya"){
      let formData = new FormData();
      formData.append("judul", f.value.judul);
      formData.append("kategori", f.value.kategori);
      formData.append("resep", f.value.resep);
      formData.append("gambar", this.file);
      formData.append("penulis", this.namaAdmin);

      let header = new Headers();
      let options = new RequestOptions({ headers : header });

      this.http.post("http://localhost:3000/api/resep", formData, options)
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
    }else if(f.value.judul != "" && f.value.judul != null && f.value.kategori != null && f.value.resep != null && this.file != null && f.value.kategori == "Sumatera dan Sekitarnya"){
      let formData = new FormData();
      formData.append("judul", f.value.judul);
      formData.append("kategori", f.value.kategori);
      formData.append("resep", f.value.resep);
      formData.append("gambar", this.file);

      let header = new Headers();
      let options = new RequestOptions({ headers : header });

      this.http.post("http://localhost:3000/api/resep", formData, options)
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
    }else if(f.value.judul != "" && f.value.judul != null && f.value.kategori != null && f.value.resep != null && this.file != null && f.value.kategori == "Sulawesi dan Sekitarnya"){
      let formData = new FormData();
      formData.append("judul", f.value.judul);
      formData.append("kategori", f.value.kategori);
      formData.append("resep", f.value.resep);
      formData.append("gambar", this.file);

      let header = new Headers();
      let options = new RequestOptions({ headers : header });

      this.http.post("http://localhost:3000/api/resep", formData, options)
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
    }else if(f.value.judul != "" && f.value.judul != null && f.value.kategori != null && f.value.resep != null && this.file != null && f.value.kategori == "Maluku dan Sekitarnya"){
      let formData = new FormData();
      formData.append("judul", f.value.judul);
      formData.append("kategori", f.value.kategori);
      formData.append("resep", f.value.resep);
      formData.append("gambar", this.file);

      let header = new Headers();
      let options = new RequestOptions({ headers : header });

      this.http.post("http://localhost:3000/api/resep", formData, options)
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
    }else if(f.value.judul != "" && f.value.judul != null && f.value.kategori != null && f.value.resep != null && this.file != null && f.value.kategori == "Bali, Nusa Tenggara dan Sekitarnya"){
      let formData = new FormData();
      formData.append("judul", f.value.judul);
      formData.append("kategori", f.value.kategori);
      formData.append("resep", f.value.resep);
      formData.append("gambar", this.file);

      let header = new Headers();
      let options = new RequestOptions({ headers : header });

      this.http.post("http://localhost:3000/api/resep", formData, options)
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
    }else if(f.value.judul != "" && f.value.judul != null && f.value.kategori != null && f.value.resep != null && this.file != null && f.value.kategori == "Papua dan Sekitarnya"){
      let formData = new FormData();
      formData.append("judul", f.value.judul);
      formData.append("kategori", f.value.kategori);
      formData.append("resep", f.value.resep);
      formData.append("gambar", this.file);

      let header = new Headers();
      let options = new RequestOptions({ headers : header });

      this.http.post("http://localhost:3000/api/resep", formData, options)
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
      console.log("error");
    }
  }

}
