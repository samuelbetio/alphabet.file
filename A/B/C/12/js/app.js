/* globals angular */
console.log('app.js was loaded.');

var CalcApp = angular.module('CalcApp', []);
CalcApp.controller('calc', ['$scope', function($scope) {
  $scope.display = 0;
  $scope.num1 = undefined;
  $scope.num2 = undefined;
  $scope.operator = undefined;
  $scope.equalClicked = false;

  $scope.numFunct = function(key) {
    if ($scope.equalClicked) {
      clearInputs();
      clearChecks();
      $scope.display = key;
    }
    else if ($scope.operator && $scope.num1) {
      $scope.display += '' + key;
    }
    else if ($scope.display == 0) {
      $scope.display = key;
    }
    else if (!$scope.num1) {
      $scope.display += '' + key;
    }
  }

  $scope.opFunct = function(operation) {
    if ($scope.num1 || $scope.operator) {
      return;
    } else {
      console.log('here');
      $scope.num1 = parseInt($scope.display);
      $scope.display += ' ' + operation + ' ';
      $scope.operator = operation;
    }

    if ($scope.equalClicked) $scope.equalClicked = false;
  }

  $scope.equalFunct = function() {
      if ($scope.num1 && $scope.operator && $scope.display) {
        $scope.equalClicked = true;
        $scope.display = parseInt($scope.display.split(' ')[2]);
        switch ($scope.operator) {
          case '+':
            $scope.display += $scope.num1;
            break;
          case '-':
            $scope.display = $scope.num1 - $scope.display;
            break;
          case '/':
            $scope.display = $scope.num1 / $scope.display;
            break;
          case '*':
            $scope.display *= $scope.num1;
        }
        clearInputs();
      }
    };

    $scope.clearAll = function() {
      clearInputs();
      clearChecks();
    };

    function clearInputs() {
      $scope.num1 = undefined;
      $scope.num2 = undefined;
      $scope.operator = undefined;
    }

    function clearChecks() {
      $scope.equalClicked = false;
      $scope.display = 0;
    }

}]);
