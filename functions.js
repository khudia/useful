/* SORT ARRAY OF OBJECTS BY VALUE OF KEY */
Array.prototype.sortBy = function(p,type) {
  return this.slice(0).sort(function(a,b) {
    if(type != 'desc') {
      return (a[p] > b[p]) ? 1 : (a[p] < b[p]) ? -1 : 0;
    }else{
      return (a[p] < b[p]) ? 1 : (a[p] > b[p]) ? -1 : 0;
    }  
  });
}
