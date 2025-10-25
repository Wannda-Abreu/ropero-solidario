import AdminSelectedSlotHours from "@/components/calendarHours/selectedHours";
import MyCalendar from "@/pages/userViews/Calendar/calendar";


const AdminCalendar: React.FC = () =>{
    return <div><MyCalendar SelectedSlotHoursComponent={AdminSelectedSlotHours} />
    </div>;
}
export default AdminCalendar;












