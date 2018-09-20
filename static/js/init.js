(function($){
  var instance;
  $(function(){
    M.AutoInit();
    $('.sidenav').sidenav();
    $('.btn').sidenav();
    $('.collapsible').collapsible();
    $('.fixed-action-btn').floatingActionButton();
    $('.tooltipped').tooltip();
  }); // end of document ready
})(jQuery); // end of jQuery name space
