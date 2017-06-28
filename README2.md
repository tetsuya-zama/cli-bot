# cli-bot

## 概要

cli(CommandLine Interface)で応答してくれる初歩的な日本語Botです。

## セットアップ

```bush
$ npm install
# => 関連ライブラリがインストールされます
```

## 使い方

### クイックスタート

```bush
$ node app.js -m "こんばんは。今は勉強会の真っ最中です。"
# => botが何て返答してくれるかお楽しみ!!
```

### パラメータ

| フル | 短縮 | 必須 | 概要 | 例 |
|:---|:---|:---|:---|:---|
| --message [message] | -m [message] | ○ | Botに投げるメッセージ | node app.js -m "こんにちは" |
| --debug | -d | | デバッグモード<br> 形態素解析の結果と回答の候補を表示する | node app.js -m "すもももももももものうち" -d |  
