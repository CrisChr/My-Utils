const Browser = (function(window){
  let document = window.document,
    navigator = window.navigator,
    agent = navigator.userAgent.toLowerCase(),
    IEMode = document.documentMode,
    chrome = window.chrome || false,
    System = {
      //user-agent
      agent: agent,
      //是否未IE
      isIE: /msie/.test(agent),
      //Gecko内核
      isGecko: agent.indexOf("gecko")>0 && agent.indexOf("like gecko")<0,
      //webkit内核
      isWebkit: agent.indexOf("webkit")>0,
      //是否支持subTitle
      supportSubTitle:function(){
        return "track" in document.createElement("track");
      },
      //是否支持style scoped
      supportScope:function(){
        return "scoped" in document.createElement("style");
      },
      //获取IE版本号
      ieVersion: function(){
        try{
          return agent.match(/msie([\d.]+)/)[1] || 0;
        }catch(e){
          return IEMode;
        }
      },
      //Opera版本号
      operaVersion:function(){
        try {
          if(window.opera){
            return agent.match(/opera.([\d.]+)/)[1];
          }else if(agent.indexOf("opr")>0){
            return agent.match(/opr\/[\d.]+)/)[1];
          }
        } catch (error) {
          return 0;
        }
      },
      //version过滤，如31.0.252.152只保留31.0
      versionFilter:function(){
        if(arguments.length===1 && typeof arguments[0] === "string"){
          const version = arguments[0];
          const start = version.indexOf(".");
          if(start > 0){
            const end = version.indexOf(".", start+1);
            if(end !== -1){
              return version.substr(0, end);
            }
          }
          return version;
        }else if(arguments.length === 1){
          return arguments[0];
        }
        return 0;
      }
    };

    try {
      //浏览器类型（IE、Opera、Chrome、Safari、Firefox）
      System.type = System.isIE ? "IE" : 
        window.opera || (agent.indexOf("opr") > 0) ? "Opera" :
        (agent.indexOf("chrome")>0) ? "Chrome" :
        //Safari
        window.openDatabase ? "Safari" :
        (agent.indexOf("firefox") > 0) ? "Firefox" : "unknown";

        //版本号
        System.version = (System.type==="IE") ? System.ieVersion() :
        (System.type==="Firefox") ? agent.match(/firefox\/([\d.]+)/)[1] :
        (System.type==="Chrome") ? agent.match(/chrome\/([\d.]+)/)[1] :
        (System.type==="Opera") ? System.operaVersion() :
        (System.type === "Safari") ? agent.match(/version\/([\d.]+)/)[1] :
        "0";

        //带壳浏览器，针对国内浏览器
        System.shell = function(){
          //遨游浏览器
          if(agent.indexOf("maxthon") > 0){
            System.version = agent.match(/maxthon\/([\d.]+)/)[1] || System.version;
            return "傲游浏览器";
          }

          //QQ浏览器
          if(agent.indexOf("qqbrowser") > 0){
            System.version = agent.match(/qqbrowser\/([\d.]+)/)[1] || System.version;
            return "QQ浏览器";
          }

          //搜狗浏览器
          if(agent.indexOf("se 2.x") > 0){
            return "搜狗浏览器";
          }

          if(chrome && System.type !== "Opera"){
            let external = window.external,
              clientInfo = window.clientInformation,
              //客户端语言：zh-cn，zh.360下面返回undefined
              clientLanguage = clientInfo.languages;

              //猎豹浏览器
              if(agent.indexOf("lbbrowser") > 0){
                return "猎豹浏览器";
              }

              //百度浏览器
              if(agent.indexOf("bidubrowser") > 0){
                System.version = agent.match(/bidubrowser\/([\d.]+)/)[1] || agent.match(/chrome\/([\d.]+)/)[1];
              }

              //360极速浏览器和360安全浏览器
              if(System.supportSubTitle() && typeof clientLanguage == "undefined"){
                let storeKeyLen = Object.keys(chrome.webstore).length;
                return storeKeyLen > 1 ? "360极速浏览器" : "360安全浏览器";
              }

              return "Chrome";
          }
          return System.type;
        };

        //浏览器名称（如果是带壳浏览器，返回壳名称）
        System.name = System.shell();
        //对版本号进行过滤处理
        System.version = System.versionFilter(System.version);
    } catch (error) {
      
    }

    return {
      client: System
    }
})(window);

module.exports = Browser;