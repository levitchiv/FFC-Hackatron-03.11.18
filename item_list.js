function itemList (arr){
  var table = '<table id="tableList" style="width:80%"></table>';
  document.getElementById('wrapper').innerHTML = table;
  var stringItemList = "<tr><th>Category</th><th>Item Name</th><th>Who Foundit</th><th>Email</th><th>Phone</th><th>Description</th></tr>";

  arr.forEach(function(item){
    var stringItem = "<tr><td>" + item.category + "</td><td>"+ item.item_name +"</td><td>"+ item.name +"</td><td>"+ item.email +"</td><td>"+ item.phone +"</td><td>"+ item.description +"</td></tr>";
    stringItemList = stringItemList + stringItem;
  });

    document.getElementById('tableList').innerHTML = stringItemList;

}
