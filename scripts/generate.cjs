const fs = require('fs');
const path = require('path');
const _ = require('lodash');

function readPosts (postsDir) {
  const contents = fs.readdirSync(postsDir);

  return contents.map(e => parsePost(postsDir, e));
}

function parsePost (postsDir, post) {
  const postFilePath = path.join(postsDir, post);
  const content = fs.readFileSync(postFilePath, { encoding: 'utf-8' });

  const parser = new RegExp(/(^-+[\s\S]*?-+)([\s\S]*$)/, 'm');
  const [, commits, doc] = content.match(parser);

  const title = _.trim(commits.match(/title:(.*)/)[1]);
  const banner = _.trim(commits.match(/banner:(.*)/)[1]);
  const time = _.trim(commits.match(/time:(.*)/)[1]);
  const lang = _.trim(commits.match(/lang:(.*)/)[1]);
  const fileName = path.basename(post, path.extname(post));

  return {
    file: fileName,
    title,
    banner,
    time,
    lang,
    content: doc 
  }
}


const POSTS_PATH = path.join(__dirname, '../posts');
const ANNOUNCE_PATH = path.join(__dirname, '../announces');
const PUBLIC_PATH = path.join(__dirname, '../public');


function main() {
  const posts = readPosts(POSTS_PATH);
  const announce = readPosts(ANNOUNCE_PATH);

  fs.writeFileSync(path.resolve(PUBLIC_PATH, 'content.json'), JSON.stringify(posts, undefined, 2))
  fs.writeFileSync(path.resolve(PUBLIC_PATH, 'announce.json'), JSON.stringify(announce, undefined, 2))
}

main();