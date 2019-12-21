var cartProducts = [
  {
    "id": 1,
    "name": "英雄牌 钢笔",
    "count": 1,
    "price": 69,
    "checked": false
  },
  {
    "id": 2,
    "name": "晨光牌 铅字笔",
    "count": 2,
    "price": 5.5,
    "checked": true
  },
  {
    "id": 3,
    "name": "晨光牌 铅笔",
    "count": 1,
    "price": 2,
    "checked": false
  },
  {
    "id": 4,
    "name": "狗熊牌 橡皮擦",
    "count": 1,
    "price": 1,
    "checked": false
  },
  {
    "id": 5,
    "name": "瑞士牌 双肩书包",
    "count": 1,
    "price": 199,
    "checked": true
  },
  {
    "id": 6,
    "name": "晨光牌 作业本",
    "count": 5,
    "price": 2.5,
    "checked": false
  }
]

window.onload = function (){
  var productList = document.getElementsByTagName("tbody")[0];

  function loadItem() {
    initializeProduct(cartProducts);
    calculateSum();
    
    productList.addEventListener("click", function (event) {
      var target = event.target;
      var tdIndex = target.parentNode;
      switch(target.className) {
        case ("add-item"):
          addProduct(tdIndex);
          calculateSubtotal(tdIndex); 
          calculateSum();
          break;
        case ("reduce-item"):
          reduceProduct(tdIndex);
          calculateSubtotal(tdIndex);
          calculateSum();
          break;
        case ("choose"):
          judgeChosenState();
          calculateSum();
          break;
        default:
          break;
      }
    });
    chooseAll.addEventListener("click", chooseAllProduct);
  }

  function initializeProduct(itemInfo) {
    itemInfo.forEach((item) => addItemToCart(item));
  }

  function addItemToCart(itemInfo) {
    var productItem = document.createElement("tr");
    var checkState = itemInfo.checked ? "checked" : "";
    var productDetail = `
      <td>
        <input class="choose" type="checkbox" name="if-choose" ${checkState} />
      </td>
      <td>${itemInfo.name}</td>
      <td><span class="item-price">${itemInfo.price}</span></td>
      <td>
        <button class="add-item">+</button>
        <span class="item-count">${itemInfo.count}</span>
        <button class="reduce-item">-</button>
      </td>
      <td><span class="small-sum">${itemInfo.price *= itemInfo.count}</span></td>
    `
    productItem.innerHTML = productDetail;
    productList.appendChild(productItem);
  }

  var productPrice = document.getElementsByClassName("item-price");
  var productCount = document.getElementsByClassName("item-count");
  var totalSum = document.getElementById("total-price");
  var subtotal = document.getElementsByClassName("small-sum");
  var testChecked = document.getElementsByName("if-choose");
  var chooseAll = document.getElementById("choose-all-btn");

  function calculateSubtotal(tdIndex) {
    var trIndex = tdIndex.parentNode;
    var index = trIndex.rowIndex - 1;
    if (productCount[index]) {
      var small = subtotal[index];
      var count = productCount[index].innerText;
      var price = productPrice[index].innerText;
      small.innerText = count * price;
    }
  }

  function calculateSum() {
    var totalCount = 0;
    var totalPrice = 0;
    for(var item = 0; item < testChecked.length; item++) {
      if(testChecked[item].checked) {
        totalPrice += parseFloat(subtotal[item].innerText),
        totalCount += parseFloat(productCount[item].innerText);
      }
    }
    totalSum.innerHTML = `共计<span class="total-count">${totalCount}</span>件商品，¥<span class="total-price">${totalPrice}</span>`;
  }
  
  function chooseAllProduct() {
    testChecked.forEach((item) => item.checked = chooseAll.checked ? true : false);
    calculateSum();
  }
  
  function addProduct(tdIndex) {
    var count = tdIndex.querySelector("span");
    count.innerText++;
  }

  function reduceProduct(tdIndex) {
    var count = tdIndex.querySelector("span");
    if (count.innerText == 1) {
      productList.removeChild(tdIndex.parentNode);
    } else {
      count.innerText--;
    }
  }

  function judgeChosenState() {
    var chosenState = true;
    var item = 0;
    while (item < testChecked.length && chosenState) {
      chosenState = testChecked[item].checked ? true : false; 
      item++;
    }
    chooseAll.checked = chosenState;
  } 

  loadItem();
  
}
