hipsterTill
===========

![screenshot of page](/images/screenshot of app page.png)

We want to sell tills to local hipster coffee shop who are finally embracing the 21st century. We need a new till to replace their vintage machines - unfortunately, hipster staff are too cool to learn a new system, so we need you to build something that they will understand.

Specification
-------------

This is what a sample receipt looks like:

![a receipt](/images/receipt.jpg)

*Version 1*

To implement a system that contains the business logic to produce receipts similar to this.

Your receipt must calculate and show the correct amount of tax (in this shop's case, 8.64%), as well as correct line totals and total amount. Do not worry about calculating discounts or change yet. Consider what output formats may be suitable.

*Version 2*

- Add functionality to take payment and calculate correct change.  
- Add functionality to handle the following discounts:
	- a 5% discount on orders over $50
	- a 10% muffin discount

*Version 3*

Implement an user interface that can actually be used as a till.

User Stories
------------

```
	As a coffee selling hipster
	So that my hipster customers will remember where they got this receipt
	I would like my till receipt to show the name of my hipster coffee shop

	As a coffee selling hipster
	So that my hipster customers can see what they've ordered
	I would like my till receipt to show each hipster item they've ordered

	As a coffee selling hipster
	So that my hipster customers can see what they've ordered
	I would like my till receipt to show the price alongside each hipster item they've ordered

	As a coffee selling hipster
	So that I can charge my hipster customers the right amount
	I would like my till receipt to show me the total that my hipster customers owe

	As a coffee selling hipster
	So that I can adhere to the not-quite-hipster law
	I would like my till receipt to have a not-too-hipster 8.64% tax added on

	As a helpful hipster coffee seller
	So that I don't shortchange my hipster customers
	I would like my till receipt to show how much my hipster customers have paid and how much change they are owed

	As a business-minded hipster coffee seller
	So that my hipster customers can enjoy the financial perks of my super hipster coffee shop
	I would like to give them a 5% discount on orders over £50

	As a business-minded hipster coffee seller
	So that my hipster customers can enjoy the financial perks of my super hipster coffee shop
	I would like to give them a 10% discount on their total order price when they buy a muffin
```

Tech Used
---------

Written in Javascript and AngularJS, and tested in Jasmine and Protractor.

Running the App Locally
-----------------------

Navigate to any folder and in the command line:

```
$ git clone https://github.com/ashleigh090990/hipster-till

$ cd hipster-till

$ npm install

$ bower install
```

You may have to install node and bower before installing the dependencies.

Update Selenium Webserver with the following command:
```
$ ./node_modules/webdriver-manager/bin/webdriver-manager update
```

Once it has been updated, run it with:

```
$ ./node_modules/webdriver-manager/bin/webdriver-manager start
```

While Selenium is running, open another tab in the same directory and run HTTP-Server:

```
$ ./node_modules/http-server/bin/http-server ./
```

Then in Google Chrome, navigate to "http://localhost:8080/" and the application should load!





Running The Tests
-----------------

*Unit Tests*

To run the unit tests from the command line
```
$ ./node_modules/karma/bin/karma start spec/jasmine-unit-tests/conf.js
```

*Feature Tests*

To run the feature tests, make sure that Selenium Webserver and HTTP-Server are running (detailed above) and in another terminal tab (also in the same directory) run:

```
"$ ./node_modules/protractor/bin/protractor spec/e2e/conf.js"
```



