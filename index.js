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

var productList = document.getElementsByTagName("tbody")[0];
var productAttr = function (product) {
  return Object.getOwnPropertyNames(product).length;
}

function addProduct() {
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
          productDetail.innerHTML = `<input type="checkbox" name="if-choose" ${checkState} />`;
          break;
        case (1):
          productDetail.innerText = `${order.name}`;
          break;
        case (2):
          productDetail.innerText = `${order.price}`;
          break;
        case (3):
          productDetail.innerHTML = `
          <button id="add-item">+</button>
          <span>${order.count}</span>
          <button id="delete-item">-</button>
          `;
          break;
        default:
          productDetail.innerText = order.price *= order.count;
          break;
      }
    }
  }
}

addProduct();
