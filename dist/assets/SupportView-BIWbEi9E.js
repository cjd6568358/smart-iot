import{c as C,j as P,n as _,m as T,d as I,k as $,a,e as b,B as z,w as N,l as G,p as O,q as j,v as A,x as h,y as F,z as L,A as K,I as U,C as Y,g as B,h as m,D as S,F as k,o as p,r as H,E as J,i as y,t as M,G as Q}from"./index-Cgfdwr_D.js";import{N as W}from"./index-DKvNXzhJ.js";import{_ as X}from"./_plugin-vue_export-helper-DlAUqK2U.js";const[R,Z]=C("grid"),ee={square:Boolean,center:P,border:P,gutter:_,reverse:Boolean,iconSize:_,direction:String,clickable:Boolean,columnNum:T(4)},V=Symbol(R);var te=I({name:R,props:ee,setup(e,{slots:t}){const{linkChildren:n}=$(V);return n({props:e}),()=>{var s;return a("div",{style:{paddingLeft:b(e.gutter)},class:[Z(),{[z]:e.border&&!e.gutter}]},[(s=t.default)==null?void 0:s.call(t)])}}});const ne=N(te),[re,g]=C("grid-item"),oe=G({},O,{dot:Boolean,text:String,icon:String,badge:_,iconColor:String,iconPrefix:String,badgeProps:Object});var ae=I({name:re,props:oe,setup(e,{slots:t}){const{parent:n,index:s}=j(V),v=A();if(!n)return;const c=h(()=>{const{square:u,gutter:r,columnNum:o}=n.props,d=`${100/+o}%`,i={flexBasis:d};if(u)i.paddingTop=d;else if(r){const l=b(r);i.paddingRight=l,s.value>=+o&&(i.marginTop=l)}return i}),x=h(()=>{const{square:u,gutter:r}=n.props;if(u&&r){const o=b(r);return{right:o,bottom:o,height:"auto"}}}),q=()=>{if(t.icon)return a(K,L({dot:e.dot,content:e.badge},e.badgeProps),{default:t.icon});if(e.icon)return a(U,{dot:e.dot,name:e.icon,size:n.props.iconSize,badge:e.badge,class:g("icon"),color:e.iconColor,badgeProps:e.badgeProps,classPrefix:e.iconPrefix},null)},w=()=>{if(t.text)return t.text();if(e.text)return a("span",{class:g("text")},[e.text])},D=()=>t.default?t.default():[q(),w()];return()=>{const{center:u,border:r,square:o,gutter:d,reverse:i,direction:l,clickable:f}=n.props,E=[g("content",[l,{center:u,square:o,reverse:i,clickable:f,surround:r&&d}]),{[F]:r}];return a("div",{class:[g({square:o})],style:c.value},[a("div",{role:f?"button":void 0,class:E,style:x.value,tabindex:f?0:void 0,onClick:v},[D()])])}}});const se=N(ae),ce=["src"],ie={class:"name"},ue={__name:"SupportView",setup(e){const t=Y(),n=s=>{t.push({name:"deviceAdd",params:{model:s.model}})};return(s,v)=>(p(),B(k,null,[a(m(W),{title:"支持列表"}),a(m(ne),{class:"page-body","column-num":3},{default:S(()=>[(p(!0),B(k,null,H(m(Q),c=>(p(),J(m(se),{key:c.model,onClick:x=>n(c)},{default:S(()=>[y("img",{src:c.logo},null,8,ce),y("div",ie,M(c.name),1)]),_:2},1032,["onClick"]))),128))]),_:1})],64))}},ge=X(ue,[["__scopeId","data-v-808b02c5"]]);export{ge as default};
