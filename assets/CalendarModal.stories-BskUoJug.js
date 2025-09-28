import{j as t}from"./jsx-runtime-eAkVW3JC.js";import{r as R}from"./index-pcvojpNF.js";import{e as c,C as n,E as l,T as A,b as oe,d as se,f as le,s as ie,g as X,a as x,t as u,p as de}from"./utils-CkBNejMi.js";import"./index-BTjzOQ46.js";import"./client-Ce9hyLeQ.js";const h=c.StyleSheet.create({content:{backgroundColor:n.WHITE,borderRadius:10,overflow:"hidden"},overlay:{alignItems:"center",flex:1,justifyContent:"center"},title:{alignSelf:"center",color:n.DARK_BLACK,fontSize:14,fontWeight:"600",marginTop:20,maxWidth:300}}),ce=(e,a)=>[h.overlay,{backgroundColor:`rgba(0, 0, 0, ${e})`},a==null?void 0:a.modalOverlayStyle],me=(e,a)=>[h.content,{backgroundColor:(a==null?void 0:a.backgroundColor)||n.WHITE},e.modalContainerStyle];function ue({isVisible:e,onClose:a,overlayOpacity:r=.4,title:o}){if(e==null)throw new Error(`"isVisible" ${l.REQUIRED}`);if(!a)throw new Error(`"onClose" ${l.REQUIRED}`);if(typeof e!="boolean")throw new Error(`"isVisible" ${l.INVALID_BOOLEAN}`);if(typeof a!="function")throw new Error(`"onClose" ${l.INVALID_FUNCTION}`);if(typeof r!="number"||r<0||r>1)throw new Error(l.INVALID_OPACITY);if(o&&typeof o!="string")throw new Error(`"title" ${l.INVALID_STRING}`)}function Z({isVisible:e,onClose:a,value:r,onChange:o,minDate:i,maxDate:T,title:d,styles:s={},colors:m={},language:O,defaultValue:ae,overlayOpacity:w=.4,markedDates:te=[]}){ue({isVisible:e,onClose:a,overlayOpacity:w,title:d});const ne=ce(w,s),re=me(s,m);return t.jsx(c.Modal,{transparent:!0,visible:e,animationType:"fade",onRequestClose:a,testID:A.CALENDAR_MODAL.MODAL,children:t.jsx(c.Pressable,{style:ne,onPress:a,testID:A.CALENDAR_MODAL.OVERLAY,children:t.jsxs(c.Pressable,{style:re,onPress:()=>{},testID:A.CALENDAR_MODAL.CONTAINER,children:[d&&t.jsx(c.Text,{style:[h.title,s.modalTitleStyle],children:d}),t.jsx(oe,{value:r,onChange:o,minDate:i,maxDate:T,language:O,defaultValue:ae,styles:s,colors:m,markedDates:te})]})})})}Z.__docgenInfo={description:"",methods:[],displayName:"CalendarModal",props:{value:{required:!0,tsType:{name:"Dayjs"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(date: CalendarDay) => void",signature:{arguments:[{type:{name:"Dayjs"},name:"date"}],return:{name:"void"}}},description:""},minDate:{required:!1,tsType:{name:"Dayjs"},description:""},maxDate:{required:!1,tsType:{name:"Dayjs"},description:""},defaultValue:{required:!1,tsType:{name:"Dayjs"},description:""},language:{required:!1,tsType:{name:"union",raw:"'en' | 'ko'",elements:[{name:"literal",value:"'en'"},{name:"literal",value:"'ko'"}]},description:""},styles:{required:!1,tsType:{name:"CalendarModalStyles"},description:"",defaultValue:{value:"{}",computed:!1}},colors:{required:!1,tsType:{name:"CalendarColors"},description:"",defaultValue:{value:"{}",computed:!1}},markedDates:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"MarkedDate[]"},description:"",defaultValue:{value:"[]",computed:!1}},isVisible:{required:!0,tsType:{name:"boolean"},description:""},onClose:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},title:{required:!1,tsType:{name:"string"},description:""},overlayOpacity:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"0.4",computed:!1}}}};const ye={padding:"12px 20px",backgroundColor:n.PRIMARY,borderRadius:8,cursor:"pointer",display:"inline-flex",alignItems:"center",justifyContent:"center",fontSize:16,color:"white",fontWeight:"500",border:"none",transition:"transform 0.15s ease"};function ee({onPress:e}){return t.jsx("button",{onClick:e,style:ye,onMouseDown:a=>a.currentTarget.style.transform="scale(0.95)",onMouseLeave:a=>a.currentTarget.style.transform="scale(1)",children:"📅 Open Calendar Modal"})}ee.__docgenInfo={description:"",methods:[],displayName:"OpenButton",props:{onPress:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};const pe=e=>{const[a,r]=R.useState(()=>u(e.initialValue)),[o,i]=R.useState(e.autoOpen||!1);R.useEffect(()=>{r(u(e.initialValue))},[e.initialValue]);const T=O=>{r(O),e.autoOpen||i(!1)},d=()=>{i(!1)},s=()=>{i(!0)},m={...e,value:a,onChange:T,isVisible:o,onClose:d,minDate:e.minDate?u(e.minDate):void 0,maxDate:e.maxDate?u(e.maxDate):void 0,markedDates:de(e.markedDates||[])};return t.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:16},children:[!o&&t.jsxs("div",{style:{textAlign:"center"},children:[t.jsxs("p",{style:{marginBottom:16,color:n.BLACK,fontSize:14},children:["Selected Date: ",a.format("YYYY-MM-DD")]}),t.jsx(ee,{onPress:s})]}),t.jsx(Z,{...m})]})},ke={title:"Components/CalendarModal",component:pe,parameters:ie,argTypes:le,args:{...se,overlayOpacity:.4,autoOpen:!0}},y={name:"Default",args:{autoOpen:!1},parameters:{controls:{exclude:/.*/}}},p={name:"Custom Title",args:{title:"📅 Select Date"},parameters:{controls:{include:["title"]}}},g={name:"Background Opacity",args:{overlayOpacity:.7},parameters:{controls:{include:["overlayOpacity"]}}},D={name:"Marked Dates",args:{markedDates:X()},parameters:{controls:{include:["markedDates","initialValue"]}}},S={name:"Date Range Restricted",args:{minDate:x().subtract(1,"week").toDate(),maxDate:x().add(1,"week").toDate()},parameters:{controls:{include:["minDate","maxDate","initialValue"]}}},f={name:"Korean Language",args:{language:"ko",title:"📅 날짜 선택"},parameters:{controls:{include:["language","title"]}}},C={name:"Dark Mode",args:{overlayOpacity:.7,colors:{primaryColor:n.PRIMARY,backgroundColor:n.DARK_BLACK,textColor:n.WHITE}},parameters:{controls:{include:["colors"]},backgrounds:{default:"dark"}}},k={name:"Playground",args:{title:"📅 Select Date",overlayOpacity:.5,minDate:x().subtract(1,"month").toDate(),maxDate:x().add(1,"month").toDate(),markedDates:X(),colors:{primaryColor:n.PRIMARY,backgroundColor:n.WHITE,textColor:n.BLACK},styles:{modalOverlayStyle:{},modalContainerStyle:{},modalTitleStyle:{},containerStyle:{},daysContainerStyle:{},weekStyle:{},dayContainerStyle:{},dayTextStyle:{},selectedDayStyle:{},selectedDayTextStyle:{},todayLabelStyle:{},weekendDayTextStyle:{},disabledDayTextStyle:{},monthSelectorContainerStyle:{},monthSelectorButtonStyle:{},monthTextStyle:{},arrowStyle:{},disabledArrowStyle:{},weekdayHeaderContainerStyle:{},weekdayTextStyle:{},weekendHeaderTextStyle:{}}}};var b,v,M;y.parameters={...y.parameters,docs:{...(b=y.parameters)==null?void 0:b.docs,source:{originalSource:`{
  name: 'Default',
  args: {
    autoOpen: false
  },
  parameters: {
    controls: {
      exclude: /.*/
    }
  }
}`,...(M=(v=y.parameters)==null?void 0:v.docs)==null?void 0:M.source}}};var I,L,E;p.parameters={...p.parameters,docs:{...(I=p.parameters)==null?void 0:I.docs,source:{originalSource:`{
  name: 'Custom Title',
  args: {
    title: '📅 Select Date'
  },
  parameters: {
    controls: {
      include: ['title']
    }
  }
}`,...(E=(L=p.parameters)==null?void 0:L.docs)==null?void 0:E.source}}};var j,V,P;g.parameters={...g.parameters,docs:{...(j=g.parameters)==null?void 0:j.docs,source:{originalSource:`{
  name: 'Background Opacity',
  args: {
    overlayOpacity: 0.7
  },
  parameters: {
    controls: {
      include: ['overlayOpacity']
    }
  }
}`,...(P=(V=g.parameters)==null?void 0:V.docs)==null?void 0:P.source}}};var _,B,q;D.parameters={...D.parameters,docs:{...(_=D.parameters)==null?void 0:_.docs,source:{originalSource:`{
  name: 'Marked Dates',
  args: {
    markedDates: generateSampleMarkedDates()
  },
  parameters: {
    controls: {
      include: ['markedDates', 'initialValue']
    }
  }
}`,...(q=(B=D.parameters)==null?void 0:B.docs)==null?void 0:q.source}}};var N,K,Y;S.parameters={...S.parameters,docs:{...(N=S.parameters)==null?void 0:N.docs,source:{originalSource:`{
  name: 'Date Range Restricted',
  args: {
    minDate: dayjs().subtract(1, 'week').toDate(),
    maxDate: dayjs().add(1, 'week').toDate()
  },
  parameters: {
    controls: {
      include: ['minDate', 'maxDate', 'initialValue']
    }
  }
}`,...(Y=(K=S.parameters)==null?void 0:K.docs)==null?void 0:Y.source}}};var H,W,$;f.parameters={...f.parameters,docs:{...(H=f.parameters)==null?void 0:H.docs,source:{originalSource:`{
  name: 'Korean Language',
  args: {
    language: 'ko',
    title: '📅 날짜 선택'
  },
  parameters: {
    controls: {
      include: ['language', 'title']
    }
  }
}`,...($=(W=f.parameters)==null?void 0:W.docs)==null?void 0:$.source}}};var z,U,G;C.parameters={...C.parameters,docs:{...(z=C.parameters)==null?void 0:z.docs,source:{originalSource:`{
  name: 'Dark Mode',
  args: {
    overlayOpacity: 0.7,
    colors: {
      primaryColor: COLORS.PRIMARY,
      backgroundColor: COLORS.DARK_BLACK,
      textColor: COLORS.WHITE
    }
  },
  parameters: {
    controls: {
      include: ['colors']
    },
    backgrounds: {
      default: 'dark'
    }
  }
}`,...(G=(U=C.parameters)==null?void 0:U.docs)==null?void 0:G.source}}};var Q,F,J;k.parameters={...k.parameters,docs:{...(Q=k.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  name: 'Playground',
  args: {
    title: '📅 Select Date',
    overlayOpacity: 0.5,
    minDate: dayjs().subtract(1, 'month').toDate(),
    maxDate: dayjs().add(1, 'month').toDate(),
    markedDates: generateSampleMarkedDates(),
    colors: {
      primaryColor: COLORS.PRIMARY,
      backgroundColor: COLORS.WHITE,
      textColor: COLORS.BLACK
    },
    styles: {
      modalOverlayStyle: {},
      modalContainerStyle: {},
      modalTitleStyle: {},
      containerStyle: {},
      daysContainerStyle: {},
      weekStyle: {},
      dayContainerStyle: {},
      dayTextStyle: {},
      selectedDayStyle: {},
      selectedDayTextStyle: {},
      todayLabelStyle: {},
      weekendDayTextStyle: {},
      disabledDayTextStyle: {},
      monthSelectorContainerStyle: {},
      monthSelectorButtonStyle: {},
      monthTextStyle: {},
      arrowStyle: {},
      disabledArrowStyle: {},
      weekdayHeaderContainerStyle: {},
      weekdayTextStyle: {},
      weekendHeaderTextStyle: {}
    }
  }
}`,...(J=(F=k.parameters)==null?void 0:F.docs)==null?void 0:J.source}}};const xe=["Default","CustomTitle","BackgroundOpacity","MarkedDates","DateRangeRestricted","KoreanLanguage","DarkMode","Playground"];export{g as BackgroundOpacity,p as CustomTitle,C as DarkMode,S as DateRangeRestricted,y as Default,f as KoreanLanguage,D as MarkedDates,k as Playground,xe as __namedExportsOrder,ke as default};
