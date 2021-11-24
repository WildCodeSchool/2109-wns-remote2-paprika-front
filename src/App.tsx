import React from 'react'
import Calendar from './pages/Calendar'
import Documentation from './pages/Documentation'
import Home from './pages/Home'
import ListProject from './pages/ListProject'
import NotFound from './pages/NotFound'
import Notifications from './pages/Notifications'
import Settings from './pages/Settings'
import TasksProject from './pages/TasksProject'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import '@mui/material'

function App() {
    return (

        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/calendar" exact component={Calendar} />
                <Route path="/listproject" exact component={ListProject} />
                <Route path="/settings" exact component={Settings} />
                <Route path="/tasksproject" exact component={TasksProject} />
                <Route path="/notifications" exact component={Notifications} />
                <Route path="/documentation" exact component={Documentation} />
                <Route component={NotFound} />
            </Switch>
        </BrowserRouter>

    )
}

export default App
