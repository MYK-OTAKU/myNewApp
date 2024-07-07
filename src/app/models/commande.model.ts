export interface Commande {
  id?: number;
  aDate: string;
  aTime: string;
  TableName: string;
  WaiterName: string;
  status: string;
  orderType: string;
  total: number;
  received: number;
  change: number;
  driverID?: number;
  CustName?: string;
  CustPhone?: string;
  details: DetailCommande[];
}

export interface DetailCommande {
  CommandeId?: number;
  proID: number;
  qty: number;
  price: number;
  amount: number;
}
