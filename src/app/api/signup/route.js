import axios from 'axios';
import WooCommerceAPI from 'woocommerce-api';



export async function POST(req) {
  const woocommerce = new WooCommerceAPI({
    url: 'https://glam.clickable.site/',
    consumerKey: 'ck_7a38c15b5f7b119dffcf3a165c4db75ba4349a9d',
    consumerSecret: 'cs_3f70ee2600a3ac17a5692d7ac9c358d47275d6fc',
    version: 'wc/v3'
  });
  // const WooCommerceAPI = axios.create({
  //   baseURL: 'https://glam.clickable.site/',
  //   headers: {
  //     'Authorization': 'Basic ' + Buffer.from('ck_7a38c15b5f7b119dffcf3a165c4db75ba4349a9d:cs_3f70ee2600a3ac17a5692d7ac9c358d47275d6fc').toString('base64'),
  //     'Content-Type': 'application/json'
  //   }
  // });
  try {
    const { fullName, email, password, phone, countryCode } = await req.json();

    // Validate input
    if (!email || !password || !phone) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const response = await woocommerce.post('customers', {
      email,
      first_name: fullName.split(' ')[0] || '',
      last_name: fullName.split(' ')[1] || '',
      password,
      billing: {
        phone: `${countryCode}${phone}`
      }
    });

    return new Response(JSON.stringify(response.data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error occurred:', error.response ? error.response.data : error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
