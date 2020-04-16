#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run build

# 进入构建的文件夹
cd docs/.docfree/dist

git init
git add -A
git commit -m 'deploy'
git push -f git@github.com:yinjiazeng/yinjiazeng.github.io.git master

cd -
