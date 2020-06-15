import { TestBed } from '@angular/core/testing';

import { TasksDataService } from './tasks-data.service';

describe('TasksDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TasksDataService = TestBed.get(TasksDataService);
    expect(service).toBeTruthy();
  });
});
