import {dataChat} from './constants/data'

export default function handler(req, res) {
    if (req.method === 'GET') {
       const { client } = req.query
      res.status(200).json(dataChat[client]);
    } else if (req.method === 'POST') {
      // Lógica para lidar com solicitação POST
      res.status(200).json({ message: 'Received POST request!' });
    } else {
      // Lidar com outros métodos HTTP
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  }