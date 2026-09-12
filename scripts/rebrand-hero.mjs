/** Edit the supplied Sprint GLB scene without changing its camera or animation.
 * Usage: node scripts/rebrand-hero.mjs source.glb output.glb
 * Original glyph geometry is replaced, not covered by an overlay.
 */
import fs from 'node:fs';
import { createRequire } from 'node:module';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
const require = createRequire(import.meta.url);
const threeRoot = new URL('../node_modules/three/', import.meta.url);
const code = fs.readFileSync(new URL('examples/jsm/libs/draco/gltf/draco_decoder.js', threeRoot), 'utf8');
const module = { exports: {} };
new Function('module', 'exports', 'require', '__dirname', code)(module, module.exports, require, import.meta.dirname);
const draco = await module.exports();
const font = new FontLoader().parse(JSON.parse(fs.readFileSync(new URL('examples/fonts/helvetiker_regular.typeface.json', threeRoot))));
const [source, output] = process.argv.slice(2);
if (!source || !output || source === output) throw Error('Pass distinct source.glb and output.glb paths.');
const file = fs.readFileSync(source);
const jsonLength = file.readUInt32LE(12);
const gltf = JSON.parse(file.subarray(20, 20 + jsonLength));
const binaryLength = file.readUInt32LE(20 + jsonLength);
const original = file.subarray(28 + jsonLength, 28 + jsonLength + binaryLength);
let binary = Buffer.from(original);
const changes = [];
const componentTypes = { 5126: Float32Array, 5123: Uint16Array, 5121: Uint8Array, 5125: Uint32Array };
function accessorValues(id) {
  const a = gltf.accessors[id], v = gltf.bufferViews[a.bufferView];
  const Constructor = componentTypes[a.componentType];
  const size = {SCALAR:1,VEC2:2,VEC3:3,VEC4:4}[a.type];
  const offset = (v.byteOffset || 0) + (a.byteOffset || 0);
  const result = [];
  for(let i=0;i<a.count;i++) for(let c=0;c<size;c++) {
    const pos=offset+i*(v.byteStride || size*Constructor.BYTES_PER_ELEMENT)+c*Constructor.BYTES_PER_ELEMENT;
    result.push(a.componentType===5126?original.readFloatLE(pos):a.componentType===5123?original.readUInt16LE(pos):original.readUInt8(pos));
  }
  return result;
}
function decode(p) {
  const e=p.extensions?.KHR_draco_mesh_compression;
  const decoder=new draco.Decoder(), buffer=new draco.DecoderBuffer(), mesh=new draco.Mesh();
  if(e){const v=gltf.bufferViews[e.bufferView];const data=original.subarray(v.byteOffset||0,(v.byteOffset||0)+v.byteLength);buffer.Init(data,data.length);const status=decoder.DecodeBufferToMesh(buffer,mesh);if(!status.ok())throw Error(status.error_msg());}
  const result={};
  for(const [key,id] of Object.entries(p.attributes)){
    if(e && key in e.attributes){const attribute=decoder.GetAttributeByUniqueId(mesh,e.attributes[key]);const array=new draco.DracoFloat32Array();decoder.GetAttributeFloatForAllPoints(mesh,attribute,array);result[key]=Array.from({length:array.size()},(_,i)=>array.GetValue(i));draco.destroy(array);}
    else result[key]=accessorValues(id);
  }
  draco.destroy(mesh);draco.destroy(buffer);draco.destroy(decoder);return result;
}
function append(values, components, type='VEC3', componentType=5126) {
  const ArrayType=componentTypes[componentType];const array=new ArrayType(values);
  const padding=(4-binary.length%4)%4;binary=Buffer.concat([binary,Buffer.alloc(padding)]);
  const offset=binary.length;const bytes=Buffer.from(array.buffer);binary=Buffer.concat([binary,bytes]);
  const view=gltf.bufferViews.push({buffer:0,byteOffset:offset,byteLength:bytes.length,target:34962})-1;
  const min=Array.from({length:components},()=>Infinity),max=min.map(()=>-Infinity);
  for(let i=0;i<array.length;i++){const c=i%components;min[c]=Math.min(min[c],array[i]);max[c]=Math.max(max[c],array[i]);}
  return gltf.accessors.push({bufferView:view,componentType,count:array.length/components,type,min,max})-1;
}
function bounds(values){const min=[Infinity,Infinity,Infinity],max=[-Infinity,-Infinity,-Infinity];for(let i=0;i<values.length;i++){const a=i%3;min[a]=Math.min(min[a],values[i]);max[a]=Math.max(max[a],values[i]);}return{min,max};}
function letters(text){const geometry=new TextGeometry(text,{font,size:1,depth:0,curveSegments:4,bevelEnabled:false});geometry.computeBoundingBox();return geometry;}
function flatText(meshIndex,text,material=4){
 const mesh=gltf.meshes[meshIndex],p=mesh.primitives[0];const old=decode(p);const b=bounds(old.POSITION);const g=letters(text),box=g.boundingBox;const width=b.max[0]-b.min[0],height=b.max[2]-b.min[2];
 const scale=Math.min(width/(box.max.x-box.min.x),height/(box.max.y-box.min.y));const midX=(b.min[0]+b.max[0])/2,midZ=(b.min[2]+b.max[2])/2;
 const pos=[],normal=[];for(let i=0;i<g.attributes.position.count;i++){const x=g.attributes.position.getX(i),y=g.attributes.position.getY(i);pos.push(midX+(x-(box.min.x+box.max.x)/2)*scale,b.max[1]+0.00001,midZ-(y-(box.min.y+box.max.y)/2)*scale);normal.push(0,1,0);}
 mesh.primitives=[{attributes:{POSITION:append(pos,3),NORMAL:append(normal,3)},material,mode:4}];mesh.name='Asymmetric_'+text.replace(/\W+/g,'_');g.dispose();changes.push({mesh:meshIndex,text});
}
// Exact mesh indices validated against both reference scene variants.
const expected={4:'Text',5:'Text.005',213:'Curve.001',214:'Curve.002',221:'Text.009',228:'Text.006',239:'Curve.127',240:'Curve.125',247:'GlobalCheckout.001'};
for(const [id,name]of Object.entries(expected))if(gltf.meshes[id]?.name!==name)throw Error(`Unexpected source mesh ${id}; refusing guessed edits.`);
flatText(4,'HACK\nSYMMETRIC');flatText(5,'REGISTER NOW');
flatText(214,'WORKSHOPS');flatText(213,'MCP');flatText(221,'Explore workshops',2);flatText(228,'iOS DEVELOPMENT');
flatText(239,'WE BREAK THINGS');flatText(240,'WELCOME TO\nCLUB ASYMMETRIC');flatText(247,'TECH\nFIESTA');
// Remove the old baked tag atlas and right-shoe glyph primitive first.
const tag=gltf.materials.find(m=>m.name==='BlueTag');delete tag.emissiveTexture;tag.emissiveFactor=[0,0.041,1];
const glyphSurface=decode(gltf.meshes[153].primitives[2]);
const glyphBounds=bounds(glyphSurface.POSITION);
const rightTagBounds=bounds(decode(gltf.meshes[153].primitives[0]).POSITION);
const center=glyphBounds.min.map((v,i)=>(v+glyphBounds.max[i])/2);
const basis=(x,y)=>{const u=(x-center[0])/.02,v=(y-center[1])/.01;return [1,u,v,u*u,u*v,v*v];};
const matrix=Array.from({length:6},()=>Array(7).fill(0));
for(let i=0;i<glyphSurface.POSITION.length;i+=3){const q=basis(glyphSurface.POSITION[i],glyphSurface.POSITION[i+1]);for(let r=0;r<6;r++){for(let c=0;c<6;c++)matrix[r][c]+=q[r]*q[c];matrix[r][6]+=q[r]*glyphSurface.POSITION[i+2];}}
for(let k=0;k<6;k++){let pivot=k;for(let r=k+1;r<6;r++)if(Math.abs(matrix[r][k])>Math.abs(matrix[pivot][k]))pivot=r;[matrix[k],matrix[pivot]]=[matrix[pivot],matrix[k]];const divisor=matrix[k][k];for(let c=k;c<7;c++)matrix[k][c]/=divisor;for(let r=0;r<6;r++)if(r!==k){const f=matrix[r][k];for(let c=k;c<7;c++)matrix[r][c]-=f*matrix[k][c];}}
const coefficients=matrix.map(row=>row[6]);
function shoeText(meshIndex){
 const mesh=gltf.meshes[meshIndex],old=decode(mesh.primitives[0]),b=bounds(old.POSITION);
 const shift=b.min.map((v,i)=>(v+b.max[i]-rightTagBounds.min[i]-rightTagBounds.max[i])/2);
 const geometry=letters('ASYMMETRIC'),box=geometry.boundingBox;
 const scale=Math.min((glyphBounds.max[0]-glyphBounds.min[0])/(box.max.x-box.min.x),(glyphBounds.max[1]-glyphBounds.min[1])/(box.max.y-box.min.y));
 const pos=[],normals=[],joints=[],weights=[];
 for(let i=0;i<geometry.attributes.position.count;i++){
  const rx=center[0]+(geometry.attributes.position.getX(i)-(box.min.x+box.max.x)/2)*scale;
  const ry=center[1]+(geometry.attributes.position.getY(i)-(box.min.y+box.max.y)/2)*scale;
  const x=rx+shift[0],y=ry+shift[1];
  // Smooth fitted label surface, slightly above the original embossed letters.
  const z=basis(rx,ry).reduce((sum,value,k)=>sum+value*coefficients[k],0)+shift[2]+.00035;
  let nearest=0,distance=Infinity;
  for(let k=0;k<old.POSITION.length/3;k++){const dx=old.POSITION[k*3]-x,dy=old.POSITION[k*3+1]-y;const d=dx*dx+dy*dy;if(d<distance){distance=d;nearest=k;}}
  pos.push(x,y,z);normals.push(0,0,1);
  joints.push(...old.JOINTS_0.slice(nearest*4,nearest*4+4));const w=old.WEIGHTS_0.slice(nearest*4,nearest*4+4),sum=w.reduce((a,b)=>a+b,0);weights.push(...w.map(v=>v/sum));
 }
 mesh.primitives=mesh.primitives.filter(p=>gltf.materials[p.material]?.name!=='EmissionText.001');
 mesh.primitives.push({attributes:{POSITION:append(pos,3),NORMAL:append(normals,3),JOINTS_0:append(joints,4,'VEC4',5123),WEIGHTS_0:append(weights,4,'VEC4')},material:4,mode:4});geometry.dispose();changes.push({mesh:meshIndex,text:'ASYMMETRIC'});
}
shoeText(152);shoeText(153);
// Keep the original rigs, node transforms, animation accessors, and camera intact.
gltf.buffers[0].byteLength=binary.length;
gltf.asset.extras={...gltf.asset.extras,asymmetricRebranding:changes};
let json=Buffer.from(JSON.stringify(gltf));json=Buffer.concat([json,Buffer.alloc((4-json.length%4)%4,32)]);
binary=Buffer.concat([binary,Buffer.alloc((4-binary.length%4)%4)]);
const header=Buffer.alloc(12);header.write('glTF');header.writeUInt32LE(2,4);header.writeUInt32LE(28+json.length+binary.length,8);
const jh=Buffer.alloc(8);jh.writeUInt32LE(json.length);jh.writeUInt32LE(0x4e4f534a,4);const bh=Buffer.alloc(8);bh.writeUInt32LE(binary.length);bh.writeUInt32LE(0x004e4942,4);
fs.writeFileSync(output,Buffer.concat([header,jh,json,bh,binary]));console.log(JSON.stringify({output,changes}));
