// export class Todo {
//   UniqueID: number;
//   Name: string;
//   Description: string;
//   DueDate: string;
//   Status: string;

//   constructor(
//     UniqueID: number,
//     Name: string,
//     Description: string,
//     DueDate: string,
//     Status: string,
//   ){
//     this.UniqueID=UniqueID;
//     this.Name=Name;
//     this.Description=Description;
//     this.DueDate=DueDate;
//     this.Status=Status;
//   } 
// }

export interface Todo {
  UniqueID: number;
  Name: string;
  Description: string;
  DueDate: string;
  Status: string;
  DueDayCount:number;
}