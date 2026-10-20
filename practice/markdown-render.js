(function(global){
'use strict';
const md=markdownit({html:false,breaks:false,linkify:false});
md.inline.ruler.before('escape','math_inline',function(state,silent){
 const start=state.pos;if(state.src[start]!=='$')return false;
 const display=state.src[start+1]==='$',delimiter=display?'$$':'$';
 let end=state.src.indexOf(delimiter,start+delimiter.length);
 while(end>=0 && state.src[end-1]==='\\')end=state.src.indexOf(delimiter,end+delimiter.length);
 if(end<0)return false;
 if(!silent){const t=state.push('math_inline','',0);t.content=state.src.slice(start+delimiter.length,end);t.meta={display};}
 state.pos=end+delimiter.length;return true;
});
md.renderer.rules.math_inline=(tokens,idx)=>katex.renderToString(tokens[idx].content,{displayMode:tokens[idx].meta.display,throwOnError:false,strict:'ignore',trust:false});
md.block.ruler.before('fence','math_block',function(state,startLine,endLine,silent){
 let pos=state.bMarks[startLine]+state.tShift[startLine];
 if(state.src.slice(pos,pos+2)!=='$$')return false;
 let end=state.src.indexOf('$$',pos+2);if(end<0)return false;
 if(silent)return true;
 let next=startLine;while(next<endLine && state.eMarks[next]<end+2)next++;
 const t=state.push('math_block','',0);t.block=true;t.content=state.src.slice(pos+2,end);t.map=[startLine,next+1];state.line=next+1;return true;
},{alt:['paragraph','reference','blockquote','list']});
md.renderer.rules.math_block=(tokens,idx)=>'<div class="math-block">'+katex.renderToString(tokens[idx].content,{displayMode:true,throwOnError:false,strict:'ignore',trust:false})+'</div>\n';
global.renderMarkdown=source=>md.render(source||'');
})(typeof window==='undefined'?globalThis:window);
