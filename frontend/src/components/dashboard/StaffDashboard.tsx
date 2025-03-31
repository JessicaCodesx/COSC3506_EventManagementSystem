import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/DashboardModules.css';

// Mock data - in a real app, this would come from API
const mockAssignments = [
  { 
    id: 1, 
    eventName: 'Annual Corporate Retreat', 
    clientName: 'Acme Corp',
    location: 'Mountain View Resort', 
    eventDate: '2025-06-15T14:00:00', 
    role: 'Event Coordinator',
    status: 'SCHEDULED' 
  },
  { 
    id: 2, 
    eventName: 'Product Launch', 
    clientName: 'Tech Innovations Inc',
    location: 'Downtown Convention Center', 
    eventDate: '2025-05-10T09:00:00', 
    role: 'Technical Support',
    status: 'SCHEDULED' 
  },
  { 
    id: 3, 
    eventName: 'Charity Gala', 
    clientName: 'Global Foundation',
    location: 'Grand Ballroom', 
    eventDate: '2025-04-30T18:00:00', 
    role: 'Guest Relations',
    status: 'SCHEDULED' 
  },
  { 
    id: 4, 
    eventName: 'Team Building Workshop', 
    clientName: 'Startup XYZ',
    location: 'Adventure Park', 
    eventDate: '2025-04-22T10:00:00', 
    role: 'Activity Leader',
    status: 'COMPLETED' 
  }
];

const mockTasks = [
  {
    id: 1,
    title: 'Prepare venue layout for Corporate Retreat',
    dueDate: '2025-06-10',
    priority: 'HIGH',
    completed: false,
    eventId: 1
  },
  {
    id: 2,
    title: 'Coordinate with catering team',
    dueDate: '2025-06-12',
    priority: 'MEDIUM',
    completed: false,
    eventId: 1
  },
  {
    id: 3,
    title: 'Test AV equipment for Product Launch',
    dueDate: '2025-05-08',
    priority: 'HIGH',
    completed: false,
    eventId: 2
  },
  {
    id: 4,
    title: 'Create guest name tags',
    dueDate: '2025-04-28',
    priority: 'LOW',
    completed: true,
    eventId: 3
  }
];

const StaffDashboard: React.FC = () => {
  const [assignments, setAssignments] = useState(mockAssignments);
  const [tasks, setTasks] = useState(mockTasks);
  const [loading, setLoading] = useState(false);

  // In a real app, you would fetch data from API
  useEffect(() => {
    // Example of how you would fetch data
    const fetchData = async () => {
      setLoading(true);
      try {
        // const token = localStorage.getItem('token');
        // const staffId = '1'; // Would come from auth context or state
        
        // const assignmentsResponse = await fetch(`http://localhost:8080/api/assignments/staff/${staffId}`, {
        //   headers: { Authorization: `Bearer ${token}` }
        // });
        // const assignmentsData = await assignmentsResponse.json();
        // setAssignments(assignmentsData);
        
        // const tasksResponse = await fetch(`http://localhost:8080/api/tasks/staff/${staffId}`, {
        //   headers: { Authorization: `Bearer ${token}` }
        // });
        // const tasksData = await tasksResponse.json();
        // setTasks(tasksData);
      } catch (error) {
        console.error('Error fetching staff data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    // Comment out for now since we're using mock data
    // fetchData();
  }, []);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatDueDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'SCHEDULED':
        return 'status-scheduled';
      case 'COMPLETED':
        return 'status-completed';
      case 'CANCELED':
        return 'status-canceled';
      default:
        return '';
    }
  };

  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case 'HIGH':
        return 'priority-high';
      case 'MEDIUM':
        return 'priority-medium';
      case 'LOW':
        return 'priority-low';
      default:
        return '';
    }
  };

  // Calculate upcoming assignments (next 7 days)
  const upcomingAssignments = assignments.filter(assignment => {
    const eventDate = new Date(assignment.eventDate);
    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);
    return eventDate >= today && eventDate <= nextWeek;
  });

  // Filter tasks to show incomplete ones first
  const sortedTasks = [...tasks].sort((a, b) => {
    // Sort by completion status first (incomplete first)
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    
    // Then sort by due date (earliest first)
    const dateA = new Date(a.dueDate);
    const dateB = new Date(b.dueDate);
    return dateA.getTime() - dateB.getTime();
  });

  const toggleTaskCompletion = (taskId: number) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-welcome">
        <h1>Staff Dashboard</h1>
        <p>Manage your event assignments, track tasks, and maintain your schedule.</p>
      </div>

      <div className="dashboard-summary">
        <div className="summary-card">
          <div className="summary-icon">
            <i className="fa fa-calendar-check"></i>
          </div>
          <div className="summary-details">
            <h3>{assignments.length}</h3>
            <p>Total Assignments</p>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon">
            <i className="fa fa-clock"></i>
          </div>
          <div className="summary-details">
            <h3>{upcomingAssignments.length}</h3>
            <p>Upcoming (7 days)</p>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon">
            <i className="fa fa-tasks"></i>
          </div>
          <div className="summary-details">
            <h3>{tasks.filter(task => !task.completed).length}</h3>
            <p>Pending Tasks</p>
          </div>
        </div>
      </div>

      <div className="dashboard-widgets">
        <div className="widget assignments-widget">
          <div className="widget-header">
            <h2>Your Assignments</h2>
            <Link to="/schedule" className="view-all-link">
              View All <i className="fa fa-arrow-right"></i>
            </Link>
          </div>
          
          <div className="widget-content">
            {loading ? (
              <div className="loading-spinner">Loading...</div>
            ) : assignments.length > 0 ? (
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Event Name</th>
                    <th>Client</th>
                    <th>Date & Time</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {assignments.map(assignment => (
                    <tr key={assignment.id}>
                      <td>{assignment.eventName}</td>
                      <td>{assignment.clientName}</td>
                      <td>{formatDate(assignment.eventDate)}</td>
                      <td>{assignment.role}</td>
                      <td>
                        <span className={`status-badge ${getStatusClass(assignment.status)}`}>
                          {assignment.status}
                        </span>
                      </td>
                      <td>
                        <Link to={`/assignments/${assignment.id}`} className="action-button">
                          <i className="fa fa-eye"></i>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="empty-state">
                <i className="fa fa-calendar-check"></i>
                <p>No assignments found</p>
              </div>
            )}
          </div>
        </div>

        <div className="widget tasks-widget">
          <div className="widget-header">
            <h2>Your Tasks</h2>
            <Link to="/tasks" className="view-all-link">
              View All <i className="fa fa-arrow-right"></i>
            </Link>
          </div>
          
          <div className="widget-content">
            {loading ? (
              <div className="loading-spinner">Loading...</div>
            ) : tasks.length > 0 ? (
              <div className="tasks-list">
                {sortedTasks.map(task => (
                  <div key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                    <div className="task-checkbox">
                      <input 
                        type="checkbox" 
                        checked={task.completed} 
                        onChange={() => toggleTaskCompletion(task.id)}
                        id={`task-${task.id}`}
                      />
                      <label htmlFor={`task-${task.id}`}></label>
                    </div>
                    <div className="task-content">
                      <div className="task-title">
                        {task.title}
                        <span className={`priority-badge ${getPriorityClass(task.priority)}`}>
                          {task.priority}
                        </span>
                      </div>
                      <div className="task-meta">
                        <span className="task-due-date">
                          <i className="fa fa-calendar-day"></i> {formatDueDate(task.dueDate)}
                        </span>
                        <span className="task-event">
                          <i className="fa fa-link"></i> 
                          <Link to={`/events/${task.eventId}`}>
                            Event #{task.eventId}
                          </Link>
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <i className="fa fa-tasks"></i>
                <p>No tasks found</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="dashboard-actions">
        <Link to="/schedule/calendar" className="action-card">
          <div className="action-icon">
            <i className="fa fa-calendar-alt"></i>
          </div>
          <div className="action-details">
            <h3>View Calendar</h3>
            <p>See your complete schedule in calendar view</p>
          </div>
        </Link>
        
        <Link to="/tasks/create" className="action-card">
          <div className="action-icon">
            <i className="fa fa-plus-circle"></i>
          </div>
          <div className="action-details">
            <h3>Create Task</h3>
            <p>Add a new task to your to-do list</p>
          </div>
        </Link>
        
        <Link to="/time-tracking" className="action-card">
          <div className="action-icon">
            <i className="fa fa-clock"></i>
          </div>
          <div className="action-details">
            <h3>Time Tracking</h3>
            <p>Record hours worked on events</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default StaffDashboard;