var L=Object.defineProperty;var F=Object.getOwnPropertyDescriptor;var A=Object.getOwnPropertyNames;var j=Object.prototype.hasOwnProperty;var Z=(c,t,r,e)=>{if(t&&typeof t=="object"||typeof t=="function")for(let i of A(t))!j.call(c,i)&&i!==r&&L(c,i,{get:()=>t[i],enumerable:!(e=F(t,i))||e.enumerable});return c};var B=c=>Z(L({},"__esModule",{value:!0}),c);var $={};module.exports=B($);var C=require("fs");function R(c,t,r){return Math.min(Math.max(c,t),r)}function V(c,t){return c+(t-c)*Math.random()}function H(c){return c*Math.PI/180}var o=class{constructor(t,r,e){this.EPSILON=1e-5;this.components=new Float64Array(3),this.components[0]=t||0,this.components[1]=r||0,this.components[2]=e||0}static multiplyVector(t,r){let e=o.copyVector(t);return e.multiplyVector(r),e}static Reflect(t,r){let e=o.multiplyScalar(r,o.dot(t,r)*2);return o.subVector(t,e)}static Refract(t,r,e){let i=Math.min(o.dot(o.multiplyScalar(t,-1),r),1),a=o.addVector(t,o.multiplyScalar(r,i)),n=o.multiplyScalar(a,e),s=-Math.sqrt(Math.abs(1-n.length())),m=o.multiplyScalar(r,s);return o.addVector(n,m)}static copyVector(t){return new o(t.at(0),t.at(1),t.at(2))}static unitVector(t){let r=o.copyVector(t);return r.divideScalar(t.sqrtLength()),r}static multiplyScalar(t,r){let e=o.copyVector(t);return e.multiplyScalar(r),e}static divideScalar(t,r){let e=o.copyVector(t);return e.divideScalar(r),e}static subVector(t,r){let e=o.copyVector(t);return e.subVector(r),e}static addVector(t,r){let e=o.copyVector(t);return e.addVector(r),e}static cross(t,r){return new o(t.at(1)*r.at(2)-t.at(2)*r.at(1),t.at(2)*r.at(0)-t.at(0)*r.at(1),t.at(0)*r.at(1)-t.at(1)*r.at(0))}static dot(t,r){return t.components[0]*r.components[0]+t.components[1]*r.components[1]+t.components[2]*r.components[2]}static randomInUnitDisk(){for(;;){let t=new o(V(-1,1),V(-1,1),0);if(!(t.length()>=1))return t}}static vecRandomBetween(t,r){return new o(V(t,r),V(t,r),V(t,r))}static randomInUnitSphere(){for(;;){let t=this.vecRandomBetween(-1,1);if(!(t.length()>=1))return t}}at(t){return this.components[t]}setAt(t,r){this.components[t]=r}addScalar(t){this.components[0]+=t,this.components[1]+=t,this.components[2]+=t}subScalar(t){this.components[0]-=t,this.components[1]-=t,this.components[2]-=t}subVector(t){this.components[0]-=t.at(0),this.components[1]-=t.at(1),this.components[2]-=t.at(2)}addVector(t){this.components[0]+=t.at(0),this.components[1]+=t.at(1),this.components[2]+=t.at(2)}multiplyVector(t){this.components[0]*=t.at(0),this.components[1]*=t.at(1),this.components[2]*=t.at(2)}multiplyScalar(t){this.components[0]*=t,this.components[1]*=t,this.components[2]*=t}divideVector(t){this.components[0]/=t.at(0),this.components[1]/=t.at(1),this.components[2]/=t.at(2)}divideScalar(t){this.components[0]/=t,this.components[1]/=t,this.components[2]/=t}negate(){this.components[0]=-this.components[0],this.components[1]=-this.components[1],this.components[2]=-this.components[2]}lengthSquared(){return this.components[0]*this.components[0]+this.components[1]*this.components[1]+this.components[2]*this.components[2]}length(){return this.lengthSquared()}sqrtLength(){return Math.sqrt(this.length())}nearZero(){let t=this.EPSILON;return Math.abs(this.components[0])<t&&Math.abs(this.components[1])<t&&Math.abs(this.components[2])<t}};var p=class{constructor(t,r){this.direction=r,this.origin=t}at(t){let r=new o(this.Direction.at(0),this.Direction.at(1),this.Direction.at(2));return r.multiplyScalar(t),r.addVector(this.origin),r}get Direction(){return this.direction}get Origin(){return this.origin}};var M=class{constructor(){this.p=new o(0,0,0);this.normal=new o(0,0,0);this.t=0;this.front_face=!1;this.u=0;this.v=0;this.scattered=new p(new o(0,0,0),new o(0,0,0));this.attenuation=new o(0,0,0)}set_front_face(t,r){this.front_face=o.dot(t.Direction,r)<0,this.front_face?this.normal=r:(r.negate(),this.normal=r)}};var b=class{constructor(t){this.albedo=t}emitted(t){return new o(0,0,0)}scatter(t,r){let e=o.addVector(r.normal,o.randomInUnitSphere());return e.nearZero()&&(e=r.normal),r.scattered=new p(r.p,e),r.attenuation=this.albedo.value(r.u,r.v,r.p,r),!0}};var S=class{constructor(t,r,e,i,a,n,s){this.aperture=i,this.focusDist=a,this.theta=H(n),this.h=Math.tan(this.theta/2),this.viewport_height=2*this.h,this.viewport_width=s*this.viewport_height,this.lookAt=r,this.lookFrom=t,this.vUp=e,this.w=o.unitVector(o.subVector(this.lookFrom,this.lookAt)),this.u=o.unitVector(o.cross(this.vUp,this.w)),this.v=o.cross(this.w,this.u),this.origin=this.lookFrom,this.horizontal=o.multiplyScalar(this.u,this.viewport_width*a),this.vertical=o.multiplyScalar(this.v,this.viewport_height*this.focusDist);let m=o.subVector(this.origin,o.divideScalar(this.horizontal,2));m.subVector(o.divideScalar(this.vertical,2)),m.subVector(o.multiplyScalar(this.w,this.focusDist)),this.lower_left_corner=m,this.lensRadius=this.aperture/2}getRay(t,r){let e=o.randomInUnitDisk();e.multiplyScalar(this.lensRadius);let i=o.multiplyScalar(this.u,e.at(0));i.addVector(o.multiplyScalar(this.v,e.at(1)));let a=o.multiplyScalar(this.horizontal,t),n=o.multiplyScalar(this.vertical,r),s=o.addVector(this.origin,i),m=o.addVector(this.lower_left_corner,a);return m.addVector(n),m.subVector(this.origin),m.subVector(i),new p(s,m)}};var _=class{constructor(){this.hittableObjects=[]}clear(){this.hittableObjects=[]}get getList(){return this.hittableObjects}add(t){this.hittableObjects.push(t)}hit(t,r,e,i){let a=!1,n=e;for(let s of this.getList)s.hit(t,r,n,i)&&(a=!0,n=i.t);return a}};var w=class{constructor(t,r,e){this.center=t,this.radius=r,this.mat=e}static sphereUV(t,r){let e=Math.acos(-t.at(1)),i=Math.atan2(-t.at(2),t.at(0))+Math.PI;r.u=i/(2*Math.PI),r.v=e/Math.PI}hit(t,r,e,i){let a=o.subVector(t.Origin,this.center),n=t.Direction.length(),s=o.dot(a,t.Direction),m=a.length()-Math.pow(this.radius,2),x=Math.pow(s,2)-n*m;if(x<0)return!1;let u=Math.sqrt(x),l=(-s-u)/n;if((l<r||e<l)&&(l=(-s+u)/n,l<r||e<l))return!1;i.t=l,i.p=t.at(l);let z=o.subVector(i.p,this.center);return z.divideScalar(this.radius),i.set_front_face(t,z),w.sphereUV(z,i),i.material=this.mat,!0}};var h=class{constructor(t){this.color=t||new o}value(t,r,e,i){return this.color}};var f=class{constructor(t){this.refractionIndex=t}emitted(t){return new o}reflectance(t,r){let e=1-r+(1+r);return e=e*e,e+(1-e)*Math.pow(1-t,5)}scatter(t,r){r.attenuation=new o(1,1,1);let e=r.front_face?1/this.refractionIndex:this.refractionIndex,i=o.unitVector(t.Direction);i.negate();let a=Math.min(o.dot(i,r.normal),1),n=Math.sqrt(1-a*a),s=e*n>1,m=new o(0,0,0);return s||this.reflectance(a,e)>Math.random()?m=o.Reflect(i,r.normal):m=o.Refract(i,r.normal,e),r.scattered=new p(r.p,m),!0}};var y=class{constructor(t,r){this.albedo=t,this.fuzz=r<1?r:1}emitted(t){return new o}scatter(t,r){let e=o.Reflect(o.unitVector(t.Direction),r.normal);return r.scattered=new p(r.p,o.addVector(e,o.multiplyScalar(o.randomInUnitSphere(),this.fuzz))),r.attenuation=this.albedo,o.dot(r.scattered.Direction,r.normal)>0}};var k=class{constructor(t,r,e,i,a,n){this.mat=n,this.k=a,this.z0=t,this.z1=r,this.y0=e,this.y1=i}hit(t,r,e,i){let a=(this.k-t.Origin.at(0))/t.Direction.at(0);if(a<r||a>e)return!1;let n=t.Origin.at(1)+a*t.Direction.at(1),s=t.Origin.at(2)+a*t.Direction.at(2);if(n<this.z0||n>this.z1||s<this.y0||s>this.y1)return!1;i.t=a,i.p=t.at(a);let m=new o(1,0,0);return i.set_front_face(t,m),i.material=this.mat,!0}};var d=class{constructor(t){this.emit=new h(t)}scatter(t,r){return!1}emitted(t){return this.emit.value(t.u,t.v,t.p,t)}};var D=class{constructor(t,r,e,i,a,n){this.mat=n,this.k=a,this.x0=t,this.x1=r,this.y0=e,this.y1=i}hit(t,r,e,i){let a=(this.k-t.Origin.at(2))/t.Direction.at(2);if(a<r||a>e)return!1;let n=t.Origin.at(0)+a*t.Direction.at(0),s=t.Origin.at(1)+a*t.Direction.at(1);if(n<this.x0||n>this.x1||s<this.y0||s>this.y1)return!1;i.t=a,i.p=t.at(a);let m=new o(0,0,1);return i.set_front_face(t,m),i.material=this.mat,!0}};var I=class{constructor(t,r,e,i,a,n){this.mat=n,this.k=a,this.x0=t,this.x1=r,this.z0=e,this.z1=i}hit(t,r,e,i){let a=(this.k-t.Origin.at(1))/t.Direction.at(1);if(a<r||a>e)return!1;let n=t.Origin.at(0)+a*t.Direction.at(0),s=t.Origin.at(2)+a*t.Direction.at(2);if(n<this.x0||n>this.x1||s<this.z0||s>this.z1)return!1;i.t=a,i.p=t.at(a);let m=new o(0,1,0);return i.set_front_face(t,m),i.material=this.mat,!0}};function P(c){let t=new o(c.camera.lookFrom.x,c.camera.lookFrom.y,c.camera.lookFrom.z),r=new o(c.camera.lookAt.x,c.camera.lookAt.y,c.camera.lookAt.z),e=new o(c.camera.vUp.x,c.camera.vUp.y,c.camera.vUp.z),i=c.camera.focusDistance,a=c.camera.aperture,n=c.camera.fov,s=c.settings.aspectRatio;return new S(t,r,e,a,i,n,s)}function U(c){let t=new _;for(let r in c.scene){let e=c.scene[r];switch(e.type){case"Sphere":let i=e.material.type,a;i==="lambertian"&&(a=new b(new h(new o(e.material.texture.color.x,e.material.texture.color.y,e.material.texture.color.z)))),i==="dielectric"&&(a=new f(e.material.value)),i==="diffuseLight"&&(a=new d(new o(e.material.texture.color.x,e.material.texture.color.y,e.material.texture.color.z))),i==="metal"&&(a=new y(new o(e.material.texture.color.x,e.material.texture.color.y,e.material.texture.color.z),e.material.fuzzines));let n=new w(new o(e.position.x,e.position.y,e.position.z),e.radius,a);t.add(n);break;case"yz_rect":let s=e.material.type,m;s==="lambertian"&&(m=new b(new h(new o(e.material.texture.color.x,e.material.texture.color.y,e.material.texture.color.z)))),s==="dielectric"&&(m=new f(e.material.value)),s==="diffuseLight"&&(m=new d(new o(e.material.texture.color.x,e.material.texture.color.y,e.material.texture.color.z))),s==="metal"&&(m=new y(new o(e.material.texture.color.x,e.material.texture.color.y,e.material.texture.color.z),e.material.fuzzines));let x=new k(e.position.z0,e.position.z1,e.position.y0,e.position.y1,e.position.k,m);t.add(x);break;case"xz_rect":let u=e.material.type,l;u==="lambertian"&&(l=new b(new h(new o(e.material.texture.color.x,e.material.texture.color.y,e.material.texture.color.z)))),u==="dielectric"&&(l=new f(e.material.value)),u==="diffuseLight"&&(l=new d(new o(e.material.texture.color.x,e.material.texture.color.y,e.material.texture.color.z))),u==="metal"&&(l=new y(new o(e.material.texture.color.x,e.material.texture.color.y,e.material.texture.color.z),e.material.fuzzines));let z=new I(e.position.z0,e.position.z1,e.position.y0,e.position.y1,e.position.k,l);t.add(z);break;case"xy_rect":let g=e.material.type,v;g==="lambertian"&&(v=new b(new h(new o(e.material.texture.color.x,e.material.texture.color.y,e.material.texture.color.z)))),g==="dielectric"&&(v=new f(e.material.value)),g==="diffuseLight"&&(v=new d(new o(e.material.texture.color.x,e.material.texture.color.y,e.material.texture.color.z))),g==="metal"&&(v=new y(new o(e.material.texture.color.x,e.material.texture.color.y,e.material.texture.color.z),e.material.fuzzines));let q=new D(e.position.z0,e.position.z1,e.position.y0,e.position.y1,e.position.k,v);t.add(q);break}}return t}var O=class{constructor(t){this.scene=t}rayColor(t,r,e,i){if(e<=0)return new o(0,0,0);if(!r.hit(t,.001,Number.POSITIVE_INFINITY,i))return new o(0,0,0);let a=i.material.emitted(i);if(!i.material.scatter(t,i))return a;let n=o.multiplyVector(i.attenuation,this.rayColor(i.scattered,r,e-1,i));return n.addVector(a),n}writeColor(t,r){let e=1/r,i=t.at(0),a=t.at(1),n=t.at(2);return i=Math.sqrt(e*i),a=Math.sqrt(e*a),n=Math.sqrt(e*n),`${255*R(i,0,.999)} ${255*R(a,0,.999)} ${255*R(n,0,.999)} 
`}async renderImage(){let t=P(this.scene),r=U(this.scene),e=new M,i=`P3
${this.scene.settings.width} ${this.scene.settings.height} 
255
`;for(let a=this.scene.settings.height-1;a>=0;--a){console.log(a);for(let n=0;n<this.scene.settings.width;++n){let s=new o(0,0,0);for(let m=0;m<this.scene.settings.max_samples;++m){let x=(n+Math.random())/(this.scene.settings.width-1),u=(a+Math.random())/(this.scene.settings.height-1),l=t.getRay(x,u);s.addVector(this.rayColor(l,r,this.scene.settings.max_depth,e))}i+=this.writeColor(s,this.scene.settings.max_samples)}console.clear()}try{(0,C.writeFileSync)("image.ppm",i),console.log("Image rendered")}catch(a){console.log(a)}}};var T={settings:{max_samples:300,max_depth:10,width:1024,height:1024,aspectRatio:1},camera:{lookFrom:{x:278,y:278,z:-800},lookAt:{x:278,y:278,z:0},vUp:{x:0,y:1,z:0},focusDistance:1.5,aperture:0,fov:40},scene:{sphere_1:{type:"Sphere",position:{x:80,y:125,z:355},radius:75,material:{type:"lambertian",texture:{color:{x:1,y:1,z:1}}}},sphere_2:{type:"Sphere",position:{x:400,y:120,z:300},radius:125,material:{type:"metal",texture:{color:{x:1,y:1,z:1},fuzzines:.3}}},sphere_3:{type:"Sphere",position:{x:80,y:300,z:455},radius:75,material:{type:"dielectric",value:.3}},plane_1:{type:"yz_rect",position:{z0:0,z1:555,y0:0,y1:555,k:555},material:{type:"lambertian",texture:{color:{x:.12,y:.45,z:.15}}}},plane_2:{type:"yz_rect",position:{z0:0,z1:555,y0:0,y1:555,k:0},material:{type:"lambertian",texture:{color:{x:.65,y:.05,z:.05}}}},plane_3:{type:"xz_rect",position:{z0:0,z1:555,y0:0,y1:555,k:0},material:{type:"lambertian",texture:{color:{x:.73,y:.73,z:.73}}}},plane_4:{type:"xz_rect",position:{z0:0,z1:555,y0:0,y1:555,k:555},material:{type:"lambertian",texture:{color:{x:.73,y:.73,z:.73}}}},plane_5:{type:"xy_rect",position:{z0:0,z1:555,y0:0,y1:555,k:555},material:{type:"lambertian",texture:{color:{x:.73,y:.73,z:.73}}}},rect_light:{type:"xz_rect",position:{z0:213,z1:343,y0:227,y1:332,k:554},material:{type:"diffuseLight",texture:{color:{x:15,y:15,z:15}}}}}};function Y(){new O(T).renderImage()}Y();