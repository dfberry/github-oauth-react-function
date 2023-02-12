export function convertToJson(querystring:string):Record<string, any>{
    const model = querystring.split("&");
    let json = {};
  
    for (var x = 0; x < model.length; x++) {
      //break each set into key and value pair
      var _kv = model[x].split("=");
  
      console.log(_kv);
      json[_kv[0]] = _kv[1];
    }
    console.log(json);
    return json;
  };