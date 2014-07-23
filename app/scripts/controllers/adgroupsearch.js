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
    .controller('AdgroupsearchCtrl',['UsfProvisionADservice','$scope','$window','$log','$filter', function (UsfProvisionADservice,$scope,$window,$log,$filter) {
      UsfProvisionADservice.AdGroupSearch().then(function(data){
          $scope.groups = data.groups;
      },function(errorMessage) {
          $scope.error=errorMessage;
      });
      $scope.change = function(selectedGroup) {
        $scope.$broadcast('updateGroupMembers',selectedGroup);
      };      
      $scope.hasMembers = function() {
        return UsfProvisionADservice.hasMembers();
      };      
      $scope.removeMembers = function(group,members) {
        var deleteMembers = [];
        angular.forEach($filter('filter')(members, {'isChecked': true}, true),function(value, key) {
          this.push(value.netid);
        },deleteMembers);
        UsfProvisionADservice.removeAdGroupUsers(group,deleteMembers).then(function(data) {
          if (!data.status) {
            
          }
          $log.info(data);
          $scope.$broadcast('updateGroupMembers',group);
        },function(errorMessage) {
          $scope.error=errorMessage;
        });
      };
      $scope.hasMembersCheckedForRemoval = function(members) {
        var count = 0;
        angular.forEach($filter('filter')(members, {'isChecked': true}, true),function(value, key) {
          count++;
        });
        return (count > 0);
      };
      $scope.addNewMember = function(group,member) {
        UsfProvisionADservice.addAdGroupUser(group,member).then(function(data) {
          if (data.status) {
            $scope.addMember = '';
            $scope.$broadcast('updateGroupMembers',group);
          } else {
            $scope.error='Could not add \''+member+'\' to the distribution group \''+group+'\'.';
          }
        },function(errorMessage) {
          $scope.error=errorMessage;
        });
      };
      $scope.$on('updateGroupMembers', function(event,group) {
        UsfProvisionADservice.getAdGroupMembersWithDetails(group).then(function(data){
          $scope.members = (data.members === 0)?[]:data.members;
          $log.info($scope.members);
          UsfProvisionADservice.setMembers($scope.members);
        },function(errorMessage) {
          $scope.error=errorMessage;
        });
      }); 
    }]);
})(window, window.angular);
