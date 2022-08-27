import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Brand } from 'src/@rentacar/model/Brand';
import { Car } from 'src/@rentacar/model/Car';
import { Model } from 'src/@rentacar/model/Model';
import { BrandService } from 'src/@rentacar/Service/brand.service';
import { CarImagesService } from 'src/@rentacar/Service/car-images.service';
import { CarService } from 'src/@rentacar/Service/car.service';
import { ModelService } from 'src/@rentacar/Service/model.service';
import { OrderComponent } from '../order/order.component';

@Component({
  selector: 'app-car-filter',
  templateUrl: './car-filter.component.html',
  styleUrls: ['./car-filter.component.scss']
})
export class CarFilterComponent implements OnInit {
  constructor(
    private rout: Router,
    private CarServece: CarService,
    private BrandServece: BrandService,
    private ModelServece: ModelService,
    private CarImagesServece: CarImagesService,
    private dialog:MatDialog
  ) {}
  pages!: number;
  itemsPerPage = 6;
  curr: number = 1;
  totalitems!: number;
  errorMSG: any;
  Brands!: Brand[];
  Models!: Model[];
  search:any;searchdate:any;
  Cars!:Car[];
  gotoProductDetails = (ID: Number) => {
    this.rout.navigate(['details/', ID]);
  };


  userID="";
  ngOnInit(): void {
    this.GetAllBrands();
    this.getAllCars();

  }


  GetChangModels(id:number){
    this.getAllCarsByIdBrand(id);
    this.GetAllModelsByIDBrand(id);
  }

  GetByModelAllCars(id:number){
    this.getAllCarsByIdModel(id);
  }




  addcart(id?:number){

    const dialogRef = this.dialog.open(OrderComponent, {
      width: '100%',data:id
      // data: {name: this.name, animal: this.animal},
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      // this.animal = result;
    });


  }




  getAllCars() {
    this.CarServece.GetAllCars().subscribe((e) => {
      this.Cars = e;
      console.log( this.Cars);
    });
  }
  getAllCarsByIdModel(id:number) {
    this.CarServece.getAllCarsByIdModel(id).subscribe((e) => {
      this.Cars = e;
    });
  }
  getAllCarsByIdBrand(id:number) {
    this.CarServece.getAllCarsByIdBrand(id).subscribe((e) => {
      this.Cars = e;
    });
  }





  GetAllModelsByIDBrand(id:number) {
    this.ModelServece.GetAllModelsByIDBrand(id).subscribe((e) => {
      this.Models = e;
    });
  }

  GetAllBrands() {
    this.BrandServece.GetAllBrands().subscribe((e) => {
      this.Brands = e;
      console.log(e);
    });
  }




}
