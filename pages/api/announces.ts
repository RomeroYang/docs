// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import announces from '../../public/announce.json'

type Data = {
  title: string;
  banner: string;
  time: string;
  lang: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data[]>
) {
  const query = req.query;
  const lang = query.lang;

  let data = announces.map(i => ({
    file: i.file, 
    title: i.title,
    banner: i.banner,
    time: i.time,
    lang: i.lang
  }))

  if (lang) {
    data = data.filter(i => i.lang === lang);
  }

  res.status(200).json(data)
}
