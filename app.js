const program = require('commander');
const kuromoji = require("kuromoji");

program
  .version('0.0.1')
  .option('-m, --message [message]', 'Botに投げるメッセージ')
  .option('-d, --debug', 'デバッグモード')
  .parse(process.argv);

if(!program.message){
  program.help();
}else{
  initSpeaker(program.debug)
    .then(function(speaker){
      console.log(speaker(program.message));
    })
    .catch(function(e){
      console.error(e);
    });
}

function initSpeaker(debug){
  return new Promise(function(resolve,reject){
    const builder = kuromoji.builder({
    dicPath: 'node_modules/kuromoji/dict'
    });

    builder.build(function(err, tokenizer) {
      if(err) {
        reject(err)
      }else{
        resolve(createSpeaker(tokenizer,debug));
      }
    });
  });
}

function createSpeaker(tokenizer,debug){
  return function(message){
    const tokens = tokenizer.tokenize(message);

    if(debug){
      console.log("##形態素解析結果##");
      console.dir(tokens);
    }
    /**
    * この下の50行目〜74行目を編集して、Botからの応答を変化させてみよう!
    * 例　「うん。」　=> 「うん!!」
    */
    var results = []
    .concat(
      tokens.filter(function(token){ return token.pos === "感動詞"})
      .map(function(token){ return token.basic_form + "!"})
    )
    .concat(
      tokens.filter(function(token){ return token.pos === "名詞" && token.surface_form.length > 1})
      .map(function(token){ return token.surface_form + "っていいよね!"})
    )
    .concat(
      tokens.filter(function(token){ return token.pos === "形容詞" && token.pos_detail_1 === "自立"})
      .map(function(token){ return token.basic_form + "って楽しそうだね!"})
    )
    .concat(
      tokens.filter(function(token){ return token.pos === "動詞"})
      .map(function(token){ return "そーなんだぁ!"})
    )
    .concat(
      tokens.filter(function(token){ return token.pos_detail_1 === "終助詞"})
      .map(function(token){ return token.basic_form　+ "!"})
    )
    .concat(
      tokens.filter(function(token){ return token.surface_form === "？" || token.surface_form === "?"})
      .map(function(token){ return "うん。";})
    );

    if(debug){
      console.log("##回答候補##");
      console.dir(results);
    }

    if(results.length > 0){
      return results[Math.floor(Math.random() * results.length)]
    }else{
      return "(何を言っているのか分からない...)";
    }
  }
}
