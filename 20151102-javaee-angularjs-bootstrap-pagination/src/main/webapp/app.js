'use strict';

var app = angular.module(
  'app', 
  [ 'ngResource',
    'smart-table'
    ]);

app.factory('Service', function($resource) {
    return $resource('api/person/page');
});

app.controller('TableCtrl', function ($scope, Service) {
  $scope.callServer = function(tableState) {
    $scope.isLoading = true;
	var pagination = tableState.pagination;
	var start = pagination.start || 0;
	var number = pagination.number || 10;
	Service.get({
      page : 1+(start/number),
	  size : number
	  },
      function(pageable) {
        $scope.pageable = pageable;
        $scope.items = pageable.content;
        tableState.pagination.numberOfPages = pageable.totalPages;
        $scope.isLoading = false;
    });
  };
});
