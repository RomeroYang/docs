// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import content from '../../public/content.json'

type Data = {
  title: string;
  banner: string;
  time: string;
  lang: string[]
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data[]>
) {
  res.status(200).json(content.map(i => ({
    title: i.title,
    banner: i.banner,
    time: i.time,
    lang: Object.keys(i.content)
  })))
}
