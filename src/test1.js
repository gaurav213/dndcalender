<FullCalendar
defaultView="dayGridMonth"
header={{
  left: "prev,next today",
  center: "title",
  right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek"
}}
plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
ref={this.calendarComponentRef}
weekends={this.state.calendarWeekends}
events={this.state.calendarEvents}
dateClick={this.handleDateClick}
/>