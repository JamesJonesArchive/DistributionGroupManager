'use strict';

describe('Controller: UnauthorizedCtrl', function () {

  // load the controller's module
  beforeEach(module('distributionGroupManagerApp'));

  var UnauthorizedCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UnauthorizedCtrl = $controller('UnauthorizedCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
