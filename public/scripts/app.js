// Client facing scripts here

$(document).ready(function() {

  $(".item-name").on("click", function(event) {
    //strips text from item ID (ids cannot be numbers)
    //const itemID = this.parentElement.parentElement.id.slice(6);
    event.stopImmediatePropagation()

    const itemID = this.parentElement.id.slice(6);
    console.log($(document.getElementById(`itemID${itemID}`)));

    if ($(document.getElementById(`itemID${itemID}`).getElementsByClassName('select-options')).is(":hidden")) {
      $(document.getElementById(`itemID${itemID}`).getElementsByClassName('select-options')).slideDown("slow");
    } else {
      $(document.getElementById(`itemID${itemID}`).getElementsByClassName('select-options')).slideUp("slow");
    }



    // db.query("SELECT * FROM users;")
    //   .then((result) => {
    //     console.log(result)
    //   })
    //   .catch((err) => {
    //     console.log(err.message)
    //   })

  });
})
