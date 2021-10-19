// Client facing scripts here


$(document).ready(function() {
  $(".fa-trash").one("click", function(event) {
    //strips text from item ID (ids cannot be numbers)
    const itemID = this.parentElement.parentElement.id.slice(6);




    //alert('Hello!');
    event.stopImmediatePropagation()

  });
})
