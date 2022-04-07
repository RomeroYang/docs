const fs = require('fs');
const path = require('path');
const _ = require('lodash');

function readPosts (postsDir) {
  const contents = fs.readdirSync(postsDir);

  return contents.map(parsePost);
}

function parsePost (post) {
  const postFilePath = path.join(POSTS_PATH, post);
  const content = fs.readFileSync(postFilePath, { encoding: 'utf-8' });

  const parser = new RegExp(/(^-+[\s\S]*?-+)([\s\S]*$)/, 'm');
  const [, commits, doc] = content.match(parser);

  const title = _.trim(commits.match(/title:(.*)/)[1]);
  const banner = _.trim(commits.match(/banner:(.*)/)[1]);
  const time = _.trim(commits.match(/time:(.*)/)[1]);
  const fileName = path.basename(post, path.extname(post));
  const langDoc = doc.match(/-+[\s\S]*?-+/mg);

  const textObj = {};

  for (let i of langDoc) {
    const temp= i.split(/\r\n|\r|\n/);
    const lang = _.trim(temp[1].match(/lang:(.*)/)[1]);
    const text = temp.slice(2, temp.length - 1).join('\r\n');

    textObj[lang] = text;
  }

  return {
    file: fileName,
    title,
    banner,
    time,
    content: textObj
  }
}


const POSTS_PATH = path.join(__dirname, '../posts');
const PUBLIC_PATH = path.join(__dirname, '../public');


function main() {
  const posts = readPosts(POSTS_PATH);

  fs.writeFileSync(path.resolve(PUBLIC_PATH, 'content.json'), JSON.stringify(posts, undefined, 2))
}

main();