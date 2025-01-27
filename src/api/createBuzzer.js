export default function handler(req, res) {
  if (req.method === 'POST') {
    // Handle request logic here
    res.status(200).json({ message: 'Buzzer created successfully' });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
