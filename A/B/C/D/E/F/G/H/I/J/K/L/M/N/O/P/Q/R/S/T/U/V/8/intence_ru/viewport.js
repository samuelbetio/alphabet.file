!function(e,t){"function"==typeof define&&define.amd?define(["exports"],t):t("undefined"!=typeof exports?exports:e.viewport={})}(this,function(e){var t=[],r=40,o="viewport",n="EventListener",i="add"+n,l="remove"+n,s="getBoundingClientRect",a="top",f="bottom",c="left",p="right",d="Top",v="Left",u="Location",h="Start",m="End",g="Scroll",b="Target",w="scroll",x="resize",y="length",S=window,E=document,L=null,N=Math,k=N.min,B=N.max,C=N.abs,M=function(){for(var e,n,N,M,T,z,H,R,W,j=0,q=L;j<t[y];)T=t[j].r.vpl,t[j++].r[l](w,T,0),S[l](x,T,0);for(t=[],W=E.getElementsByClassName("section"),j=0;j<W[y];){for(H=z=W[j++];;){if(N=e=0,n=H==E.body,!n)for(M=H.className.split(" ");e<M[y];)if(M[e++]==o){N=1;break}if(n||N)break;H=H.parentNode}for(e=0;e<t[y];e++)t[e].v==H&&(q=t[e]);q||(R=H.scroller||H,q={v:H,r:R,s:[]},R.vpl=function(e){return function(){for(var t=e.r,n=t[s](),i=n[a],l=n[c],x=n[f],S=n[p],E=(x+i)/2,N=(l+S)/2,M=t.scrollHeight-n.height,T=t.scrollWidth-n.width,z=t[w+d]/M,H=t[w+v]/T,R=i+(x-i)*z,W=l+(S-l)*H,j=L,q=L,A=0;A<e.s[y];){var D=e.s[A++],F=D[s](),G=F[a],I=F[c],J=F[f]-G,K=F[p]-I,O=i-G,P=l-I,Q=(W-I)/K,U=(R-G)/J,V=B(0,C(U-.5)-.5),X=B(0,C(Q-.5)-.5),Y=V*V+X*X,Z=-O-r,$=(F[f]+G)/2-E,_=-P-r,ee=(I+F[p])/2-N;D[o+d+h]=O/J,D[o+d+m]=(x-G)/J,D[o+v+h]=P/K,D[o+v+m]=(S-I)/K,D[o+d+u]=U,D[o+v+u]=Q,D[o+g+d+b]=Math.max(0,k(M,t[w+d]+k(Z,$))),D[o+g+v+b]=B(0,k(T,t[w+v]+k(_,ee))),(q===L||q>Y)&&(q=Y,j=D)}e.v.currentSection=j}}(q),R[i](w,R.vpl,0),S[i](x,R.vpl,0),t.push(q)),q.s.push(z)}for(j=0;j<t[y];)t[j++].r.vpl()};"complete"==E.readyState?M():S[i]("load",M,0),e.reset=M});