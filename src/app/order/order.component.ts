import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Brand } from 'src/@rentacar/model/Brand';
import { Car } from 'src/@rentacar/model/Car';
import { Model } from 'src/@rentacar/model/Model';
import { Order } from 'src/@rentacar/model/Order';
import { BrandService } from 'src/@rentacar/Service/brand.service';
import { CarService } from 'src/@rentacar/Service/car.service';
import { ModelService } from 'src/@rentacar/Service/model.service';
import { OrderService } from 'src/@rentacar/Service/order.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})


export class OrderComponent implements OnInit {

  constructor(private fb:FormBuilder,
     private CarServece: CarService,
    private BrandServece: BrandService,
     private ModelServece: ModelService,
     private orderService:OrderService,
      private  dialog:MatDialogRef<OrderComponent>
    ) { }
    Orders!:Order;
  formorder!:FormGroup;
  Nation=["Egption","American","French","German","Italian"];

  Brands!:Brand[];
  Cars!:Car[];

  GetDaitals:any=[];

masseg="";
id = 0;
IsTrue(id:number):boolean{

for(let gg of this.GetDaitals){

   if(gg.CarName ==id){
return     false;}
   }
   return true;
}

isinvalidorder=true;
samecar="";
  ngOnInit(): void {
    this.Orders={
customerName:"",
details:[],
payment:'',
transactionDate: "",
drivingLicenseNo:"",
nationality:''

    }

    this.formorder=this.fb.group({
      	TransactionDate :["",Validators.required],
      	CustomerName :["",Validators.required],
    	CustomerNationality :["",Validators.required],
     	DrivingLicenseNo :["",Validators.required],
     	Payment :["",Validators.required],

   order:this.fb.array([],[Validators.required])

    })
    this.GetAllBrands();
  }
GetAllBrands() {
    this.BrandServece.GetAllBrands().subscribe((e) => {
      this.Brands = e;
      console.log(e);
    });
  }


  ChangBrand(id: any){
console.log(this.order.length==0);

this.masseg="";
    if(this.order.length==0){

    this.GetAllModelsByIDBrand(id.value);
  }else{
  this.masseg="can select one car brand at a time you can remov all details and select again";
  }}


  ChangModel(id: any,i:number){

if(this.formorder.value.order.length>=2){
    for (let index = i-1; index <= this.formorder.value.order.length; index--) {
      console.log(this.formorder.value.order[index].carId==id.value);

      if( this.formorder.value.order[index].carId==id.value){
        this.order.controls[i].patchValue({
          carId: -1,
        }

        );
      this.samecar="The car has already been selected";
      this.isinvalidorder=true;
      break;
     }else{
       this.isinvalidorder=false;
     }

    }
  }
  }

  GetAllModelsByIDBrand(id:number) {
    this.CarServece.getAllCarsByIdBrand(id).subscribe((e) => {
      this.Cars = e;
      console.log(e);
    });
  }



  get order(){
    return this.formorder.get('order') as FormArray;
  }



addOrder(idbrand:string){

if(idbrand!='0'){
  this.masseg='';
  this.order.push(this.myOrder());


  for( let li of  this.order.controls){
    const val = JSON.stringify(li.value);
    this.GetDaitals.push(val);

  }
}else{

  this.masseg=" *Please Select Brand";}
}

myOrder(): FormGroup {
  return this.fb.group({
    carId: [0,Validators.required],
    quantity:[1,Validators.required],
    rentDuration:['',Validators.required],

  });
}

Remove(i:number){
  this.order.removeAt(i);
}


SaveData(){
  this.Orders.customerName=this.formorder.value.CustomerName;
  this.Orders.drivingLicenseNo=this.formorder.value.DrivingLicenseNo;
  this.Orders.nationality=this.formorder.value.CustomerNationality;
  this.Orders.payment=this.formorder.value.Payment;
  this.Orders.transactionDate=this.formorder.value.TransactionDate;
  this.Orders.details=this.formorder.value.order;
  console.log( this.Orders);


  this.orderService.InsertOrder( this.Orders).subscribe(e=>{
    this.Close();

  })
}
Close(){
  this.dialog.close();

}

}
