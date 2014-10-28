/* 
 * Author: Keyur Patel
 * Purpose: This directive uses bootstrap popover in universal way using angularjs. Moreover this popover also acts as tooltip.
 *          event mechanism is handled via popover-trigger attribute.
 * Date:Oct 14, 2014
 */

define([
    'ngApplication'
],function(app){

    function closePopover(closeBtn,popoverDiv){
        $(closeBtn).bind('click',function(){                       
                          $(popoverDiv).popover('hide');
                       });
    }
    
    function changeBgPopoverColor(element,popoverDiv){
         if ($(element).next('div.popover:visible').length){
                              // popover is visible    

                              $($(popoverDiv).children()[1]).css({
                                  'background-color': '#FFFFFF',
                                  'border-bottom': '0'                              
                              });
                            } 
    }
    
    function eventBinding(element,scope,attribute){        
       return $(element).bind({
           mouseenter: function(e) {
               if(attribute.popoverTrigger === 'hover'){
                   var popoverDiv = $(element).next();
                  changeBgPopoverColor(element,popoverDiv);
                }
           },
           mouseleave: function(e) {
               
           },
           click: function(e){
               
                   var popoverDiv = $(element).next();
                   if(scope.body){                       
                       changeBgPopoverColor(element,popoverDiv);
                       
                        // getting closeBtn handle inside popover div
                       var closeBtn = $($(popoverDiv).children()[1]).children()[0];
                       closePopover(closeBtn,popoverDiv);
                       
                   }else{
                        // getting closeBtn handle inside popover div
                       var closeBtn = $($(popoverDiv).children()[1]).children()[1];
                       closePopover(closeBtn,popoverDiv);
                   }
           },
           blur: function(e){
               
           }
        });
        
    };
    
   app.directive('keyPopover',['$compile',function($compile){
       return {
           restrict: 'A',     
           //transclude: true,
           //template: "Description <button id='btnClose' type='button' class='close' onclick='$(&quot;.popover&quot;).hide();'>&times;</button>",          
           //template: "<span ng-transclude></span>",
           link: function(scope,element,attribute,controller){
               
                   scope.tooltiplabel = "Hello Everybody this is PopOver Demo !!!";
                     
                   var popoverBodyData = "<a> {{tooltiplabel}} </a>";      
                   
                   // here body parameter from key-popover attribute determines whether to act as popover with title and body or tooltip with just body.
                   if(scope.body){
                       var getTitle = "<button type='button' class='close'>&times;</button>";
                   }else{
                       var getTitle = "<span>"+attribute.popoverTitle+"</span><button type='button' class='close'>&times;</button>";                   
                   }
                   
                   $(element).popover({
                            'placement': attribute.popoverPlacement || 'bottom',
                            'html': true,                                               
                            'title': $compile(getTitle)(scope) || '',                        
                            'content' :  $compile(popoverBodyData)(scope) || '',
                            'trigger': attribute.popoverTrigger || 'click'
                        });      
                   
               return eventBinding(element,scope,attribute);
           },
           scope:{
               body: '@keyPopover'
           }
           
       };
   }]); 
   
   return app;
});

