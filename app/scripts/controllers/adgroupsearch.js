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
        //alert($scope.login);
        //// alert("My selected group is "+JSON.stringify(selectedGroup));
        UsfProvisionADservice.getAdGroupMembersWithDetails(selectedGroup).then(function(data){
          $scope.members = (data.members === 0)?[]:data.members;
          $scope.removalMembers = [];
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
      $scope.removeMembers = function(group,members) {
        var deleteMembers = [];
        angular.forEach($filter('filter')(members, {'isChecked': true}, true),function(value, key) {
          this.push(value.netid);
        },deleteMembers);
        $window.alert(JSON.stringify({'group': group,'members': deleteMembers}));
        // $window.alert(JSON.stringify($filter('filter')(members, {'isChecked': true}, true)));
        
        // $window.alert(JSON.stringify(members));  
      };
      $scope.hasMembersCheckedForRemoval = function(members) {
        var count = 0;
        angular.forEach($filter('filter')(members, {'isChecked': true}, true),function(value, key) {
          count++;
        });
        return (count > 0);
      };
      $scope.addNewMember = function(group,member) {
        $window.alert(JSON.stringify({'group': group,'member': member}));
      };
      $scope.formData = {
        removalMembers: []
      };
      $scope.removalMembers = [];
      $scope.toggleMemberSelection = function(member) {
        var idx = $scope.removalMembers.indexOf(member);
    
        // is currently selected
        if (idx > -1) {
          $scope.removalMembers.splice(idx, 1);
        }
    
        // is newly selected
        else {
          $scope.removalMembers.push(member);
        }      
      };
    }]);
})(window, window.angular);
