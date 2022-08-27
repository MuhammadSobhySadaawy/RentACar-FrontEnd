export class Order {

constructor(
  public  transactionDate :string,
  public  customerName :string,
  public  nationality :string,
  public  drivingLicenseNo :string,
  public  payment :string,
  public  details :Details[],
){}
}

export class Details {

  constructor(
    public  carId :number,
    public  quantity :number,
    public  rentDuration  :Date,
  ){}
}
