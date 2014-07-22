(function (window, angular, undefined) {
  'use strict';
  
  /**
   * @ngdoc service
   * @name distributionGroupManagerApp.UsfProvisionADservice
   * @description
   * # UsfProvisionADservice
   * Factory in the distributionGroupManagerApp.
   */
  angular.module('distributionGroupManagerApp')
    .factory('UsfProvisionADservice',['$resource','tokenAuth','$log','$rootScope', function ($resource,tokenAuth,$log,$rootScope) {
      // Service logic
      // ...
      var distGroupMgrResource = $resource(tokenAuth.getResourceUrl('distGroupMgr'),{},{
          'AdGroupSearch': {
            method: 'POST', params: {'service': 'AdGroupSearch'},responseType: 'json', headers: { 'X-Auth-Token': tokenAuth.getStoredToken('distGroupMgr') },
              transformResponse: function(data, headersGetter) {
                var headers = headersGetter();
                $log.info(headers);
                // Bail on 401 detected response without transforming it
                if ('tokenService' in data) {
                  return data;
                }
                var groups = [];
                angular.forEach(data.groups, function(v, k) {
                  this.push({ value: k,label: v });
                }, groups);
                $log.info({groups: groups});
                return {groups: groups};
              }
          },
          'getAdGroupMembers': {
            method: 'POST', params: {'service': 'getAdGroupMembers'},responseType: 'json', headers: { 'X-Auth-Token': tokenAuth.getStoredToken('distGroupMgr') }
          },
          'getAdAccountDetails': {
            method: 'POST', params: {'service': 'getAdAccountDetails'},responseType: 'json', headers: { 'X-Auth-Token': tokenAuth.getStoredToken('distGroupMgr') }
          },
          'getAdGroupMembersWithDetails': {
            method: 'POST', params: {'service': 'getAdGroupMembersWithDetails'},responseType: 'json', headers: { 'X-Auth-Token': tokenAuth.getStoredToken('distGroupMgr') }
          },
          'removeAdGroupUser': {
            method: 'POST', params: {'service': 'removeAdGroupUser'},responseType: 'json', headers: { 'X-Auth-Token': tokenAuth.getStoredToken('distGroupMgr') }
          },
          'addAdGroupUser': {
            method: 'POST', params: {'service': 'addAdGroupUser'},responseType: 'json', headers: { 'X-Auth-Token': tokenAuth.getStoredToken('distGroupMgr') }
          }
      });
  
      // Public API here
      return {
        AdGroupSearch: function (pattern) {
          return distGroupMgrResource.AdGroupSearch({pattern: pattern}).$promise;
        },
        getAdGroupMembers: function (group) {
          return distGroupMgrResource.getAdGroupMembers({group: group}).$promise;
        },
        getAdAccountDetails: function (member) {
          return distGroupMgrResource.getAdAccountDetails({member: member}).$promise;
        },
        getAdGroupMembersWithDetails: function (group) {
          return distGroupMgrResource.getAdGroupMembersWithDetails({group: group}).$promise;
        },
        removeAdGroupUser: function (group,member) {
          return distGroupMgrResource.removeAdGroupUser({group: group,member: member}).$promise;
        },
        addAdGroupUser: function (group,member) {
          return distGroupMgrResource.addAdGroupUser({group: group,member: member}).$promise;
        },
        setMembers: function(members) {
          this.members = members;
          $rootScope.$broadcast('handleBroadcast');
          // $rootScope.$emit('handleBroadcast');
        },
        getMembers: function() {
          return this.members;
        },
        hasMembers: function() {
          return ('members' in this)?(this.members.length > 0):false;
        }
      };
    }]);
})(window, window.angular);
