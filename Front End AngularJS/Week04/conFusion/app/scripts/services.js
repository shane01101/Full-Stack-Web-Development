'use strict';

angular.module('confusionApp')
        .constant("baseURL","http://localhost:3000/")
        .service('menuFactory', ['$resource', 'baseURL', function($resource, baseURL) {
    
            this.getDishes = function(){
                return $resource(baseURL+"dishes/:id",null,  {'update':{method:'PUT' }});
            };
            
            
            this.getPromotion = function(){
                return $resource(baseURL+"promotions/:id",null,  {'update':{method:'PUT' }});
            };
    
            // implement a function named getPromotion
            // that returns a selected promotion.
           // this.getPromotion = function(index){
             //   return promotions[index];
            //};
    
                        
        }])

        .factory('corporateFactory', ['$resource', 'baseURL', function($resource, baseURL) {
    
            var corpfac = {};
    
            
            corpfac.getLeaders = function(){
                return $resource(baseURL+"leadership/:id",null,  {'update':{method:'PUT' }});
            };
     
            // Implement two functions, one named getLeaders,
            // the other named getLeader(index)
            // Remember this is a factory not a service
//            corpfac.getLeaders = function(){
//                return leadership; 
//            };
//    
//            corpfac.getLeader = function (index) {
//                return leadership[index];
//            };
            return corpfac;
    
        }])

        .factory('feedbackFactory', ['$resource', 'baseURL', function($resource, baseURL) {
    
            var feedfac = {};
    
            
            feedfac.sendFeedback = function (feedback) {
                return $resource(baseURL + "feedback/:id", null).save(feedback);
            };
     
            return feedfac;
    
        }])

;
