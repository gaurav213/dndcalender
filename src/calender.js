import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import timeGridPlugin from "@fullcalendar/timegrid";


const Calender = ()=>{
    console.log("checking", resourceTimelinePlugin)
    const date=[{"id":"a","title":"shift"},
    {"id":"a","title":"shift1"},
    {"id":"b","title":"shift2"},
    {"id":"c","title":"shift3"},
    {"id":"d","title":"shift4"},
    {"id":"e","title":"shift5"}]
    return(
        <div>
        <FullCalendar
        plugins={[ dayGridPlugin,interactionPlugin, resourceTimelinePlugin ]}
        headerToolbar={{
            left: 'prev,next',
            center: 'title',
            right: 'resourceTimelineDay,resourceTimelineWeek,resourceTimelineMonth'
          }}
          schedulerLicenseKey={'GPL-My-Project-Is-Open-Source'}
          editable="true"
        initialView="resourceTimelineMonth"
        resourceAreaHeaderContent= 'Time'
        resources= {date}
        // events='https://fullcalendar.io/api/demo-feeds/events.json?single-day&for-resource-timeline'
        />
        <FullCalendar
defaultView="timeGridDay"
header={{
  left: "prev,next today",
  center: "title",
  right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek"
}}
plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
// ref={this.calendarComponentRef}
// weekends={this.state.calendarWeekends}
// events={this.state.calendarEvents}
// dateClick={this.handleDateClick}
/>
        
        </div>
    )
}

export default Calender