# robotsjs

Robots.js 可以用你制定的规则构建 robots.txt。（目前功能有限）
由 [FastGitORG/SpiderFucker](https://github.com/FastGitORG/SpiderFucker) 和 [Kinetix-Lee/spiderfucker-python](https://github.com/Kinetix-Lee/spiderfucker-python) 改编而来。

## 用法

### 默认（推荐）

`-i` 和 `-o` 参数具有默认值，所以你可以直接这样操作：

```bash
npm run create
```

这样会加载 `config/rules.json`，输出 `config/robots.txt`。

### 指定参数

Options:
- -i, --in [file]   Specify input file.  (default: "config/rules.json")
- -o, --out [file]  Specify output file.  (default: "config/robots.txt")
- -h, --help        display help for command

```bash
npm run create -i [Input] -o [Output]
```

### 测试

```bash
npm run test
```

### 查看帮助

```bash
npm run rjs-help
```
