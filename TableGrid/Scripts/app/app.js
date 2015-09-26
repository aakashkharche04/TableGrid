var gridApp = angular.module('GridApp', ['ui.router']).run(
        ['$rootScope', '$state', '$stateParams',
            function ($rootScope, $state, $stateParams) {
                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams;
            }
        ]);

angular.module('GridApp').
    config(['$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/app.home');
            $stateProvider.state("app.home", {
                templateUrl: './TableGrid.html',
                controller: 'GridController'
            });

        }
    ]);