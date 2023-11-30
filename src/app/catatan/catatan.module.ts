import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CatatanPageRoutingModule } from './catatan-routing.module';
import { CatatanPage } from './catatan.page';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CatatanPageRoutingModule,
    HttpClientModule, // Ensure HttpClientModule is imported here

  ],
  declarations: [CatatanPage]
})
export class CatatanPageModule {}
