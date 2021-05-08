import { TestBed } from '@angular/core/testing';

import { MessagesservivesService } from './messagesservives.service';

describe('MessagesservivesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MessagesservivesService = TestBed.get(MessagesservivesService);
    expect(service).toBeTruthy();
  });
});
