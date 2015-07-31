describe('Till receipt page', function() {
  var cafeLatteOptionSelected = element(by.cssContainingText('option', 'Cafe Latte'));
  var cappucinoOptionSelected = element(by.cssContainingText('option', 'Cappucino'));
  var tiramisuOptionSelected = element(by.cssContainingText('option', 'Tiramisu'));
  var muffinOptionSelected = element(by.cssContainingText('option', 'Chocolate Chip Muffin'));
  var quantityOfFiveSelected = element(by.cssContainingText('option', '5'));
  var quantityOfTwoSelected = element(by.cssContainingText('option', '2'));
  var quantityOfOneSelected = element(by.cssContainingText('option', '1'));
  var addItemToOrder = element(by.id('addToOrderBtn'));
  var preTaxTotal = element(by.id('preTaxTotal'));
  var taxTotal = element(by.id('taxTotal'));
  var postTaxTotal = element(by.id('postTaxTotal'));

  beforeEach(function() {
    browser.get('http://localhost:8080');
  });

  it('should have a title', function() {
    expect(browser.getTitle()).toEqual('hipsterTill')
  });

  it('should have the menu on the page', function() {
    expect(element(by.id('menu')).getText()).toContain('Item Price');
    expect(element.all(by.id('menu-key')).getText()).toContain('Cafe Latte');
  });

  it('should let the cashier select the item and quantity for the order', function() {
    expect(cafeLatteOptionSelected.isPresent()).toBeTrue;
    expect(quantityOfTwoSelected.isPresent()).toBeTrue;
  });

  it('should calculate the pre tax total, tax and the post tax total after an order is made', function() {
    cafeLatteOptionSelected.click();
    quantityOfTwoSelected.click();
    addItemToOrder.click();
    expect(preTaxTotal.getText()).toEqual('£ 9.5');
    expect(taxTotal.getText()).toEqual('£ 0.82');
    expect(element(by.id('postTaxTotal')).getText()).toEqual('£ 10.32');
  });

  it('should show 4 cappuccinos and their prices alongside each one on receipt when "Added to order"', function() {
    cappucinoOptionSelected.click();
    quantityOfOneSelected.click();
    addItemToOrder.click();
    expect(element(by.css('.receipt')).getText()).toContain('Cappucino £ 3.85')
  });

  it('should calculate the discount when the order is over £50', function() {
    tiramisuOptionSelected.click();
    quantityOfFiveSelected.click();
    addItemToOrder.click();
    expect(preTaxTotal.getText()).toEqual('£ 54.15');
    expect(taxTotal.getText()).toEqual('£ 4.68');
    expect(element(by.id('postTaxTotal')).getText()).toEqual('£ 58.83');
  });

  it('should calculate the discount when a muffin is added to the order', function() {
    muffinOptionSelected.click();
    quantityOfOneSelected.click();
    addItemToOrder.click();
    expect(preTaxTotal.getText()).toEqual('£ 3.65');
    expect(taxTotal.getText()).toEqual('£ 0.32');
    expect(postTaxTotal.getText()).toEqual('£ 3.97');
  });
});