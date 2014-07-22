'use strict';

describe('Controller: GetadgroupmembersCtrl', function () {

  // load the controller's module
  beforeEach(module('distributionGroupManagerApp'));

  var GetadgroupmembersCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    GetadgroupmembersCtrl = $controller('GetadgroupmembersCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
