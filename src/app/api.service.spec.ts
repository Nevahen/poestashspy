import { TestBed, inject} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { HttpTestingController } from '@angular/common/http/testing';

describe('ApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiService],
      imports:[HttpClientTestingModule]
    });
  });

  it('should be created', inject([ApiService,HttpTestingController], (service: ApiService, httpMock: HttpTestingController) => {
    expect(service).toBeTruthy();
  }));
});
