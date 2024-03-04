import {register} from "@shopify/web-pixels-extension";

const BASE_URL = 'https://tract-ordinance-circulation-them.trycloudflare.com';

register(({ analytics, browser }) => {
    analytics.subscribe('apply_discount', (event) => {
      console.log('Apply Discount Clicked');
      const url = `${BASE_URL}/pixel`;
      fetch(url, {method: 'POST'});
    });
});
