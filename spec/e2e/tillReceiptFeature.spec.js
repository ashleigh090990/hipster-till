describe('Till receipt page', function() {
  var cafeLatteOptionSelected = element(by.cssContainingText('option', 'Cafe Latte'));
  var quantityOfTwoSelected = element(by.cssContainingText('option', '2'));
  var quantityOfOneSelected = element(by.cssContainingText('option', '1'));
  var addItemToOrder = element(by.id('addToOrderBtn'));
  var preTaxTotal = element(by.id('preTaxTotal'));
  var taxTotal = element(by.id('taxTotal'));
  var cappucinoOptionSelected = element(by.cssContainingText('option', 'Cappucino'));

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

  // add tests for the calculation of discounts...
});