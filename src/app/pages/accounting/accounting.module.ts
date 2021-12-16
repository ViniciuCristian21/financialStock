import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccountingPageRoutingModule } from './accounting-routing.module';

import { AccountingPage } from './accounting.page';
import { ModalProfitComponent } from 'src/app/components/modal-profit/modal-profit.component';
import { ModalSalesComponent } from 'src/app/components/modal-sales/modal-sales.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccountingPageRoutingModule
  ],
  declarations: [AccountingPage, ModalProfitComponent, ModalSalesComponent]
})
export class AccountingPageModule {}
