(function (window, angular, undefined) {
  'use strict';
  
  /**
   * @ngdoc function
   * @name distributionGroupManagerApp.controller:AdgroupsearchCtrl
   * @description
   * # AdgroupsearchCtrl
   * Controller of the distributionGroupManagerApp
   */
  angular.module('distributionGroupManagerApp')
    .controller('AdgroupsearchCtrl',['UsfProvisionADservice','$scope','$log', function (UsfProvisionADservice,$scope,$log) {
      UsfProvisionADservice.AdGroupSearch().then(function(data){
          $scope.groups = data.groups;
      },function(errorMessage) {
          $scope.error=errorMessage;
      });
      $scope.change = function(selectedGroup) {
        //alert($scope.login);
        //// alert("My selected group is "+JSON.stringify(selectedGroup));
        UsfProvisionADservice.getAdGroupMembersWithDetails(selectedGroup).then(function(data){
          $scope.members = (data.members === 0)?[]:data.members;
          // alert(JSON.stringify($scope.members));
          $log.info($scope.members);
          UsfProvisionADservice.setMembers($scope.members);
        },function(errorMessage) {
            $scope.error=errorMessage;
        });
      };      
      $scope.hasMembers = function() {
        return UsfProvisionADservice.hasMembers();
      };      

      
    }]);
})(window, window.angular);
