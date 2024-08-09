import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      const response = await axios.post('https://glam.clickable.site/wp-json/jwt-auth/v1/token', {
        username: email,
        password
      }, {
        auth: {
          username: 'ck_7a38c15b5f7b119dffcf3a165c4db75ba4349a9d',
          password: 'cs_3f70ee2600a3ac17a5692d7ac9c358d47275d6fc'
        }
      });

      if (response.data.token) {
        res.status(200).json({ success: true, token: response.data.token });
      } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'An error occurred during login' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
