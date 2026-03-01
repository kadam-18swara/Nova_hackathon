function CalendarView({ content }) {
  return (
    <div className="calendar-card">
      <h2>📅 Generated Marketing Content</h2>
      <div className="content-display">
        {content}
      </div>
    </div>
  );
}

export default CalendarView;