angular.module("data-service", [])

.factory("dataService", ["$http", function($http) {
	
    var urlBase="data/";
    var dataService = {};

	// get data
    dataService.getData = function(name) {
        
        // api call for a specific viz data set
        var apiUrl = urlBase + name + ".json";
            
        // call data
        return $http.get(apiUrl).then(function(data) {
            
            // return data
            return data.data;
            
        });
		
    };
    
    return dataService;

}]);