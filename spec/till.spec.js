describe('Till receipt', function() {

  beforeEach(module('TillReceiptApp'));

  it('knows the name of its shop', inject(function($controller, $rootScope) {
    var tillReceipt = $controller('TillReceiptController', {
      $scope : $rootScope
    });
    expect(tillReceipt.shopName).toEqual("The Coffee Connection");
  }));

  it('starts off with no items on it', inject(function($controller, $rootScope) {
    var tillReceipt = $controller('TillReceiptController', {
      $scope : $rootScope
    });
    expect(tillReceipt.orderItemsWithPrices).toEqual([]);
  }));

  it('shows the name of each individual item', inject(function($controller, $rootScope) {
    var tillReceipt = $controller('TillReceiptController', {
      $scope : $rootScope
    });
    tillReceipt.addToOrder('Cafe Latte');
    expect(tillReceipt.orderItemsWithPrices[0]).toEqual({'Cafe Latte': 4.75 });
  }));

  it('shows the price alongside each item', inject(function($controller, $rootScope) {
    var tillReceipt = $controller('TillReceiptController', {
      $scope : $rootScope
    });
    tillReceipt.addToOrder('Cafe Latte');
    expect(tillReceipt.orderItemsWithPrices).toEqual([{'Cafe Latte': 4.75 }]);
  }));

  it('will not let you add something that the coffee shop doesn\'t sell', inject(function($controller, $rootScope) {
    var tillReceipt = $controller('TillReceiptController', {
      $scope : $rootScope
    });
    tillReceipt.addToOrder('Definitely not on the menu...' ,1);
    expect(tillReceipt.orderItemsWithPrices).toEqual([]);
  }));

  it('lets you add different items to order', inject(function($controller, $rootScope) {
    var tillReceipt = $controller('TillReceiptController', {
      $scope : $rootScope
    });
    tillReceipt.addToOrder('Cafe Latte');
    tillReceipt.addToOrder('Flat White');
    expect(tillReceipt.orderItemsWithPrices).toEqual([{'Cafe Latte': 4.75 },{'Flat White': 4.75 }]);
  }));

  it('adds up the total of each item on the order before tax', inject(function($controller, $rootScope) {
    var tillReceipt = $controller('TillReceiptController', {
      $scope : $rootScope
    });
    tillReceipt.addToOrder('Cafe Latte');
    tillReceipt.addToOrder('Flat White');
    tillReceipt.confirmOrder();
    expect(tillReceipt.confirmedPreTaxOrderTotal).toEqual(9.50);
  }));

  it('calculates 8.64% tax to 2dp and adds that to the total', inject(function($controller, $rootScope) {
    var tillReceipt = $controller('TillReceiptController', {
      $scope : $rootScope
    });
    tillReceipt.addToOrder('Cafe Latte');
    tillReceipt.addToOrder('Flat White');
    tillReceipt.confirmOrder();
    expect(tillReceipt.calculatedTax).toEqual(0.82);
    expect(tillReceipt.confirmedPostTaxOrderTotal).toEqual(10.32);
  }));

  it('records how much the customer has paid and calculates the change due back to the customer', inject(function($controller, $rootScope) {
    var tillReceipt = $controller('TillReceiptController', {
      $scope : $rootScope
    });
    tillReceipt.addToOrder('Cafe Latte');
    tillReceipt.addToOrder('Flat White');
    tillReceipt.confirmOrder();
    tillReceipt.customerPayment(20.00);
    expect(tillReceipt.changeDueToCustomer).toEqual(9.68);
  }));

  it('throws an error if the customer has underpaid', inject(function($controller, $rootScope) {
    var tillReceipt = $controller('TillReceiptController', {
      $scope : $rootScope
    });
    tillReceipt.addToOrder('Cafe Latte');
    tillReceipt.addToOrder('Flat White');
    tillReceipt.confirmOrder();
    expect(function(){tillReceipt.customerPayment(2.00)}).toThrow(new Error("This amount does not cover the bill"));
  }));

  it('lets you add multiple amounts of the same item to the order', inject(function($controller, $rootScope) {
    var tillReceipt = $controller('TillReceiptController', {
      $scope : $rootScope
    });
    tillReceipt.addToOrder('Cafe Latte', 2);
    expect(tillReceipt.orderItemsWithPrices).toEqual([{'Cafe Latte': 4.75 },{'Cafe Latte': 4.75 }]);
  }));

  it('adds a 5% discount on orders over £50', inject(function($controller, $rootScope) {
    var tillReceipt = $controller('TillReceiptController', {
      $scope : $rootScope
    });
    tillReceipt.addToOrder('Cafe Latte', 11);
    tillReceipt.confirmOrder();
    expect(tillReceipt.confirmedPostTaxOrderTotal).toEqual(53.93);
  }));

  it('adds a 10% discount to the order total if the hipster customer buys a muffin', inject(function($controller, $rootScope) {
    var tillReceipt = $controller('TillReceiptController', {
      $scope : $rootScope
    });
    tillReceipt.addToOrder('Cafe Latte');
    tillReceipt.addToOrder('Blueberry Muffin');
    tillReceipt.confirmOrder();
    expect(tillReceipt.confirmedPostTaxOrderTotal).toEqual(8.60);
  }));
});