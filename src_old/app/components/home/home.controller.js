HomeController.$inject = ["$rootScope", "$state"]
function HomeController($rootScope, $state) {
  if ($rootScope.initialized === false) {
    $state.go('setup.step1');
  }
  $rootScope.$watch('initialized', function(newValue, oldValue){
    if (newValue === false) {
      $state.go('setup.step1');
    }
  });
}

module.exports = HomeController;
