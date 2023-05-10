import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmpolyeeService } from '../services/empolyee.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DIALOG_DATA } from '@angular/cdk/dialog';

@Component({
  selector: 'app-add-edit-component',
  templateUrl: './add-edit-component.component.html',
  styleUrls: ['./add-edit-component.component.css']
})
export class AddEditComponentComponent implements OnInit {



  education: string[]=[
'DIPLOMA',
 'GRADUATE',
 'POST-GRADUATE',
 'PHD',
  ];
  empForm: FormGroup;
constructor(private _fb:FormBuilder,
   private _empService:EmpolyeeService,
   private _dialogRef: MatDialogRef<AddEditComponentComponent>,
   @Inject(MAT_DIALOG_DATA) public data:any ) {
  this.empForm=this._fb.group({
    firstname:'',
    lastname:'',
    email:'',
    pincode:'',
    education:'',
    company:'',
  });
}
ngOnInit():void{
  this.empForm.patchValue(this.data);
};
onFormSubmit(){
  (this.empForm.valid);{
    if (this.data) {
      this._empService.updateEmpolyee(this.data.id,this.empForm.value).subscribe({
        next: (val:any) =>{
          alert('Employee updated Susscessfully')
          this._dialogRef.close(true);
        },
        error:(err:any) =>{
          console.error(err);
        },
  
      });

    } else  {
      this._empService.addEmpolyee(this.empForm.value).subscribe({
      next: (val:any) =>{
        alert('Employee Added Susscessfully')
        this._dialogRef.close(true);
      },
      error:(err:any) =>{
        console.error(err);
      },

    })
  };
  };
};
}