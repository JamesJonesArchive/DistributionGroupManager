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
    .controller('AdgroupsearchCtrl',['UsfProvisionADservice','$scope','$rootScope','$window','$log','$filter','$modal', function (UsfProvisionADservice,$scope,$rootScope,$window,$log,$filter,$modal) {
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
        angular.forEach($filter('filter')(members, {'isChecked': true}, true),function(value) {
          this.push(value.netid);
        },deleteMembers);
        UsfProvisionADservice.removeAdGroupUsers(group,deleteMembers).then(function(data) {
          if (!data.status) {
            $scope.openStatusModal('Removal Errors',['status','member'],$filter('filter')(data.log, {'status': false}, true));
          }          
          $log.info(data);
          $scope.$broadcast('updateGroupMembers',group);
        },function(errorMessage) {
          $scope.openStatusModal('Removal Errors',['status','error'],[ {'status': 'error','error': errorMessage} ]);
        });
      };
      $scope.hasMembersCheckedForRemoval = function(members) {
        var count = 0;
        angular.forEach($filter('filter')(members, {'isChecked': true}, true),function() {
          count++;
        });
        return (count > 0);
      };
      $scope.addNewMember = function(group,member) {
        UsfProvisionADservice.addAdGroupUser(group,member).then(function(data) {
          if (data.status) {
            $scope.addMember = '';
            $scope.displayNameORemail = '';
            $rootScope.$broadcast('updateGroupMembers',group);
          } else {
            $scope.openStatusModal('Removal Errors',['status','member'],$filter('filter')(data.log, {'status': false}, true));
          }
        },function(errorMessage) {
          $scope.openStatusModal('Removal Errors',['status','error'],[ {'status': 'error','error': errorMessage} ]);
        });
      };
      $scope.searchDisplayNameOREmail = function(group,displayNameORemail) {
        UsfProvisionADservice.searchDisplayNameORemail(displayNameORemail).then(function(data) {
          $scope.openSearchResultsModal(group,data.matches);
        },function(errorMessage) {
          $scope.openStatusModal('Removal Errors',['status','error'],[ {'status': 'error','error': errorMessage} ]);
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
      $scope.closeStatusModel = function() {
        $rootScope.statusModal.dismiss('cancel');
      };
      $scope.openStatusModal = function(title,headers,log) {
        $rootScope.statusModalTitle = title;
        $rootScope.statusLogs = log;
        $rootScope.statusHeaders = headers;
        $rootScope.statusModal = $modal.open({
          templateUrl: 'statusModalContent.html',
          controller: 'AdgroupsearchCtrl',
          size: 'sm'
        });        
      };
      $scope.openSearchResultsModal = function(group,matches) {
        $rootScope.searchMatches = matches;
        $rootScope.searchGroup = group;
        $rootScope.searchResultsModal = $modal.open({
          templateUrl: 'searchDisplayNameOREmailContent.html',
          controller: 'AdgroupsearchCtrl',
          size: 'lg'
        });        
        
      };
      $scope.closeSearchResultsModel = function() {
        $rootScope.searchResultsModal.dismiss('cancel');
      };
      $scope.addMemberFromSearchResults = function(group,member,e) {
        if (e) {
          e.preventDefault();
          e.stopPropagation();
        }
        $scope.closeSearchResultsModel();        
        $scope.addNewMember(group,member);
      };
    }]);
})(window, window.angular);
