// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import MarkdownIt from 'markdown-it'
import announces from '../../public/announce.json'

const md = new MarkdownIt()

type Data = {
  title: string;
  banner: string;
  time: string;
  network: string;
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
    network: i.network,
    lang: i.lang,
    content: md.render(i.content),
  }))

  if (lang) {
    data = data.filter(i => i.lang === lang);
  }

  res.status(200).json(data.reverse())
}
