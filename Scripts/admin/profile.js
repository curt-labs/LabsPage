// Javascript for profile pages

$(document).ready(function () {
    // when a user clicks on the api key, we want to tell the browser to select the text of the element
    $('#APIhighlight').click(
      function () {
          SelectText('APIhighlight'); // pass in the element that will be selected
      }
    );


    // figures out the range of the text in the element and selects all the text within the range.
    function SelectText(element) {
        var text = document.getElementById(element);
        if ($.browser.msie) {
            var range = document.body.createTextRange();
            range.moveToElementText(text);
            range.select();
        } else if ($.browser.mozilla || $.browser.opera) {
            var selection = window.getSelection();
            var range = document.createRange();
            range.selectNodeContents(text);
            selection.removeAllRanges();
            selection.addRange(range);
        } else if ($.browser.safari) {
            var selection = window.getSelection();
            selection.setBaseAndExtent(text, 0, text, 1);
        } else {
            // browser is not supported and simply do not include extra functionality.
        }
    }

});