// catatan.page.ts
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-catatan',
  templateUrl: 'catatan.page.html',
  styleUrls: ['catatan.page.scss'],
})
export class CatatanPage implements OnInit {
  catatanList: any[] = [];

  constructor(
    private apiService: ApiService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.loadCatatan();
  }

  loadCatatan() {
    this.apiService.lihatCatatan().subscribe(
      (data: any[]) => {
        this.catatanList = data;
      },
      (error: any) => {
        console.error('Error loading catatan:', error);
      }
    );
  }

  async tambahCatatan() {
    const alert = await this.alertController.create({
      header: 'Tambah Catatan',
      inputs: [
        {
          name: 'nama',
          type: 'text',
          placeholder: 'Nama Pelanggaran',
        },
        {
          name: 'keterangan',
          type: 'text',
          placeholder: 'Keterangan Pelanggaran',
        },
      ],
      buttons: [
        {
          text: 'Batal',
          role: 'cancel',
        },
        {
          text: 'Simpan',
          handler: (data) => {
            if (data.nama && data.keterangan) {
              this.apiService.tambahCatatan(data, 'tambahCatatan').subscribe(
                () => {
                  this.loadCatatan();
                },
                (error: any) => {
                  console.error('Error adding catatan:', error);
                }
              );
            } else {
              this.showAlert('Input tidak valid. Semua kolom harus diisi.');
            }
          },
        },
      ],
    });

    await alert.present();
  }

  async editCatatan(catatan: any) {
    const alert = await this.alertController.create({
      header: 'Edit Catatan',
      inputs: [
        {
          name: 'nama',
          type: 'text',
          value: catatan.nama,
        },
        {
          name: 'keterangan',
          type: 'text',
          value: catatan.keterangan,
        },
      ],
      buttons: [
        {
          text: 'Batal',
          role: 'cancel',
        },
        {
          text: 'Simpan',
          handler: (data) => {
            if (data.nama && data.keterangan) {
              this.apiService.editCatatan(catatan.id, data).subscribe(
                () => {
                  this.loadCatatan();
                },
                (error: any) => {
                  console.error('Error editing catatan:', error);
                }
              );
            } else {
              this.showAlert('Input tidak valid. Semua kolom harus diisi.');
            }
          },
        },
      ],
    });

    await alert.present();
  }

  async hapusCatatan(catatan: any) {
    const alert = await this.alertController.create({
      header: 'Hapus Catatan',
      message: `Apakah Anda yakin ingin menghapus catatan '${catatan.nama}'?`,
      buttons: [
        {
          text: 'Batal',
          role: 'cancel',
        },
        {
          text: 'Hapus',
          handler: () => {
            this.apiService.hapusCatatan(catatan.id ,'hapusCatatan').subscribe(
              () => {
                this.loadCatatan();
              },
              (error: any) => {
                console.error('Error deleting catatan:', error);
              }
            );
          },
        },
      ],
    });

    await alert.present();
  }

  async showAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Peringatan',
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }
}
