/*
input:  document.getElementById('form1') //dom element
output: serialized string of form elements with names and values or array of objects if second param of function is true
*/
function(form,toArray=false) {
    var serialized = [];
    let arr = [];
    for (var i = 0; i < form.elements.length; i++) {
      var field = form.elements[i];
      if (!field.name || field.disabled || field.type === 'file' || field.type === 'reset' || field.type === 'submit' || field.type === 'button') continue;
      if (field.type === 'select-multiple') {
        for (var n = 0; n < field.options.length; n++) {
          if (!field.options[n].selected) continue;
          serialized.push(encodeURIComponent(field.name) + "=" + encodeURIComponent(field.options[n].value));
          arr.push({name:field.name,value:field.options[n].value})
        }
      } else if ((field.type !== 'checkbox' && field.type !== 'radio') || field.checked) {
        serialized.push(encodeURIComponent(field.name) + "=" + encodeURIComponent(field.value));
        arr.push({name:field.name,value:field.value})
      }
    }
    if(toArray){
      return arr
    }else{
       return serialized.join('&');
    }
  }
