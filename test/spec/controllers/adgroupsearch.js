'use strict';

describe('Controller: AdgroupsearchCtrl', function () {

  // load the controller's module
  beforeEach(module('distributionGroupManagerApp'));

  var AdgroupsearchCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AdgroupsearchCtrl = $controller('AdgroupsearchCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
