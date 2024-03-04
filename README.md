### Implementation

* Build a checkout UI extension which shows the cart value, a dynamic discount amount based on a customer metafield, and a button which can apply the discount
  * A Shopify customer metafield was created
  * A Shopify Checkout UI extension was created and the customer metafield was pulled via extension configuration

* Apply the discount with a discount function but exclude a specific collection which is set in the UI extension setting
  * A Order Discount Shopify Function was implemented
  * When the Checkout UI extension button is clicked then an attribute is added to the cart. The Discount Function reads from the carts' attributes and applies the discount accordingly.
  * There is a config setting in the UI extension, which is a text field. If the field is the same value as the products' type then the button is disabled. This assumes that products' with the same type are automatically added to the collection.

* If the cart is less than $100 as a result of the discount, use checkout validation to block the checkout until the total is more than $100
  * A Cart Validation Function was implemented to handle this.

* Use a custom pixel to add a record to a db everytime the button is clicked
  * Using prisma a new database table was created 
  * When the Checkout UI button is clicked then an analytics event is published
  * A Web Pixel was implemented, which will listen to the published event
  * The Pixel will make a request to the backend of the app and add a record to the new dB table