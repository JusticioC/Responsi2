import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService],
    });

    service = TestBed.inject(ApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve catatan from the API via GET', () => {
    const mockCatatan = [{ id: 1, title: 'Catatan 1' }, { id: 2, title: 'Catatan 2' }];

    service.lihatCatatan().subscribe((catatan: any) => {
      expect(catatan).toEqual(mockCatatan);
    });

    const req = httpTestingController.expectOne('http://localhost/api_responsi/lihatCatatan');
    expect(req.request.method).toEqual('GET');

    req.flush(mockCatatan);
  });

  it('should add catatan via POST', () => {
    const mockCatatan = { id: 1, title: 'Catatan Baru' };

    service.tambahCatatan(mockCatatan, 'tambahCatatan').subscribe((response) => {
      expect(response).toEqual(mockCatatan);
    });

    const req = httpTestingController.expectOne('http://localhost/api_responsi/tambahCatatan');
    expect(req.request.method).toEqual('POST');

    req.flush(mockCatatan);
  });

  it('should edit catatan via PUT', () => {
    const mockCatatan = { id: 1, title: 'Catatan Diedit' };

    service.editCatatan(mockCatatan, 'editCatatan').subscribe((response) => {
      expect(response).toEqual(mockCatatan);
    });

    const req = httpTestingController.expectOne('http://localhost/api_responsi/editCatatan');
    expect(req.request.method).toEqual('PUT');

    req.flush(mockCatatan);
  });

  it('should delete catatan via DELETE', () => {
    const catatanId = 1;

    service.hapusCatatan(catatanId, 'hapusCatatan').subscribe();

    const req = httpTestingController.expectOne(`http://localhost/api_responsi/hapusCatatan/${catatanId}`);
    expect(req.request.method).toEqual('DELETE');
  });


});
