import React from "react";

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import Navigation from "../components/Navigation";

const Calendar = () => {
    return (
        <div className="calendar">
            <Navigation />
            <h1>Calendar page</h1>
            <div className="big-container-wrapper">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ex ducimus molestias quos, ad saepe alias eveniet mollitia fuga corrupti modi architecto ipsa cupiditate accusantium laboriosam ea numquam facere autem cumque?Lorem,
                ipsum dolor sit amet consectetur adipisicing elit. Totam cum quibusdam officia, itaque accusantium atque consequatur mollitia, voluptatibus ipsa sunt ab delectus in vitae neque necessitatibus. Quis excepturi voluptates ea.
            </div>
        </div>
    )
}

export default Calendar;