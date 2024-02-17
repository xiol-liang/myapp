#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run build

# 进入生成的文件夹
cd dist

# 如果是发布到自定义域名
# echo 'xiol.cloud/blog' > CNAME

git init
git add -A
git commit -m '部署'

# 如果发布到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:xiol-liang/myapp.git main:gh-pages

cd -
# 小更新可以先不发布，在 git 上执行 yarn dev 启动本地服务器查看
# 最后在 git 上执行 yarn deploy 进行发布、更新