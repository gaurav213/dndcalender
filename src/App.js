import React, { useEffect, useState } from "react";
// import "./styles.css";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import moment from 'moment';
// import { format } from "prettier";

export default function App() {
  // initial state
  const [dates,setDates]=useState({})
  const [unselect,setUnselect] = useState(false)
  const [state, setState] = useState({
    weekendsVisible: true,
    externalEvents: [
      { title: "Gaurav", color: "black", id: 34432, custom: "Doctor" },
      { title: "Rahul", color: "black", id: 323232, custom:"hospital Manager" },
      { title: "Sonali", color: "black", id: 1111 , custom:"Doctor"},
      { title: "Vinod", color: "black", id: 432432, custom:"Doctor" }
    ],
    calendarEvents: [
      // {
      //   id: 1,
      //   title: "All-day event",
      //   color: "#black",
      //   start: "2020-12-12",
      //   end: "2020-12-12",
      //   custom: "questo è un campo custom"
      // },
      // {
      //   id: 2,
      //   title: "Timed event",
      //   color: "#black",
      //   start: "2020-12-07",
      //   end: "2020-12-10",
      //   custom: "custom stuff"
      // }
    ]
  });
  // calendarRef = React.createRef();

  // load external events
  useEffect(() => {
    let draggableEl = document.getElementById("external-events");
    new Draggable(draggableEl, {
      itemSelector: ".fc-event",
      eventData: function (eventEl) {
        let id = eventEl.dataset.id;
        let title = eventEl.getAttribute("title");
        let color = eventEl.dataset.color;
        let custom = eventEl.dataset.custom;
        
console.log(draggableEl)
        return {
          id: id,
          title: title,
          color: color,
          custom: custom,
          create: true
        };
      },
      
    });
    
  },[]);

  
  // add external events
  // const addEvent = () => {
  //   let newEvent = {
  //     id: 3433,
  //     title: "Timed event",
  //     color: "#333333",
  //     start: "2020-12-31",
  //     end: "2020-12-31",
  //     custom: "custom stuff"
  //   };

  //   setState((state) => {
  //     return {
  //       ...state,
  //       externalEvents: state.externalEvents.concat(newEvent)
  //     };
  //   });
  // };
// console.log(dates)

  useEffect(()=>{
    if(unselect==false && Object.entries(dates).length !== 0 ){
      console.log("it works")
    }
    else{
      console.log('unselect',unselect)
      // console.log(("dates",dates))
    }

  },[unselect,dates])
  
  const handleEventReceive = (eventInfo) => {
    
    const newEvent = {
      id: eventInfo.draggedEl.getAttribute("data-id"),
      title: eventInfo.draggedEl.getAttribute("title"),
      color: eventInfo.draggedEl.getAttribute("data-color"),
      start: eventInfo.date,
      end: eventInfo.date,
      custom: eventInfo.draggedEl.getAttribute("data-custom")
    };
    

    setState((state) => {
      return {
        ...state,
        calendarEvents: state.calendarEvents.concat(newEvent)
      };
    });
  };
const selectdates = (dates)=>{
  const newEvent = {
    start: dates.startStr,
    end: dates.endStr, 
  };
  setDates(newEvent)
  setUnselect(false)
  
  

}
let calendarRef=React.createRef()
const multipleDateSelect = (selectInfo)=>{
  const calenderApi=calendarRef.current.getApi();
  console.log("calender",calenderApi);
  if(calenderApi.getEventById("selectBox")){
    calenderApi.getEventById('selectBox').remove();
  }
  var startTime= moment(selectInfo.start).format("HH:mm:ss")
  var endTime=selectInfo.end
  // var start=moment(selectInfo.start).format("HH:mm:ss");
  var start = selectInfo.start
  var end=selectInfo.end;
  console.log(startTime)
  console.log(endTime)
  console.log(start)
  console.log(end)
  console.log(start.getHours(),end.getHours())
  console.log(start.getHours(),end.getHours() ,"checking",
  start.getMinutes(),end.getMinutes())


  if(start.getHours()>end.getHours()||
      (start.getHours()===end.getHours() &&
          start.getMinutes()>end.getMinutes())
  ){
   
    [startTime,endTime]=[endTime,startTime]
    console.log("here")
  }
  calenderApi.addEvent({
    id:"selectBox",
    startRecur:start,
    endRecur:end,
    startTime,
    endTime,
    allday:false,
    rendering:"background"
    
  })
  console.log('reached here')
  return true
}


  return (
    <div className="App">
      <div style={{ float: "right", width: "25%" }}>
        {/* <div style={{ margin: "0 0 20px" }}>
          <input
            type="submit"
            name="name"
            onClick={addEvent}
            value="add external event"
          />
        </div> */}
        <div id="external-events">
          {state.externalEvents.map((event) => (
            <div
              className="fc-event fc-h-event mb-1 fc-daygrid-event fc-daygrid-block-event p-2"
              title={event.title}
              data-id={event.id}
              data-color={event.color}
              data-custom={event.custom}
              key={event.id}
              style={{
                backgroundColor: event.color,
                borderColor: event.color,
                cursor: "pointer"
              }}
            >
              <div className="fc-event-main" >
                <div>
                  <strong>{event.title}</strong>
                </div>
                {event.custom}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ float: "right", width: "75%" }}>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay"
          }}
          ref={calendarRef}
          // select={(info)=>{
          //   info.allDay=false
          //   // alert('Clicked on: ' + info.startStr + info.endStr);
          //   // alert('Coordinates: ' + info.jsEvent.pageX + ',' + info.jsEvent.pageY);
          //   // alert('Current view: ' + info.view.type);
          //   console.log(info.start)
          //   console.log(info.end)
          //   // alert('Resource ID: ' + info.resource.id);
          //   // change the day's background color just for fun
          //   // info.dayEl.style.backgroundColor = 'red';
          // }} 
          // select={selectdates}
          slotLabelFormat={{
            hour:"numeric",
            minute:"2-digit",
            omitZeroMinute:false,
            meridiem:"short"
          }}
          selectAllow={multipleDateSelect}
          unselect={()=>setUnselect(true)}
          // schedulerLicenseKey=""
          initialView="timeGridWeek"
          editable={true}
          selectable={true} 
          dayMaxEvents={false}
          allDaySlot={false}
          dayHeaderFormat={{
            weekday:"long",
            day:"numeric",
            omitCommas:'true'
          }}
          eventClick={function (obj){
            console.log(obj.event.id)
          }}
          
          // selectMirror={true}
          // dayMaxEvents={(info)=>console.log("dayMaxEvents",info)}
          unselectAuto={false}
          weekends={state.weekendsVisible}
          events={state.calendarEvents}
          droppable={true}
          eventReceive={handleEventReceive}
        />
      </div>
    </div>
  );
}
