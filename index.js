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
  var productAttr = function (product) {
    return Object.getOwnPropertyNames(product).length;
  }
  function initializeProduct() {
    for(var item = 0; item < cartProducts.length; item++) {
      var order = cartProducts[item];
      var productItem = document.createElement("tr");
      productList.appendChild(productItem);
      for(var attr = 0; attr < productAttr(order); attr++) {
        var productDetail = document.createElement("td");
        productItem.appendChild(productDetail);
        switch(attr) {
          case (0):
            var checkState = order.checked ? "checked" : "";
            productDetail.innerHTML = `<input class="choose" type="checkbox" name="if-choose" ${checkState} />`;
            break;
          case (1):
            productDetail.innerText = `${order.name}`;
            break;
          case (2):
            productDetail.innerHTML = `<span class="item-price">${order.price}</span>`;
            break;
          case (3):
            productDetail.innerHTML = `
              <button class="add-item">+</button>
              <span class="item-count">${order.count}</span>
              <button class="reduce-item">-</button>
            `;
            break;
          default:
            productDetail.innerHTML = `<span class="small-sum">${order.price *= order.count}</span>`;
            break;
        }
      }
    }
  }

  initializeProduct();

  var sum = document.getElementById("total-price");
  var testChecked = document.getElementsByName("if-choose");
  var productPrice = document.getElementsByClassName("item-price");
  var productCount = document.getElementsByClassName("item-count");
  var smallSum = document.getElementsByClassName("small-sum");
  var chooseAll = document.getElementById("choose-all-btn");

  function calculateSmallSum(td) {
    var tr = td.parentNode;
    var index = tr.rowIndex - 1;
    if (productCount[index]) {
      var small = smallSum[index];
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
        totalPrice += parseFloat(smallSum[item].innerText),
        totalCount += parseFloat(productCount[item].innerText);
      }
    }
    sum.innerHTML = `共计<span class="total-count">${totalCount}</span>件商品，<span class="total-price">${totalPrice}</span>¥`;
  }
  calculateSum();
  
  chooseAll.addEventListener("click", chooseAllProduct);
  function chooseAllProduct() {
    testChecked.forEach((item) => item.checked = chooseAll.checked ? true : false);
    calculateSum();
  }
  
  function addProduct(td) {
    var count = td.querySelector("span");
    count.innerText++;
  }

  function reduceProduct(td) {
    var count = td.querySelector("span");
    if (count.innerText == 1) {
      productList.removeChild(td.parentNode);
    } else {
      count.innerText--;
    }
  }

  function judgeChosenState() {
    var chosenState = false;
    for(var item = 0; item < testChecked.length; item++) {
      if(testChecked[item].checked) {
        chosenState = true;
      } else {
        chosenState = false;
        break;
      }
    }
    chooseAll.checked = chosenState;
  }

  productList.addEventListener("click", function (e) {
    var target = e.target;
    var td = target.parentNode;
    switch(target.className) {
      case ("add-item"):
        addProduct(td);
        calculateSmallSum(td); 
        calculateSum();
        break;
      case ("reduce-item"):
        reduceProduct(td);
        calculateSmallSum(td);
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
}
