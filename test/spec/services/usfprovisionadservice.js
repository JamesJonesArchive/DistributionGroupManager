'use strict';

describe('Service: UsfProvisionADservice', function () {

  // load the service's module
  beforeEach(module('distributionGroupManagerApp'));

  // instantiate service
  var UsfProvisionADservice;
  beforeEach(inject(function (_UsfProvisionADservice_) {
    UsfProvisionADservice = _UsfProvisionADservice_;
  }));

  it('should do something', function () {
    expect(!!UsfProvisionADservice).toBe(true);
  });

});
