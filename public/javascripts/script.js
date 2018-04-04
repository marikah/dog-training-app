/*
* add event listeners to all input elements after page loaded
*/
document.addEventListener("DOMContentLoaded", function(event) {
  var checkboxes = document.getElementsByTagName('input');
  for (var i = 0; i < checkboxes.length; i++) {
    checkboxes[i].addEventListener('click', clickHandler);
  }
});

/*
* add class name to element when called
*/
function clickHandler() {
  if(this.checked) {
    this.parentNode.className = 'checked';
  } else {
    this.parentNode.className = '';
  }
}
