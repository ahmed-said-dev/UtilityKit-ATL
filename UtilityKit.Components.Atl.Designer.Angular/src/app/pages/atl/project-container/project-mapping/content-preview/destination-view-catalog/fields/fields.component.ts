// import {
//   ChangeDetectorRef,
//   Component,
//   ElementRef,
//   OnInit,
//   ViewChild,
// } from '@angular/core';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { Field } from '../models/Field';
// import { ImportFieldsComponent } from './import-fields/import-fields.component';
// import { ManageFieldsComponent } from './manage-fields/manage-fields.component';
// import { FieldsService } from './fields.service';
// import { CodedDomain } from '../../coded-domain/models/CodedDomain ';
// import { DropDownListItem } from 'src/app/models/DropDownList';
// import { ActivatedRoute } from '@angular/router';
// import { catchError, of } from 'rxjs';
// import { G2DataType } from '../../network-attribute/models/G2DataType';
// import { SwalService } from 'src/app/shared/services/Swal.service';
// import { ToastrService } from 'ngx-toastr';
// import { NgxSpinnerService } from 'ngx-spinner';

// @Component({
//   selector: 'app-fields',
//   templateUrl: './fields.component.html',
//   styleUrls: ['./fields.component.scss'],
// })
// export class FieldsComponent implements OnInit {
//   @ViewChild('searchh') searchh: ElementRef;
//   @ViewChild('select') select: ElementRef;
//   utilityNetworkId: string;
//   constructor(
//     private modalService: NgbModal,
//     private cdr: ChangeDetectorRef,
//     private route: ActivatedRoute,
//     private swalService: SwalService,
//     private notificationService: ToastrService,
//     private spinnerService: NgxSpinnerService
//   ) {}

//   AssetTableId: string;
//   unId: string;
//   flag: boolean = false;
//   G2DataType = G2DataType;

//   fields: Field[] = [];
//   searchFields: Field[] = [];
//   displayFields: Field[] = [];

//   ngOnInit(): void {
//     this.flag = false;
//     this.extractAssetTableId();
//     this.extractUnId();
//     this.getFields();
//   }
//   private extractAssetTableId() {
//     this.route.queryParams.subscribe((params) => {
//       this.AssetTableId = params.assetTableId;
//     });
//   }

//   extractUnId() {
//     this.route.params.subscribe((params) => {
//       this.unId = params.unid;
//     });
//   }

//   private getFields() {
//     // this.spinnerService.show();
//     // this.FieldsService.GetFields(this.AssetTableId)
//     //   .pipe(
//     //     catchError((errorMessage) => {
//     //       return of(errorMessage);
//     //     })
//     //   )
//     //   .subscribe((fields: Field[]) => {
//     //     if (this.fields.length === 0) {
//     //       this.flag = true;
//     //     }
//     //     this.fields = fields;
//     //     this.searchFields = this.fields;
//     //     this.displayFields = this.fields;
//     //     this.cdr.detectChanges();
//     //     this.spinnerService.hide();
//     //   });
//   }

//   selectOption(event: any) {
//     const valueInput = this.searchh.nativeElement.value;
//     if (event.length > 0) {
//       this.displayFields = this.fields.filter(
//         (x) =>
//           x.type === Number(event) &&
//           x.name?.toLowerCase().includes(valueInput.toLowerCase())
//       );
//     } else {
//       this.searchFields = this.fields.filter((x) =>
//         x.name?.toLowerCase().includes(valueInput.toLowerCase())
//       );
//       this.displayFields = this.searchFields;
//     }
//   }

//   clearFilter() {
//     this.searchh.nativeElement.value = '';
//     this.select.nativeElement.value = '';
//     this.getFields();
//   }

//   search(event: any) {
//     const valueInput = this.select.nativeElement.value;
//     if (valueInput.length > 0)
//       this.searchFields = this.fields.filter(
//         (x) =>
//           x.name
//             ?.toLowerCase()
//             .includes(`${event.target.value}`.toLowerCase()) &&
//           x.type === Number(valueInput)
//       );
//     else
//       this.searchFields = this.fields.filter((x) =>
//         x.name?.toLowerCase().includes(`${event.target.value}`.toLowerCase())
//       );
//     if (event.target.value.length > 0) this.displayFields = this.searchFields;
//     else this.displayFields = this.fields;
//   }

//   openManageFields(field: Field | undefined) {
//     var fieldModal = this.modalService.open(ManageFieldsComponent);
//     fieldModal.componentInstance.Field = field;
//     fieldModal.componentInstance.assetTableId = this.AssetTableId;
//     fieldModal.componentInstance.unId = this.unId;
//     fieldModal.componentInstance.editFlag = true;

//     fieldModal.result.then((res: Field) => {
//       this.updateFieldList(res);
//     });
//   }
//   private updateFieldList(Field: Field) {
//     if (!Field?.id) return;
//     var existingFieldIndex = this.fields.findIndex((x) => x.id == Field.id);
//     var existingFieldIndexx = this.displayFields.findIndex(
//       (x) => x.id == Field.id
//     );
//     if (existingFieldIndex === -1) {
//       //not exist
//       this.fields.push(Field);
//       this.cdr.detectChanges();
//       return;
//     }
//     if (existingFieldIndexx === -1) {
//       //not exist
//       this.displayFields.push(Field);
//       this.cdr.detectChanges();
//       return;
//     }
//     this.fields[existingFieldIndex] = Field;
//     this.displayFields[existingFieldIndexx] = Field;
//     this.cdr.detectChanges();
//   }
//   openImportFields() {
//     var importFieldModal = this.modalService.open(ImportFieldsComponent);
//     importFieldModal.componentInstance.assetTableId = this.AssetTableId;
//     importFieldModal.componentInstance.importFlag = true;
//     importFieldModal.result.then((res: Field[]) => {
//       res.forEach((x) => this.updateFieldList(x));
//     });
//   }

// }
