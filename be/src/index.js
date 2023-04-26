const _ = require('lodash');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const {createServer} = require('http');
const ofs = require('fs');
const fs = require('mz/fs');
const mime = require('mime-types');
const fsInfoCache = {};

const app = express();
const httpServer = createServer(app);
app.use(cors());
app.use(compression());
app.use(cookieParser());
app.use(express.static('public'));

async function statPath(relPath) {
  if (fsInfoCache[relPath]) {
    return fsInfoCache[relPath];
  }
  const fsStat = await fs.stat(relPath);
  const isFolder = fsStat.isDirectory()
  const info = {
    name: relPath === '/' ? '/' : _.compact(relPath.split('/')).pop(),
    isFolder: isFolder,
    path: relPath,
  }
  if (isFolder) {
    info.folders = [];
    info.files = [];
  } else {
    info.size = fsStat.size;
    info.mime = mime.lookup(relPath);
  }
  fsInfoCache[relPath] = info;
  return info;
}

const skip = (filename) => {
  return filename.startsWith('.') || filename === 'public';
}

app.get('/fs', async (req, res) => {
  console.log('GET', req.query.p);
  const relPath = req.query.p && req.query.p.toString() || './';
  const stat = await statPath(relPath);
  if (stat.isFolder) {
    const files = await fs.readdir(relPath);
    const results = []
    for (const file of files) {
      if (skip(file))
        continue;
      results.push(await statPath((relPath.endsWith('/') ? relPath : relPath + "/") + file))
    }
    res.json(results)
  } else {
    res.header('Cache-Control', 'public, max-age=31536000, immutable');
    res.header('Content-Type', stat.mime);
    ofs.createReadStream(relPath).pipe(res);
  }
})
const port = 3001
httpServer.listen(port, () => console.log(`[http server] ready at http://localhost:${port}`));
