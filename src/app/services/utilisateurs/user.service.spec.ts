import { TestBed } from '@angular/core/testing';

import { UserSercice } from './user.service';

describe('UserService', () => {
  let service: UserSercice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserSercice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
