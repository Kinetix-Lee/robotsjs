# robotsjs

[简体中文](https://github.com/Kinetix-Lee/robotsjs/blob/master/README.zh.md)

Robots.js is a tool used to generate robots.txt according to your rules. (Limited features so far)
Adapted from [FastGitORG/SpiderFucker](https://github.com/FastGitORG/SpiderFucker) & [Kinetix-Lee/spiderfucker-python](https://github.com/Kinetix-Lee/spiderfucker-python).

## Usage

### Default (Recommended)

The `-i` and `-o` options are set by default, thus you can execute

```bash
npm run create
```

directly, which will load `config/rules.json` and makes `config/robots.txt`. 

### With Options

Options:
- -i, --in [file]   Specify input file.  (default: "config/rules.json")
- -o, --out [file]  Specify output file.  (default: "config/robots.txt")
- -h, --help        display help for command

```bash
npm run create -i [Input] -o [Output]
```

### Testing

```bash
npm run test
```

### Help

Check out help:

```bash
npm run rjs-help
```
